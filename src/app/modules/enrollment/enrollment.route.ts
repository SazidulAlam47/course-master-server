import express from 'express';
import auth from '../../middlewares/auth';
import { EnrollmentControllers } from './enrollment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EnrollmentValidations } from './enrollment.validation';

const router = express.Router();

router.post(
    '/',
    auth('student'),
    validateRequest(EnrollmentValidations.createEnrollment),
    EnrollmentControllers.createEnrollment,
);

router.get(
    '/my-enrollments',
    auth('student'),
    EnrollmentControllers.getMyEnrollments,
);

router.get('/:id', auth(), EnrollmentControllers.getEnrollmentById);

router.patch(
    '/:id',
    auth('student'),
    validateRequest(EnrollmentValidations.updateEnrollment),
    EnrollmentControllers.updateEnrollment,
);

export const EnrollmentRoutes = router;
