import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';

export const errorHandler = (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Loga o erro completo no console para depuração
    console.error(error);

    // Verifica se o erro é uma instância de ApiError
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ error: error.message })
    }

    // Se não for um ApiError, retorna um erro genérico 500
    return res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
}