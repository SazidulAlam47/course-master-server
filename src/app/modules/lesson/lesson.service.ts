/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Course } from '../course/course.model';
import { ILesson } from './lesson.interface';
import { Lesson } from './lesson.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { TDecodedUser } from '../../interface/jwt.interface';

const createLesson = async (payload: ILesson) => {
    const course = await Course.findById(payload.courseId);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }

    // Auto-increment order
    const lastLesson = await Lesson.findOne({ courseId: payload.courseId })
        .sort({ order: -1 })
        .limit(1);

    payload.order = lastLesson ? lastLesson.order + 1 : 1;

    const result = await Lesson.create(payload);
    return result;
};

const getLessonById = async (decodedUser: TDecodedUser, id: string) => {
    const result = await Lesson.findById(id).populate('courseId');
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }
    const enrollment = await Enrollment.findOne({
        studentId: decodedUser.id,
        courseId: result.courseId._id,
        paymentStatus: 'paid',
    });
    if (!enrollment) {
        throw new ApiError(
            status.FORBIDDEN,
            'You are not enrolled in this course',
        );
    }
    if (enrollment.completedLessonOrder + 1 < result.order) {
        throw new ApiError(status.FORBIDDEN, 'Access to this lesson is locked');
    }

    if (
        result.quizQuestions?.length &&
        enrollment.completedLessonOrder + 1 === result.order
    ) {
        // send lesson with quiz questions without answers
        const lessonWithoutAnswers = result.toObject();
        lessonWithoutAnswers.quizQuestions =
            lessonWithoutAnswers.quizQuestions?.map((quiz) => ({
                question: quiz.question,
                options: quiz.options,
            })) as any;
        return lessonWithoutAnswers;
    }

    return result;
};

const getLessonByOrder = async (decodedUser: TDecodedUser, order: number) => {
    const result = await Lesson.findOne({ order }).populate('courseId');
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }
    const enrollment = await Enrollment.findOne({
        studentId: decodedUser.id,
        courseId: result.courseId._id,
        paymentStatus: 'paid',
    });
    if (!enrollment) {
        throw new ApiError(
            status.FORBIDDEN,
            'You are not enrolled in this course',
        );
    }
    if (enrollment.completedLessonOrder + 1 < order) {
        throw new ApiError(status.FORBIDDEN, 'Access to this lesson is locked');
    }

    if (
        result.quizQuestions?.length &&
        enrollment.completedLessonOrder + 1 === order
    ) {
        // send lesson with quiz questions without answers
        const lessonWithoutAnswers = result.toObject();
        lessonWithoutAnswers.quizQuestions =
            lessonWithoutAnswers.quizQuestions?.map((quiz) => ({
                question: quiz.question,
                options: quiz.options,
            })) as any;
        return lessonWithoutAnswers;
    }

    return result;
};

const updateLesson = async (id: string, payload: Partial<ILesson>) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }
    const result = await Lesson.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteLesson = async (id: string) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }
    const result = await Lesson.findByIdAndDelete(id);
    return result;
};

export const LessonServices = {
    createLesson,
    getLessonById,
    getLessonByOrder,
    updateLesson,
    deleteLesson,
};
