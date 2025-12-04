import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Category } from '../category/category.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { Instructor } from '../instructor/instructor.model';
import { Lesson } from '../lesson/lesson.model';

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
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }
    const lessons = await Lesson.find({ courseId: id }).sort({ order: 1 });
    return { ...result.toObject(), lessons };
};

const getCourseByIdPublic = async (id: string) => {
    const result = await Course.findById(id).populate(
        'instructorId categoryId',
    );
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }
    const lessons = await Lesson.find(
        { courseId: id },
        { title: 1, duration: 1 },
    ).sort({
        order: 1,
    });
    return { ...result.toObject(), lessons };
};

const getAllCourses = async () => {
    const filter = {
        isPublished: true,
    };
    const result = await Course.find(filter).populate(
        'instructorId categoryId',
    );
    return result;
};

const getAllCoursesAdmin = async () => {
    const result = await Course.find().populate('instructorId categoryId');
    return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }

    if (payload.categoryId) {
        const category = await Category.findById(payload.categoryId);
        if (!category) {
            throw new ApiError(status.NOT_FOUND, 'Category not found');
        }
    }
    if (payload.instructorId) {
        const instructor = await Instructor.findById(payload.instructorId);
        if (!instructor) {
            throw new ApiError(status.NOT_FOUND, 'Instructor not found');
        }
    }
    const result = await Course.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteCourse = async (id: string) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }
    const result = await Course.findByIdAndDelete(id);
    return result;
};

export const CourseServices = {
    createCourse,
    getCourseById,
    getCourseByIdPublic,
    getAllCourses,
    getAllCoursesAdmin,
    updateCourse,
    deleteCourse,
};
