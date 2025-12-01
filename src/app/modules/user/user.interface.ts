import { UserRoles } from './user.constant';

export type TUserRole = (typeof UserRoles)[number];

export interface IUser {
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: TUserRole;
    needPasswordChange?: boolean;
}
