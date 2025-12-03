import { Types } from 'mongoose';

export interface ICourse {
    title: string;
    description: string;
    instructorId: Types.ObjectId;
    thumbnail?: string;
    price: number;
    categoryId: Types.ObjectId;
    isPublished: boolean;
}
