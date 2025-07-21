import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errorMessage });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const token = await AuthService.login(req.body);
      return res.json({ token });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return res.status(401).json({ error: errorMessage });
    }
  }
};
