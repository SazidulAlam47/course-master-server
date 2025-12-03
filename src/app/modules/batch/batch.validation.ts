import z from 'zod';

const createBatch = z.object({
    courseId: z.string(),
    number: z.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});

const updateBatch = z.object({
    courseId: z.string().optional(),
    number: z.number().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
});

export const BatchValidations = {
    createBatch,
    updateBatch,
};
