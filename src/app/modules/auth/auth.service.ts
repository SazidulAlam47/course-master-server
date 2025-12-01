import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TStudentRegisterPayload } from './auth.interface';
import sendEmail from '../../utils/sendEmail';
import config from '../../config';
import { createResetToken, verifyResetToken } from '../../utils/jwt';
import { TDecodedUser } from '../../interface/jwt.interface';

const registerStudent = async (payload: TStudentRegisterPayload) => {
    const isUserExists = await User.findOne({ email: payload.email });

    if (isUserExists) {
        throw new ApiError(status.CONFLICT, 'This Email is Already registered');
    }

    const hashedPassword = await hashPassword(payload.password);

    const newUser: IUser = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        image: payload.image,
        role: 'student',
        needPasswordChange: false,
    };

    // create the user
    const createdUser = await User.create(newUser);

    // Return user without sensitive fields
    const userResponse = await User.findById(createdUser._id);
    return userResponse;
};

const setPassword = async (decodedUser: TDecodedUser, password: string) => {
    const user = await User.findById(decodedUser.id).select('+password');

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    if (user?.password) {
        throw new ApiError(
            status.CONFLICT,
            'A password is already set for this account',
        );
    }

    const hashedPassword = await hashPassword(password);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
        },
        {
            new: true,
        },
    );
    return null;
};

const changePassword = async (
    decodedUser: TDecodedUser,
    payload: { oldPassword: string; newPassword: string },
) => {
    const user = await User.findById(decodedUser.id).select('+password');

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    if (!user?.password) {
        throw new ApiError(
            status.BAD_REQUEST,
            'Password not set for this account',
        );
    }

    const isCorrectPassword = await comparePassword(
        payload.oldPassword,
        user.password,
    );

    if (!isCorrectPassword) {
        throw new ApiError(status.FORBIDDEN, 'Old password did not matched');
    }

    const newHashedPassword = await hashPassword(payload.newPassword);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: newHashedPassword,
            needsPasswordChange: false,
        },
        {
            new: true,
        },
    );
    return null;
};

const forgetPassword = async (email: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    const jwtPayload = {
        id: user._id.toString(),
        email: user.email,
    };

    const resetToken = createResetToken(jwtPayload);

    const resetLink = `${config.client_url}/reset-password?id=${user.id}&token=${resetToken}`;

    const subject = 'Reset Password';
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <p>Regards,</p>
            <p><strong>Course Master</strong></p>
        </div>
        `;

    await sendEmail(user.email, subject, htmlBody);

    return null;
};

const resetPassword = async (
    tokenBearer: string | undefined,
    payload: { id: string; password: string },
) => {
    if (!tokenBearer) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
    const token = tokenBearer.split(' ')[1]; // Extract token after "Bearer"
    if (!token) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = verifyResetToken(token);

    const user = await User.findById(payload.id);

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    // check payload email and decoded email
    if (decoded.email !== user.email) {
        throw new ApiError(status.FORBIDDEN, 'Forbidden access');
    }

    const hashedPassword = await hashPassword(payload.password);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
            needsPasswordChange: false,
        },
        {
            new: true,
        },
    );
    return null;
};

export const AuthServices = {
    registerStudent,
    changePassword,
    forgetPassword,
    resetPassword,
    setPassword,
};
