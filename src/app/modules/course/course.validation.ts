import z from 'zod';

const createCourse = z.object({
    title: z.string(),
    description: z.string(),
    instructorId: z.string(),
    thumbnail: z.url(),
    price: z.number(),
    categoryId: z.string(),
});

const updateCourse = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    instructorId: z.string().optional(),
    thumbnail: z.url().optional(),
    price: z.number().optional(),
    categoryId: z.string().optional(),
    isPublished: z.boolean().optional(),
});

export const CourseValidations = {
    createCourse,
    updateCourse,
};
