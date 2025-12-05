import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AssignmentServices } from './assignment.service';

const createAssignment = catchAsync(async (req, res) => {
    const result = await AssignmentServices.createAssignment(
        req.user,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Assignment submitted successfully',
        data: result,
    });
});

const updateAssignment = catchAsync(async (req, res) => {
    const result = await AssignmentServices.updateAssignment(
        req.params.id,
        req.body.feedback,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Assignment feedback added successfully',
        data: result,
    });
});

const getAssignmentByLessonId = catchAsync(async (req, res) => {
    const result = await AssignmentServices.getAssignmentByLessonId(
        req.user,
        req.params.lessonId,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Assignment retrieved successfully',
        data: result,
    });
});

const getAllAssignments = catchAsync(async (req, res) => {
    const result = await AssignmentServices.getAllAssignments();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Assignments retrieved successfully',
        data: result,
    });
});

export const AssignmentControllers = {
    createAssignment,
    updateAssignment,
    getAssignmentByLessonId,
    getAllAssignments,
};
