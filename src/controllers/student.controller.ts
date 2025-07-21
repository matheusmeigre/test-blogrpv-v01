import { Request, Response } from 'express';
import { StudentService } from '../services/student.service';

export const StudentController = {
  async create(req: Request, res: Response) {
    const student = await StudentService.create(req.body);
    return res.status(201).json(student);
  },

  async getAll(req: Request, res: Response) {
    const students = await StudentService.getAll();
    return res.json(students);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const student = await StudentService.getById(id);
    if (!student) return res.status(404).json({ message: 'Aluno não encontrado' });
    return res.json(student);
  }
};
