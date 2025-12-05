import z from 'zod';

const createEnrollment = z.object({
    courseId: z.string(),
});

export const EnrollmentValidations = {
    createEnrollment,
};
