import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrollmentServices } from './enrollment.service';

const createEnrollment = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.createEnrollment(
        req.user,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Enrollment created successfully',
        data: result,
    });
});

const getEnrollmentById = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.getEnrollmentById(
        req.user,
        req.params.id,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Enrollment retrieved successfully',
        data: result,
    });
});

const getMyEnrollments = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.getMyEnrollments(req.user);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Enrollments retrieved successfully',
        data: result,
    });
});

const updateEnrollmentCompletedOrder = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.updateEnrollmentCompletedOrder(
        req.user,
        req.params.id,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Enrollment updated successfully',
        data: result,
    });
});

const getAllEnrollments = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.getAllEnrollments();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Enrollments retrieved successfully',
        data: result,
    });
});

export const EnrollmentControllers = {
    createEnrollment,
    getEnrollmentById,
    getMyEnrollments,
    updateEnrollmentCompletedOrder,
    getAllEnrollments,
};
