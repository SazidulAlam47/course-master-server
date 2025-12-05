import { Schema, model } from 'mongoose';
import { IQuizAttempt } from './quizAttempt.interface';

const quizAttemptSchema = new Schema<IQuizAttempt>(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        lessonId: {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
            required: true,
        },
        enrollmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Enrollment',
            required: true,
        },
        submittedAnswers: {
            type: [Number],
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const QuizAttempt = model<IQuizAttempt>(
    'QuizAttempt',
    quizAttemptSchema,
);
