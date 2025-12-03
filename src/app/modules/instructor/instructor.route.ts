import express from 'express';
import auth from '../../middlewares/auth';
import { InstructorControllers } from './instructor.controller';

const router = express.Router();

router.get('/', auth(), InstructorControllers.getAllInstructor);

router.get('/:id', auth(), InstructorControllers.getInstructor);

router.post('/', auth('admin'), InstructorControllers.createInstructor);

router.put('/:id', auth('admin'), InstructorControllers.updateInstructor);

router.delete('/:id', auth('admin'), InstructorControllers.deleteInstructor);

export const InstructorRoutes = router;
