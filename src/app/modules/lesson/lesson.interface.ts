import { Types } from 'mongoose';
import { LessonTypes } from './lesson.constant';

export type TLessonType = (typeof LessonTypes)[number];

export interface IQuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface ILesson {
    courseId: Types.ObjectId;
    title: string;
    type: TLessonType;
    duration: string;
    order: number;
    videoId?: string;
    assignmentTask?: string;
    quizQuestions?: IQuizQuestion[];
}
