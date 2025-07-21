import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';

export const CourseController = {
  async create(req: Request, res: Response) {
    const course = await CourseService.create(req.body);
    return res.status(201).json(course);
  },

  async getAll(req: Request, res: Response) {
    const courses = await CourseService.getAll();
    return res.json(courses);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const course = await CourseService.getById(id);
    if (!course) return res.status(404).json({ message: 'Curso não encontrado' });
    return res.json(course);
  }
};
