import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';
import { BlogRouter } from '../modules/blog/blog.router';
import { adminRouter } from '../modules/admin/admin.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRouter,
  },
  {
    path: '/blogs',
    routes: BlogRouter,
  },
  {
    path: '/admin',
    routes: adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
