import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourse(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Course created successfully',
        data: result,
    });
});

const getCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getCourse(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Course retrieved successfully',
        data: result,
    });
});

const getAllCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourse();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Courses retrieved successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.updateCourse(req.params.id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Course updated successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.deleteCourse(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Course deleted successfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
};
