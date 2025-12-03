import z from 'zod';

const createCourse = z.object({
    title: z.string(),
    description: z.string(),
    instructor: z.string(),
    thumbnail: z.url().optional(),
    price: z.number(),
    category: z.string(),
    isPublished: z.string(),
});

const updateCourse = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    instructor: z.string().optional(),
    thumbnail: z.url().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    isPublished: z.string().optional(),
});

export const CourseValidations = {
    createCourse,
    updateCourse,
};
