import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse) => {
    const result = await Course.create(payload);
    return result;
};

const getCourse = async (id: string) => {
    const result = await Course.findById(id);
    return result;
};

const getAllCourse = async () => {
    const result = await Course.find();
    return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
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
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
};
