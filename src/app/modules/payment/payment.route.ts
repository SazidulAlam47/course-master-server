import express from 'express';
import { PaymentControllers } from './payment.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidations } from './payment.validation';

const router = express.Router();

router.post(
    '/init-payment',
    auth('student'),
    validateRequest(PaymentValidations.initPayment),
    PaymentControllers.initPayment,
);

router.post('/success', PaymentControllers.validatePayment);

router.post('/fail', PaymentControllers.paymentFailed);

router.post('/cancel', PaymentControllers.paymentCancelled);

export const PaymentRoutes = router;
