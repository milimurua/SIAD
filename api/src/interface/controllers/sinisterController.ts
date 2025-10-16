import { Request, Response } from "express";
import { SinisterRepository } from "../../infrastructure/db/SinisterRepository";
import { SinisterService } from "../../application/sinister/SinisterService";

const sinisterService = new SinisterService(new SinisterRepository());

export const createSinister = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await sinisterService.createSinister(req.body, user);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getSinisters = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await sinisterService.getAllByInsurance(user);
    res.json(result);
  } catch (e: any) {
    res.status(403).json({ message: e.message });
  }
};
