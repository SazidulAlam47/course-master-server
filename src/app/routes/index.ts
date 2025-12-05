import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InstructorRoutes } from '../modules/instructor/instructor.route';
import { CourseRoutes } from '../modules/course/course.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { LessonRoutes } from '../modules/lesson/lesson.route';
import { EnrollmentRoutes } from '../modules/enrollment/enrollment.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { QuizAttemptRoutes } from '../modules/quizAttempt/quizAttempt.route';
import { AssignmentRoutes } from '../modules/assignment/assignment.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/instructors',
        route: InstructorRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/lessons',
        route: LessonRoutes,
    },
    {
        path: '/enrollments',
        route: EnrollmentRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
    {
        path: '/quiz-attempts',
        route: QuizAttemptRoutes,
    },
    {
        path: '/assignments',
        route: AssignmentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
