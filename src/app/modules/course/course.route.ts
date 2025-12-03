import express from 'express';
import auth from '../../middlewares/auth';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.get('/', auth(), CourseControllers.getAllCourse);

router.get('/:id', auth(), CourseControllers.getCourse);

router.post(
    '/',
    auth('admin'),
    validateRequest(CourseValidations.createCourse),
    CourseControllers.createCourse,
);

router.put(
    '/:id',
    auth('admin'),
    validateRequest(CourseValidations.updateCourse),
    CourseControllers.updateCourse,
);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CourseRoutes = router;
