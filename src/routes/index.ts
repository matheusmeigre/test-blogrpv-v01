import { Router } from 'express';
import courseRoutes from './course.routes';
import classRoutes from './class.routes';
import studentRoutes from './student.routes';
import authRoutes from './auth.routes';

export const router = Router();

router.use('/courses', courseRoutes);
router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API PontoSe ativa!' });
});
