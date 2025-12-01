import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

import status from 'http-status';
import ApiError from '../errors/ApiError';
import config from '../config';

type TResetUserPayload = {
    id: string;
    email: string;
};

export const createResetToken = (jwtPayload: TResetUserPayload) => {
    const options: SignOptions = {
        algorithm: 'HS256',
        expiresIn: config.jwt.reset_pass_token_expires_in,
    };
    return jwt.sign(jwtPayload, config.jwt.reset_pass_secret, options);
};

export const verifyResetToken = (token: string) => {
    try {
        return jwt.verify(
            token,
            config.jwt.reset_pass_secret,
        ) as TResetUserPayload & JwtPayload;
    } catch {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
};
