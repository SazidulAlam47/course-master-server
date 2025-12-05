import express from 'express';
import auth from '../../middlewares/auth';
import { EnrollmentControllers } from './enrollment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EnrollmentValidations } from './enrollment.validation';

const router = express.Router();

router.get('/', auth('admin'), EnrollmentControllers.getAllEnrollments);

router.get(
    '/my-enrollments',
    auth('student'),
    EnrollmentControllers.getMyEnrollments,
);

router.get('/:id', auth(), EnrollmentControllers.getEnrollmentById);

router.post(
    '/',
    auth('student'),
    validateRequest(EnrollmentValidations.createEnrollment),
    EnrollmentControllers.createEnrollment,
);

router.patch(
    '/:id',
    auth('student'),
    EnrollmentControllers.updateEnrollmentCompletedOrder,
);

export const EnrollmentRoutes = router;
