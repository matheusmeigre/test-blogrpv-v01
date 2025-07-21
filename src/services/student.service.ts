import { prisma } from '../config/prisma';

export const StudentService = {
  async create(data: any) {
    return prisma.student.create({ data });
  },

  async getAll() {
    return prisma.student.findMany();
  },

  async getById(id: string) {
    return prisma.student.findUnique({ where: { id } });
  }
};
