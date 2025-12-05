/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Course } from '../course/course.model';
import { IEnrollment } from './enrollment.interface';
import { Enrollment } from './enrollment.model';
import { TDecodedUser } from '../../interface/jwt.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { Payment } from '../payment/payment.model';
import { IPayment } from '../payment/payment.interface';
import { Lesson } from '../lesson/lesson.model';

const createEnrollment = async (
    decodedUser: TDecodedUser,
    payload: IEnrollment,
) => {
    const course = await Course.findById(payload.courseId);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }

    const user = await User.findById(decodedUser.id);
    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'Student not found');
    }

    const enrollmentAlreadyExists = await Enrollment.findOne({
        studentId: user._id,
        courseId: payload.courseId,
        paymentStatus: 'paid',
    });
    if (enrollmentAlreadyExists) {
        throw new ApiError(
            status.CONFLICT,
            'You have already enrolled in this course',
        );
    }

    payload.studentId = user._id;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // create a enrollment (transaction-1)
        const newEnrollment = await Enrollment.create([payload], { session });

        if (!newEnrollment.length) {
            throw new ApiError(
                status.BAD_REQUEST,
                'Failed to create enrollment',
            );
        }

        const tnxId = new mongoose.Types.ObjectId().toString();

        const paymentData: IPayment = {
            enrollmentId: newEnrollment[0]._id,
            amount: course.price,
            status: 'unpaid',
            transactionId: tnxId,
        };

        //create a payment (transaction-2)
        const newPayment = await Payment.create([paymentData], { session });

        if (!newPayment.length) {
            throw new ApiError(status.BAD_REQUEST, 'Failed to create payment');
        }

        await session.commitTransaction();
        await session.endSession();

        return newEnrollment[0];
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new ApiError(err.statusCode, err.message);
    }
};

const getEnrollmentById = async (decodedUser: TDecodedUser, id: string) => {
    const enrollment = await Enrollment.findById(id).populate({
        path: 'courseId',
        populate: {
            path: 'instructorId',
        },
    });

    if (!enrollment) {
        throw new ApiError(status.NOT_FOUND, 'Enrollment not found');
    }

    // If student, check if enrollment belongs to them
    if (
        decodedUser.role === 'student' &&
        enrollment.studentId.toString() !== decodedUser.id
    ) {
        throw new ApiError(status.FORBIDDEN, 'Forbidden access');
    }

    if (decodedUser.role === 'student' && enrollment.paymentStatus !== 'paid') {
        throw new ApiError(
            status.FORBIDDEN,
            'Payment not completed for this enrollment',
        );
    }

    const totalLessons = await Lesson.countDocuments({
        courseId: enrollment.courseId._id,
    });

    const progress =
        totalLessons > 0
            ? Math.round((enrollment.completedLessonOrder / totalLessons) * 100)
            : 0;

    const lessons = await Lesson.find(
        { courseId: enrollment.courseId._id },
        { title: 1, duration: 1, type: 1, order: 1 },
    ).sort({
        order: 1,
    });

    return {
        ...enrollment.toObject(),
        totalLessons,
        progress,
        lessons,
    };
};

const getMyEnrollments = async (decodedUser: TDecodedUser) => {
    const enrollments = await Enrollment.find({
        studentId: decodedUser.id,
        paymentStatus: 'paid',
    }).populate({
        path: 'courseId',
        populate: {
            path: 'instructorId',
        },
    });

    const result = await Promise.all(
        enrollments.map(async (enrollment) => {
            const totalLessons = await Lesson.countDocuments({
                courseId: enrollment.courseId,
            });

            const progress =
                totalLessons > 0
                    ? Math.round(
                          (enrollment.completedLessonOrder / totalLessons) *
                              100,
                      )
                    : 0;

            return {
                ...enrollment.toObject(),
                totalLessons,
                progress,
            };
        }),
    );

    return result;
};

const updateEnrollmentCompletedOrder = async (
    decodedUser: TDecodedUser,
    id: string,
) => {
    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
        throw new ApiError(status.NOT_FOUND, 'Enrollment not found');
    }

    if (enrollment.studentId.toString() !== decodedUser.id) {
        throw new ApiError(status.FORBIDDEN, 'Forbidden access');
    }

    if (decodedUser.role === 'student' && enrollment.paymentStatus !== 'paid') {
        throw new ApiError(
            status.FORBIDDEN,
            'Payment not completed for this enrollment',
        );
    }

    const lesson = await Lesson.findOne({
        courseId: enrollment.courseId,
        order: enrollment.completedLessonOrder + 1,
    });
    if (!lesson) {
        throw new ApiError(
            status.BAD_REQUEST,
            'No further lessons to complete',
        );
    }
    if (!lesson.videoId) {
        throw new ApiError(
            status.BAD_REQUEST,
            'This lesson does not have a video to watch',
        );
    }

    const payload = {
        completedLessonOrder: enrollment.completedLessonOrder + 1,
    };

    const result = await Enrollment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const getAllEnrollments = async () => {
    const enrollments = await Enrollment.find({ paymentStatus: 'paid' })
        .populate({
            path: 'courseId',
            populate: {
                path: 'instructorId',
            },
        })
        .populate('studentId');

    const result = await Promise.all(
        enrollments.map(async (enrollment) => {
            const totalLessons = await Lesson.countDocuments({
                courseId: enrollment.courseId,
            });

            const progress =
                totalLessons > 0
                    ? Math.round(
                          (enrollment.completedLessonOrder / totalLessons) *
                              100,
                      )
                    : 0;

            return {
                ...enrollment.toObject(),
                totalLessons,
                progress,
            };
        }),
    );

    return result;
};

export const EnrollmentServices = {
    createEnrollment,
    getEnrollmentById,
    getMyEnrollments,
    updateEnrollmentCompletedOrder,
    getAllEnrollments,
};
