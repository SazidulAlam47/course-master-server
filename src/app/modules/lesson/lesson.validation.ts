import z from 'zod';
import { LessonTypes } from './lesson.constant';

const quizQuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number(),
});

const createLesson = z.object({
    courseId: z.string(),
    title: z.string(),
    type: z.enum(LessonTypes),
    duration: z.string(),
    videoId: z.string().optional(),
    assignmentTask: z.string().optional(),
    quizQuestions: z.array(quizQuestionSchema).optional(),
});

const updateLesson = z.object({
    title: z.string().optional(),
    type: z.enum(LessonTypes).optional(),
    duration: z.string().optional(),
    videoId: z.string().optional(),
    assignmentTask: z.string().optional(),
    quizQuestions: z.array(quizQuestionSchema).optional(),
});

export const LessonValidations = {
    createLesson,
    updateLesson,
};
