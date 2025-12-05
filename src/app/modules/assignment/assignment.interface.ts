import { Types } from 'mongoose';

export interface IAssignment {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    lessonId: Types.ObjectId;
    enrollmentId: Types.ObjectId;
    submissionText: string;
    feedback?: string;
}

export interface ICreateAssignmentPayload {
    lessonId: string;
    submissionText: string;
}
