import { Types } from 'mongoose';

export interface IQuizAttempt {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    lessonId: Types.ObjectId;
    enrollmentId: Types.ObjectId;
    submittedAnswers: number[];
    score: number;
    totalQuestions: number;
}
