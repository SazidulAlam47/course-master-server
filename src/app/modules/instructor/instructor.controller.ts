import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InstructorServices } from './instructor.service';

const createInstructor = catchAsync(async (req, res) => {
    const result = await InstructorServices.createInstructor(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Instructor created successfully',
        data: result,
    });
});

const getInstructorById = catchAsync(async (req, res) => {
    const result = await InstructorServices.getInstructorById(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Instructor retrieved successfully',
        data: result,
    });
});

const getAllInstructors = catchAsync(async (req, res) => {
    const result = await InstructorServices.getAllInstructors();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Instructors retrieved successfully',
        data: result,
    });
});

const updateInstructor = catchAsync(async (req, res) => {
    const result = await InstructorServices.updateInstructor(
        req.params.id,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Instructor updated successfully',
        data: result,
    });
});

const deleteInstructor = catchAsync(async (req, res) => {
    const result = await InstructorServices.deleteInstructor(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Instructor deleted successfully',
        data: result,
    });
});

export const InstructorControllers = {
    createInstructor,
    getInstructorById,
    getAllInstructors,
    updateInstructor,
    deleteInstructor,
};
