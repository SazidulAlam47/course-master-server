import { Schema, model } from 'mongoose';
import { IAssignment } from './assignment.interface';

const assignmentSchema = new Schema<IAssignment>(
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
        submissionText: {
            type: String,
            required: true,
        },
        feedback: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export const Assignment = model<IAssignment>('Assignment', assignmentSchema);
