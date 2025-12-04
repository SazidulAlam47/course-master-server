import z from 'zod';

const initPayment = z.object({
    enrollmentId: z.string(),
});

export const PaymentValidations = {
    initPayment,
};
