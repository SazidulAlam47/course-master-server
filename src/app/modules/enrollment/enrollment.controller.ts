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
        statusCode: status.OK,
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

const updateEnrollment = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.updateEnrollment(
        req.user,
        req.params.id,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Enrollment updated successfully',
        data: result,
    });
});

export const EnrollmentControllers = {
    createEnrollment,
    getEnrollmentById,
    updateEnrollment,
};
