import express from 'express';
import auth from '../../middlewares/auth';
import { AssignmentControllers } from './assignment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AssignmentValidations } from './assignment.validation';

const router = express.Router();

router.get('/', auth('admin'), AssignmentControllers.getAllAssignments);

router.get(
    '/lesson/:lessonId',
    auth(),
    AssignmentControllers.getAssignmentByLessonId,
);

router.post(
    '/',
    auth('student'),
    validateRequest(AssignmentValidations.createAssignment),
    AssignmentControllers.createAssignment,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(AssignmentValidations.updateAssignment),
    AssignmentControllers.updateAssignment,
);

export const AssignmentRoutes = router;
