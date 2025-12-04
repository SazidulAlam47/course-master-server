import { Schema, model } from 'mongoose';
import { ILesson, IQuizQuestion } from './lesson.interface';
import { LessonTypes } from './lesson.constant';

const quizQuestionSchema = new Schema<IQuizQuestion>(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
        },
        correctAnswer: {
            type: Number,
            required: true,
        },
    },
    { _id: false },
);

const lessonSchema = new Schema<ILesson>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: LessonTypes,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        videoId: {
            type: String,
        },
        assignmentTask: {
            type: String,
        },
        quizQuestions: {
            type: [quizQuestionSchema],
        },
    },
    {
        timestamps: true,
    },
);

export const Lesson = model<ILesson>('Lesson', lessonSchema);
