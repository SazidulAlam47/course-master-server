import z from 'zod';

const createEnrollment = z.object({
    courseId: z.string(),
});

const updateEnrollment = z.object({
    completedLessonIndex: z.number().optional(),
});

export const EnrollmentValidations = {
    createEnrollment,
    updateEnrollment,
};
