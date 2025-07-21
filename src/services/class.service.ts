import { prisma } from '../config/prisma';
import { BadRequestError } from '../errors/api-error';

export const ClassService = {
  // Método para criar uma nova turma
  async create(data: any) {
    const { title, description, courseId, initial_date, final_date, color } = data;

    if (!title || !description || !courseId || !initial_date || !final_date) {
      throw new BadRequestError('Todos os campos (título, descrição, ID do curso, data de início e data de fim) são obrigatórios.');
    }

    return prisma.class.create({
      data: {
        title,
        description,
        courseId,
        initial_date: new Date(initial_date), // Converte a string da data para um objeto Date
        final_date: new Date(final_date),
        color: color ? color : undefined,
      },
    });
  },

  // Método para buscar todas as turmas
    async getAll() {
    return prisma.class.findMany();
  },

  // Método para buscar uma turma pelo ID
  async getById(id: string) {
    return prisma.class.findUnique({ where: { id } });
  }
};