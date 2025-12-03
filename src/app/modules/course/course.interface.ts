import { Types } from 'mongoose';

export interface ICourse {
    title: string;
    description: string;
    instructor: Types.ObjectId;
    thumbnail?: string;
    price: number;
    category: string;
    isPublished: string;
}
