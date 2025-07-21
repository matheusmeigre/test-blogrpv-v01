import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/api-error'; // Importa o erro personalizado

// Extende a interface Request para incluir o campo 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      sub: string;
      role: string;
      [key: string]: any;
    };
  }
}

interface UserPayload {
  sub: string;
  role: string;
}

// O nome 'isAuthenticated' é mais descritivo
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // 1. Verificação de segurança para o JWT_SECRET
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    // Este é um erro de configuração do servidor, não do cliente.
    console.error("ERRO CRÍTICO: JWT_SECRET não está definido no ambiente.");
    throw new Error("Erro de configuração do servidor."); // Lança um erro genérico para o errorHandler pegar como 500
  }

  // 2. Validação do Header de Autorização
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Lança um erro semântico que será capturado pelo errorHandler
    throw new UnauthorizedError('Token de autenticação não fornecido.');
  }

  // 3. Extração do Token
  // O formato esperado é "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new UnauthorizedError('Token com formato inválido. Use o formato: Bearer <token>.');
  }
  const token = parts[1];

  // 4. Verificação e Decodificação do Token
  try {
    // jwt.verify lança um erro se o token for inválido (expirado, assinatura incorreta, etc.)
    const decoded = jwt.verify(token, JWT_SECRET);

    // 5. Validação da Estrutura do Payload (Conteúdo do Token)
    if (typeof decoded === 'object' && 'sub' in decoded && 'role' in decoded) {
      // Atribui o payload decodificado e tipado ao req.user
      req.user = decoded as { sub: string; role: string };
      
      req.user = decoded as UserPayload;
      return next();
    }

    // Se a estrutura do payload for inválida
    throw new UnauthorizedError('Token com payload malformado.');

  } catch (error) {
    // Captura erros do jwt.verify (ex: TokenExpiredError, JsonWebTokenError)
    // e lança nosso erro padronizado para o errorHandler
    throw new UnauthorizedError('Token inválido ou expirado.');
  }
}