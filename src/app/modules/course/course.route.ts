import express from 'express';
import auth from '../../middlewares/auth';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.get('/', auth(), CourseControllers.getAllCourse);

router.get('/:id', auth(), CourseControllers.getCourse);

router.post('/', auth('admin'), CourseControllers.createCourse);

router.put('/:id', auth('admin'), CourseControllers.updateCourse);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CourseRoutes = router;
