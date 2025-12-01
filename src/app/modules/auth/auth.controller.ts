import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const registerStudent = catchAsync(async (req, res) => {
    const result = await AuthServices.registerStudent(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'User registered successfully',
        data: result,
    });
});

const logout = catchAsync(async (req, res) => {
    res.clearCookie('refreshToken', {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Logged out successfully',
        data: null,
    });
});

const setPassword = catchAsync(async (req, res) => {
    const result = await AuthServices.setPassword(req.user, req.body.password);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password added successfully',
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const result = await AuthServices.changePassword(req.user, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password is changed successfully',
        data: result,
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await AuthServices.forgetPassword(email);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Reset email is sent successfully',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization || '';
    const result = await AuthServices.resetPassword(token, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password reset successful',
        data: result,
    });
});

export const AuthControllers = {
    registerStudent,
    logout,
    changePassword,
    forgetPassword,
    resetPassword,
    setPassword,
};
