import { Schema, model } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'Instructor',
            required: true,
        },
        thumbnail: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        isPublished: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Course = model<ICourse>('Course', courseSchema);
