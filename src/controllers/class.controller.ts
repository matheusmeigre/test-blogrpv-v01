import { Request, Response } from 'express';
import { ClassService } from '../services/class.service';

export const ClassController = {
  async create(req: Request, res: Response) {
    const classroom = await ClassService.create(req.body);
    return res.status(201).json(classroom);
  },

  async getAll(req: Request, res: Response) {
    const classes = await ClassService.getAll();
    return res.json(classes);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const classroom = await ClassService.getById(id);
    if (!classroom) return res.status(404).json({ message: 'Turma não encontrada' });
    return res.json(classroom);
  }
};
