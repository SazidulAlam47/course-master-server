import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import { UserRoles } from './user.constant';

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: 0,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: UserRoles,
        },
        needPasswordChange: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);

export const User = model<IUser>('User', userSchema);
