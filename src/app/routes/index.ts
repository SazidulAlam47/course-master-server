import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InstructorRoutes } from '../modules/instructor/instructor.route';
import { CourseRoutes } from '../modules/course/course.route';
import { BatchRoutes } from '../modules/batch/batch.route';
import { CategoryRoutes } from '../modules/category/category.route';

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
        path: '/batches',
        route: BatchRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
