import z from 'zod';

const newPasswordSchema = z
    .string({ message: 'Please enter your New Password' })
    .min(6, 'Password must be at least 6 characters long')
    .refine(
        (password) => /[a-zA-Z]/.test(password),
        'Password must contain at least one letter',
    )
    .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter',
    )
    .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter',
    )
    .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number',
    )
    .refine(
        (password) => /[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/.test(password),
        'Password must contain at least one special character',
    );

const registerStudent = z.object({
    name: z.string(),
    email: z.email(),
    password: newPasswordSchema,
    image: z.string().optional(),
});

const setPassword = z.object({
    password: newPasswordSchema,
});

const changePassword = z.object({
    oldPassword: z.string().min(1),
    newPassword: newPasswordSchema,
});

const forgetPassword = z.object({
    email: z.email(),
});

const resetPassword = z.object({
    id: z.string().min(1),
    password: newPasswordSchema,
});

export const AuthValidations = {
    registerStudent,
    changePassword,
    forgetPassword,
    resetPassword,
    setPassword,
};
