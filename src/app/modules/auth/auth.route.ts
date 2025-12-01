import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/register',
    validateRequest(AuthValidations.registerStudent),
    AuthControllers.registerStudent,
);

router.post(
    '/set-password',
    auth(),
    validateRequest(AuthValidations.setPassword),
    AuthControllers.setPassword,
);

router.post(
    '/change-password',
    auth(),
    validateRequest(AuthValidations.changePassword),
    AuthControllers.changePassword,
);

router.post(
    '/forget-password',
    validateRequest(AuthValidations.forgetPassword),
    AuthControllers.forgetPassword,
);

router.post(
    '/reset-password',
    validateRequest(AuthValidations.resetPassword),
    AuthControllers.resetPassword,
);

router.get('/logout', AuthControllers.logout);

export const AuthRoutes = router;
