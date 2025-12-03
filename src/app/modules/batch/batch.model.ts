import { Schema, model } from 'mongoose';
import { IBatch } from './batch.interface';

const batchSchema = new Schema<IBatch>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Batch = model<IBatch>('Batch', batchSchema);
