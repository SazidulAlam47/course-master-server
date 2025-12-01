import { decode } from 'next-auth/jwt';
import config from '../config';
import ApiError from '../errors/ApiError';
import status from 'http-status';
import { TDecodedUser } from '../interface/jwt.interface';

const verifyNextAuthToken = async (token: string) => {
    try {
        return (await decode({
            token,
            secret: config.next_auth_secret,
        })) as TDecodedUser;
    } catch {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
};

export default verifyNextAuthToken;
