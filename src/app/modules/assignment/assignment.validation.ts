import z from 'zod';

const createAssignment = z.object({
    lessonId: z.string(),
    submissionText: z.string(),
});

const updateAssignment = z.object({
    feedback: z.string(),
});

export const AssignmentValidations = {
    createAssignment,
    updateAssignment,
};
