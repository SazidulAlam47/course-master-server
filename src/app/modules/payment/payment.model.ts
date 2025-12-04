import { Schema, model } from 'mongoose';
import { PaymentStatus } from '../payment/payment.constant';
import { IPayment } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
    {
        enrollmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Enrollment',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: PaymentStatus,
            default: 'unpaid',
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        paymentGatewayData: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export const Payment = model<IPayment>('Payment', paymentSchema);
