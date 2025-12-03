import { Schema, model } from 'mongoose';
import { IInstructor } from './instructor.interface';

const instructorSchema = new Schema<IInstructor>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Instructor = model<IInstructor>('Instructor', instructorSchema);
