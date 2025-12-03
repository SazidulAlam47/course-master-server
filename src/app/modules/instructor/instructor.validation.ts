import z from 'zod';

const createInstructor = z.object({
    name: z.string(),
    avatar: z.url().optional(),
    title: z.string(),
    bio: z.string(),
});

const updateInstructor = z.object({
    name: z.string().optional(),
    avatar: z.url().optional(),
    title: z.string().optional(),
    bio: z.string().optional(),
});

export const InstructorValidations = {
    createInstructor,
    updateInstructor,
};
