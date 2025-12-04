import express from 'express';
import auth from '../../middlewares/auth';
import { LessonControllers } from './lesson.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LessonValidations } from './lesson.validation';

const router = express.Router();

router.get('/:id', auth(), LessonControllers.getLessonById);

router.post(
    '/',
    auth('admin'),
    validateRequest(LessonValidations.createLesson),
    LessonControllers.createLesson,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(LessonValidations.updateLesson),
    LessonControllers.updateLesson,
);

router.delete('/:id', auth('admin'), LessonControllers.deleteLesson);

export const LessonRoutes = router;
