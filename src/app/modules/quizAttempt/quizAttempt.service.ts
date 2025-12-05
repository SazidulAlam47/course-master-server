/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Lesson } from '../lesson/lesson.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { QuizAttempt } from './quizAttempt.model';
import { TDecodedUser } from '../../interface/jwt.interface';
import mongoose from 'mongoose';

const createQuizAttempt = async (
    decodedUser: TDecodedUser,
    payload: { lessonId: string; submittedAnswers: number[] },
) => {
    const lesson = await Lesson.findById(payload.lessonId);
    if (!lesson) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }

    if (!lesson?.quizQuestions || !lesson.quizQuestions?.length) {
        throw new ApiError(status.BAD_REQUEST, 'This lesson has no quiz');
    }

    const enrollment = await Enrollment.findOne({
        studentId: decodedUser.id,
        courseId: lesson.courseId,
        paymentStatus: 'paid',
    });

    if (!enrollment) {
        throw new ApiError(
            status.FORBIDDEN,
            'You are not enrolled in this course',
        );
    }

    // Check if already attempted
    const existingAttempt = await QuizAttempt.findOne({
        studentId: decodedUser.id,
        lessonId: payload.lessonId,
    });

    if (existingAttempt) {
        throw new ApiError(
            status.CONFLICT,
            'You have already attempted this quiz',
        );
    }

    // Calculate score
    const totalQuestions = lesson.quizQuestions.length;
    let correctAnswers = 0;

    lesson.quizQuestions.forEach((question, index) => {
        if (question.correctAnswer === payload.submittedAnswers[index]) {
            correctAnswers++;
        }
    });

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Create quiz attempt (transaction-1)
        const quizAttempt = await QuizAttempt.create(
            [
                {
                    studentId: decodedUser.id,
                    courseId: lesson.courseId,
                    lessonId: payload.lessonId,
                    enrollmentId: enrollment._id,
                    submittedAnswers: payload.submittedAnswers,
                    score: correctAnswers,
                    totalQuestions,
                },
            ],
            { session },
        );

        if (!quizAttempt.length) {
            throw new ApiError(
                status.BAD_REQUEST,
                'Failed to create quiz attempt',
            );
        }

        // Update enrollment (transaction-2)
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            enrollment._id,
            {
                $inc: { completedLessonOrder: 1 },
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

        return quizAttempt[0];
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new ApiError(
            err.statusCode || status.INTERNAL_SERVER_ERROR,
            err.message,
        );
    }
};

const getQuizAttemptByLessonId = async (
    decodedUser: TDecodedUser,
    lessonId: string,
) => {
    const query: Record<string, unknown> = { lessonId };

    // If student, only show their own quiz attempts
    if (decodedUser.role === 'student') {
        query.studentId = decodedUser.id;
    }

    const quizAttempt = await QuizAttempt.findOne(query).populate(
        'studentId courseId lessonId enrollmentId',
    );

    if (!quizAttempt) {
        throw new ApiError(status.NOT_FOUND, 'Quiz attempt not found');
    }

    return quizAttempt;
};

export const QuizAttemptServices = {
    createQuizAttempt,
    getQuizAttemptByLessonId,
};
