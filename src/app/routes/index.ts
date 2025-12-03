import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InstructorRoutes } from '../modules/instructor/instructor.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
