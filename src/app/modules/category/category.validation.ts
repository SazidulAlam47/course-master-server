import z from 'zod';

const createCategory = z.object({
    name: z.string(),
});

const updateCategory = z.object({
    name: z.string().optional(),
});

export const CategoryValidations = {
    createCategory,
    updateCategory,
};
