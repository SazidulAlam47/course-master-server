import z from 'zod';

const createQuizAttempt = z.object({
    lessonId: z.string(),
    submittedAnswers: z.array(z.number()),
});

export const QuizAttemptValidations = {
    createQuizAttempt,
};
