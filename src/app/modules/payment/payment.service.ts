/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiError from '../../errors/ApiError';
import status from 'http-status';
import { SslServices } from '../ssl/ssl.service';
import { SSLValidationPayload } from '../ssl/ssl.interface';
import sendEmail from '../../utils/sendEmail';
import { Payment } from './payment.model';
import { TDecodedUser } from '../../interface/jwt.interface';
import mongoose from 'mongoose';
import { Enrollment } from '../enrollment/enrollment.model';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';
import { Instructor } from '../instructor/instructor.model';

const initPayment = async (
    decodedUser: TDecodedUser,
    enrollmentId: string,
    baseUrl: string,
) => {
    const payment = await Payment.findOne({ enrollmentId });

    if (!payment) {
        throw new ApiError(status.NOT_FOUND, 'Payment not found');
    }

    if (payment.status === 'paid') {
        throw new ApiError(status.BAD_REQUEST, 'Appointment is already PAID');
    }

    const data = {
        total_amount: payment.amount,
        tran_id: payment.transactionId,
        cus_name: decodedUser.name,
        cus_email: decodedUser.email,
    };

    const result = await SslServices.initPayment(data, baseUrl);

    return { paymentUrl: result.GatewayPageURL };
};

const validatePayment = async (payload: SSLValidationPayload) => {
    if (!payload?.val_id) {
        throw new ApiError(status.BAD_REQUEST, 'Payment Failed');
    }

    const sslResponse = await SslServices.validatePayment(payload);

    if (sslResponse.status !== 'VALID') {
        throw new ApiError(status.BAD_REQUEST, 'Payment Failed');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const payment = await Payment.findOneAndUpdate(
            { transactionId: sslResponse.tran_id },
            { status: 'paid', paymentGatewayData: JSON.stringify(sslResponse) },
            { session },
        );

        if (!payment) {
            throw new ApiError(status.BAD_REQUEST, 'Failed to update payment');
        }

        const enrollment = await Enrollment.findByIdAndUpdate(
            payment.enrollmentId,
            { paymentStatus: 'paid' },
            { session },
        );

        if (!enrollment) {
            throw new ApiError(
                status.BAD_REQUEST,
                'Failed to update enrollment',
            );
        }

        const user = await User.findById(enrollment.studentId);
        if (!user) {
            throw new ApiError(status.NOT_FOUND, 'User not found');
        }
        const course = await Course.findById(enrollment.courseId);
        if (!course) {
            throw new ApiError(status.NOT_FOUND, 'Course not found');
        }
        const instructor = await Instructor.findById(course.instructorId);
        if (!instructor) {
            throw new ApiError(status.NOT_FOUND, 'Instructor not found');
        }

        const subject = 'Your Invoice from Course Master';

        const emailBody = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Your Invoice from Course Master</h2>
                <p>Dear ${user.name},</p>
                <p>Thank you for purchasing a course from Course Master.</p>
                <p><strong>Invoice Details:</strong></p>
                <ul>
                    <li><strong>Course Title:</strong> ${course.title}</li>
                    <li><strong>Course Description:</strong> ${course.description}</li>
                    <li><strong>Course Instructor:</strong> ${instructor.name}</li>
                    <li><strong>Course Price:</strong> ${payment.amount} tk</li>
                </ul>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,<br />The Course Master Team</p>
                <hr style="margin-top: 30px;" />
                <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply directly to this email.
                </p>
            </div>
        `;

        sendEmail(user.email, subject, emailBody);

        await session.commitTransaction();
        await session.endSession();
        return payment;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new ApiError(err.statusCode, err.message);
    }
};

const paymentFailed = async (payload: SSLValidationPayload) => {
    if (payload.status !== 'FAILED' || !payload?.tran_id) {
        throw new ApiError(status.BAD_REQUEST, 'Invalid Request');
    }
    const payment = await Payment.findOne({
        transactionId: payload.tran_id,
    });

    if (!payment) {
        throw new ApiError(status.NOT_FOUND, 'Payment not found');
    }

    if (payment.status === 'paid') {
        throw new ApiError(status.BAD_REQUEST, 'Already Paid');
    }
    await Payment.updateOne(
        { _id: payment._id },
        {
            paymentGatewayData: payload as any,
        },
    );
};

const paymentCancelled = async (payload: SSLValidationPayload) => {
    if (payload.status !== 'CANCELLED' || !payload?.tran_id) {
        throw new ApiError(status.BAD_REQUEST, 'Invalid Request');
    }
    const payment = await Payment.findOne({
        transactionId: payload.tran_id,
    });

    if (!payment) {
        throw new ApiError(status.NOT_FOUND, 'Payment not found');
    }

    if (payment.status === 'paid') {
        throw new ApiError(status.BAD_REQUEST, 'Already Paid');
    }
    await Payment.updateOne(
        { _id: payment._id },
        {
            paymentGatewayData: payload as any,
        },
    );
};

export const PaymentServices = {
    initPayment,
    validatePayment,
    paymentFailed,
    paymentCancelled,
};
