import { Request, Response } from "express";
import { SinisterRepository } from "../../infrastructure/db/SinisterRepository";
import { PermissionChecker } from "../../application/utils/PermissionChecker";

const sinisterRepo = new SinisterRepository();

export const createSinister = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canCreateSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para crear siniestros"
      });
    }

    const sinister = await sinisterRepo.create(req.body);
    res.status(201).json(sinister);
  } catch (error: any) {
    console.error("Error creating sinister:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getSinisters = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer siniestros"
      });
    }

    const sinisters = await sinisterRepo.findAll();
    res.json(sinisters);
  } catch (error: any) {
    console.error("Error getting sinisters:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSinisterById = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer siniestros"
      });
    }

    const { id } = req.params;
    const sinister = await sinisterRepo.findById(id);
    
    if (!sinister) {
      return res.status(404).json({ message: "Siniestro no encontrado" });
    }

    res.json(sinister);
  } catch (error: any) {
    console.error("Error getting sinister:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSinister = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canUpdateSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para actualizar siniestros"
      });
    }

    const { id } = req.params;
    const sinister = await sinisterRepo.update(id, req.body);
    res.json(sinister);
  } catch (error: any) {
    console.error("Error updating sinister:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getSinisterStatistics = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer estadísticas de siniestros"
      });
    }

    const statistics = await sinisterRepo.getStatistics();
    res.json(statistics);
  } catch (error: any) {
    console.error("Error getting statistics:", error);
    res.status(500).json({ message: error.message });
  }
  
};
export const getSinistersByDni = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer siniestros"
      });
    }

    const { dni } = req.params;
    if (!dni) {
      return res.status(400).json({ message: "DNI es requerido" });
    }

    const sinisters = await sinisterRepo.findByInsuredDni(dni);
    
    res.json({
      dni,
      total: sinisters.length,
      sinisters
    });
  } catch (error: any) {
    console.error("Error getting sinisters by DNI:", error);
    res.status(500).json({ message: error.message });
  }
};