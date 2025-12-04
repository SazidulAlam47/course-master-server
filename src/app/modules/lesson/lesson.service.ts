import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Course } from '../course/course.model';
import { ILesson } from './lesson.interface';
import { Lesson } from './lesson.model';

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

const getLessonById = async (id: string) => {
    const result = await Lesson.findById(id).populate('courseId');
    if(!result){
        throw new ApiError(status.NOT_FOUND, 'Lesson not found');
    }
    return result;
};

const getAllLessons = async () => {
    const result = await Lesson.find().populate('courseId');
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
    getAllLessons,
    updateLesson,
    deleteLesson,
};
