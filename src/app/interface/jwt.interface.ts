import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

export type TDecodedUser = {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: TUserRole;
    hasPassword: boolean;
} & JwtPayload;
