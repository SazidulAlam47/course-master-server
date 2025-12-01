import { User } from './user.model';
import { TDecodedUser } from '../../interface/jwt.interface';

const getMe = async (decodedUser: TDecodedUser) => {
    const user = await User.findById(decodedUser.id);
    return user;
};

export const UserServices = {
    getMe,
};
