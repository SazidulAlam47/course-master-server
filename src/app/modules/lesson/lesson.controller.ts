import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LessonServices } from './lesson.service';

const createLesson = catchAsync(async (req, res) => {
    const result = await LessonServices.createLesson(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Lesson created successfully',
        data: result,
    });
});

const getLessonById = catchAsync(async (req, res) => {
    const result = await LessonServices.getLessonById(req.user, req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Lesson retrieved successfully',
        data: result,
    });
});

const getLessonByOrder = catchAsync(async (req, res) => {
    const result = await LessonServices.getLessonByOrder(
        req.user,
        Number(req.params.order),
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Lesson retrieved successfully',
        data: result,
    });
});

const updateLesson = catchAsync(async (req, res) => {
    const result = await LessonServices.updateLesson(req.params.id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Lesson updated successfully',
        data: result,
    });
});

const deleteLesson = catchAsync(async (req, res) => {
    const result = await LessonServices.deleteLesson(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Lesson deleted successfully',
        data: result,
    });
});

export const LessonControllers = {
    createLesson,
    getLessonById,
    getLessonByOrder,
    updateLesson,
    deleteLesson,
};
