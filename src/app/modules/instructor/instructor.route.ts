import express from 'express';
import auth from '../../middlewares/auth';
import { InstructorControllers } from './instructor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InstructorValidations } from './instructor.validation';

const router = express.Router();

router.get('/', auth(), InstructorControllers.getAllInstructor);

router.get('/:id', auth(), InstructorControllers.getInstructor);

router.post(
    '/',
    auth('admin'),
    validateRequest(InstructorValidations.createInstructor),
    InstructorControllers.createInstructor,
);

router.put(
    '/:id',
    auth('admin'),
    validateRequest(InstructorValidations.updateInstructor),
    InstructorControllers.updateInstructor,
);

router.delete('/:id', auth('admin'), InstructorControllers.deleteInstructor);

export const InstructorRoutes = router;
