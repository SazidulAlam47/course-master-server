import { Types } from 'mongoose';

export interface IBatch {
    courseId: Types.ObjectId;
    number: number;
    startDate: Date;
    endDate: Date;
}
