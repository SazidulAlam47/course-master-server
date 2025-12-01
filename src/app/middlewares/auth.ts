import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import ApiError from '../errors/ApiError';
import verifyNextAuthToken from '../utils/verifyNextAuthToken';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const tokenBearer = req.headers.authorization;

            if (!tokenBearer) {
                throw new ApiError(
                    status.UNAUTHORIZED,
                    'You are not authorized',
                );
            }
            const token = tokenBearer.split(' ')[1]; // Extract token after "Bearer"
            if (!token) {
                throw new ApiError(
                    status.UNAUTHORIZED,
                    'You are not authorized',
                );
            }
            // check the token is valid
            const decoded = await verifyNextAuthToken(token);

            const { id, role } = decoded;

            const user = await User.findById(id);

            if (!user) {
                throw new ApiError(
                    status.UNAUTHORIZED,
                    'You are not authorized',
                );
            }

            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new ApiError(status.FORBIDDEN, 'Forbidden access');
            }
            req.user = decoded;
            next();
        },
    );
};

export default auth;
