import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/me', auth(), UserControllers.getMe);

export const UserRoutes = router;
