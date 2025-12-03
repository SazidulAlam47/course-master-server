import express from 'express';
import auth from '../../middlewares/auth';
import { InstructorControllers } from './instructor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InstructorValidations } from './instructor.validation';

const router = express.Router();

router.get('/', auth(), InstructorControllers.getAllInstructors);

router.get('/:id', auth(), InstructorControllers.getInstructorById);

router.post(
    '/',
    auth('admin'),
    validateRequest(InstructorValidations.createInstructor),
    InstructorControllers.createInstructor,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(InstructorValidations.updateInstructor),
    InstructorControllers.updateInstructor,
);

router.delete('/:id', auth('admin'), InstructorControllers.deleteInstructor);

export const InstructorRoutes = router;
