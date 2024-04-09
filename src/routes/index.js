import { Router } from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import newsRoute from './news.route.js';
import swaggerRoute from './swagger.route.cjs';

const router = Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/news', newsRoute);
router.use('/doc', swaggerRoute);

export default router;
