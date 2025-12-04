import { Types } from 'mongoose';
import { PaymentStatus } from './payment.constant';

export type TPaymentStatus = (typeof PaymentStatus)[number];

export interface IPayment {
    enrollmentId: Types.ObjectId;
    amount: number;
    status: TPaymentStatus;
    transactionId: string;
    paymentGatewayData?: string;
}
