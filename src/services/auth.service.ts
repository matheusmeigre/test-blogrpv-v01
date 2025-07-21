import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../errors/api-error';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const AuthService = {
  async register({ name, email, password, role }: any) {
    // Validação de entrada
       if (!name || !email || !password || !role) {
      throw new BadRequestError('Todos os campos (nome, e-mail, senha e role) são obrigatórios.');
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: name }
        ],
      },
    });

    // 3. Lógica de Erro Específica
    if (existingUser) {
      if (existingUser.email === email) {
        // O e-mail já está em uso.
        throw new ForbiddenError('Este e-mail já está cadastrado.');
      }
      if (existingUser.name === name) {
        // O nome de usuário já está em uso.
        throw new ForbiddenError('Este nome de usuário já está em uso. Por favor, escolha outro.');
      }
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      // Boa prática: nunca retorne a senha, mesmo que hasheada.
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;

    } catch (error) {
      // 2. Tratamento de erro específico do Prisma: Verifica se o e-mail já existe.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // O erro P2002 indica uma violação de restrição única (unique constraint).
        throw new ForbiddenError('Este e-mail já está cadastrado.');
      }
      
      // Se for outro tipo de erro, ele será capturado pelo middleware genérico.
      throw error;
    }
  },

async login({ email, password }: any) {
    // 1. Validação de entrada.
    if (!email || !password) {
      throw new BadRequestError('E-mail e senha são obrigatórios.');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Verificação de credenciais.
    // Usamos uma única mensagem de erro por segurança, para não informar ao atacante
    // se o erro foi no e-mail (usuário não existe) ou na senha.
    if (!user) {
      throw new UnauthorizedError('E-mail ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('E-mail ou senha inválidos.');
    }

    // 3. Geração do Token.
    const token = jwt.sign(
      { sub: user.id, role: user.role }, // Payload do token
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return token;
  },
};
