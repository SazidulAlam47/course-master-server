import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Category } from '../category/category.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { Instructor } from '../instructor/instructor.model';

const createCourse = async (payload: ICourse) => {
    const category = await Category.findById(payload.categoryId);
    if (!category) {
        throw new ApiError(status.NOT_FOUND, 'Category not found');
    }
    const instructor = await Instructor.findById(payload.instructorId);
    if (!instructor) {
        throw new ApiError(status.NOT_FOUND, 'Instructor not found');
    }
    const result = await Course.create(payload);

    return result;
};

const getCourseById = async (id: string) => {
    const result = await Course.findById(id).populate(
        'instructorId categoryId',
    );
    return result;
};

const getAllCourses = async () => {
    const result = await Course.find().populate('instructorId categoryId');
    return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
    const category = await Category.findById(payload.categoryId);
    if (!category) {
        throw new ApiError(status.NOT_FOUND, 'Category not found');
    }
    const instructor = await Instructor.findById(payload.instructorId);
    if (!instructor) {
        throw new ApiError(status.NOT_FOUND, 'Instructor not found');
    }
    const result = await Course.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteCourse = async (id: string) => {
    const result = await Course.findByIdAndDelete(id);
    return result;
};

export const CourseServices = {
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse,
};
