import { prisma } from '../config/prisma';
import { BadRequestError } from '../errors/api-error';

export const CourseService = {
  async create(data: any) {
    const { title, description } = data;

    if (!title || !description) {
      throw new BadRequestError('Título e descrição são obrigatórios para criar um curso.');
  }

  const existingCourse = await prisma.course.findUnique({
      where: { 
        title: title,
      },
    });

    if (existingCourse) {
      throw new BadRequestError('Já existe um curso com este título.');
    }

    return prisma.course.create({
      data: {
        title,
        description,
      },
    });
  },

  async getAll() {
    return prisma.course.findMany();
  },

  async getById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }
};
