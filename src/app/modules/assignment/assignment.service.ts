/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Lesson } from '../lesson/lesson.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Assignment } from './assignment.model';
import { TDecodedUser } from '../../interface/jwt.interface';
import mongoose from 'mongoose';
import { ICreateAssignmentPayload } from './assignment.interface';

const createAssignment = async (
    decodedUser: TDecodedUser,
    payload: ICreateAssignmentPayload,
) => {
    const lesson = await Lesson.findById(payload.lessonId);
    if (!lesson) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }

    if (!lesson.assignmentTask) {
        throw new ApiError(status.BAD_REQUEST, 'This lesson has no assignment');
    }

    const enrollment = await Enrollment.findOne({
        studentId: decodedUser.id,
        courseId: lesson.courseId,
    });

    if (!enrollment) {
        throw new ApiError(
            status.FORBIDDEN,
            'You are not enrolled in this course',
        );
    }

    // Check if already submitted
    const existingAssignment = await Assignment.findOne({
        studentId: decodedUser.id,
        lessonId: payload.lessonId,
    });

    if (existingAssignment) {
        throw new ApiError(
            status.CONFLICT,
            'You have already submitted this assignment',
        );
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Create assignment (transaction-1)
        const assignment = await Assignment.create(
            [
                {
                    studentId: decodedUser.id,
                    courseId: lesson.courseId,
                    lessonId: payload.lessonId,
                    enrollmentId: enrollment._id,
                    submissionText: payload.submissionText,
                },
            ],
            { session },
        );

        if (!assignment.length) {
            throw new ApiError(
                status.BAD_REQUEST,
                'Failed to create assignment',
            );
        }

        // Update enrollment (transaction-2)
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            enrollment._id,
            {
                completedLessonOrder: enrollment.completedLessonOrder + 1,
            },
            { session, new: true },
        );

        if (!updatedEnrollment) {
            throw new ApiError(
                status.BAD_REQUEST,
                'Failed to update enrollment',
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return assignment[0];
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new ApiError(
            err.statusCode || status.INTERNAL_SERVER_ERROR,
            err.message,
        );
    }
};

const updateAssignment = async (id: string, feedback: string) => {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
        throw new ApiError(status.NOT_FOUND, 'Assignment not found');
    }

    const result = await Assignment.findByIdAndUpdate(
        id,
        { feedback },
        { new: true },
    );

    return result;
};

const getAssignmentByLessonId = async (
    decodedUser: TDecodedUser,
    lessonId: string,
) => {
    const query: Record<string, unknown> = { lessonId };

    // If student, only show their own assignments
    if (decodedUser.role === 'student') {
        query.studentId = decodedUser.id;
    }

    const assignment = await Assignment.findOne(query).populate(
        'studentId courseId lessonId enrollmentId',
    );

    if (!assignment) {
        throw new ApiError(status.NOT_FOUND, 'Assignment not found');
    }

    return assignment;
};

const getAllAssignments = async () => {
    const result = await Assignment.find().populate(
        'studentId courseId lessonId enrollmentId',
    );
    return result;
};

export const AssignmentServices = {
    createAssignment,
    updateAssignment,
    getAssignmentByLessonId,
    getAllAssignments,
};
