import { Types } from 'mongoose';
import { TPaymentStatus } from '../payment/payment.interface';

export interface IEnrollment {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    paymentStatus: TPaymentStatus;
    completedLessonIndex: number;
}
