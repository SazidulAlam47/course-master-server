import express from 'express';
import auth from '../../middlewares/auth';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.get('/', CourseControllers.getAllCourses);

router.get('/admin', auth('admin'), CourseControllers.getAllCoursesAdmin);

router.get('/:id', auth(), CourseControllers.getCourseById);

router.get('/:id/public', CourseControllers.getCourseByIdPublic);

router.post(
    '/',
    auth('admin'),
    validateRequest(CourseValidations.createCourse),
    CourseControllers.createCourse,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(CourseValidations.updateCourse),
    CourseControllers.updateCourse,
);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CourseRoutes = router;
