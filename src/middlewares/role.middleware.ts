import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors/api-error';

export function hasRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    // Verifica se o usuário está autenticado
    if (!user || user.role !== requiredRole) {
      throw new ForbiddenError('Acesso negado. Você não tem permissão para executar esta ação.');
    }

    // Verifica se o usuário tem a role necessária
    if (user.role !== requiredRole) {
      throw new ForbiddenError(`Acesso negado. Requer a role: ${requiredRole}.`);
    }

    // Se tudo estiver certo, passa para a próxima função (o controller da rota)
    next();
  };
}