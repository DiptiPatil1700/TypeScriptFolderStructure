import { Request, Response } from 'express';
import authService from '../services/authService';



export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    
    res.status(201).json(user);
  } catch (error : any) {
    res.status(400).json({ message: error.message });
  }
};

// Similar method for login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error : any) {
    res.status(400).json({ message: error.message });
  }
};
