import { Schema, model } from 'mongoose';
import { IEnrollment } from './enrollment.interface';
import { PaymentStatus } from '../payment/payment.constant';

const enrollmentSchema = new Schema<IEnrollment>(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        completedLessonIndex: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentStatus: {
            type: String,
            enum: PaymentStatus,
            default: 'unpaid',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Enrollment = model<IEnrollment>('Enrollment', enrollmentSchema);
