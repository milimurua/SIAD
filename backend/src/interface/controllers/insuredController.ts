import { Request, Response } from "express";
import { InsuredRepository } from "../../infrastructure/db/InsuredRepository";
import { SinisterRepository } from "../../infrastructure/db/SinisterRepository";
import { PermissionChecker } from "../../application/utils/PermissionChecker";

const insuredRepo = new InsuredRepository();
const sinisterRepo = new SinisterRepository();

export const createInsured = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canCreateInsured")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para crear asegurados"
      });
    }

    const insured = await insuredRepo.create(req.body);
    res.status(201).json(insured);
  } catch (error: any) {
    console.error("Error creating insured:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getInsureds = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadInsured")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer asegurados"
      });
    }

    const insureds = await insuredRepo.findAll();
    res.json(insureds);
  } catch (error: any) {
    console.error("Error getting insureds:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getInsuredById = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadInsured")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer asegurados"
      });
    }

    const { id } = req.params;
    const insured = await insuredRepo.findById(id);
    
    if (!insured) {
      return res.status(404).json({ message: "Asegurado no encontrado" });
    }

    res.json(insured);
  } catch (error: any) {
    console.error("Error getting insured:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateInsured = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canUpdateInsured")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para actualizar asegurados"
      });
    }

    const { id } = req.params;
    const insured = await insuredRepo.update(id, req.body);
    res.json(insured);
  } catch (error: any) {
    console.error("Error updating insured:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getSinistersByInsuredDni = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadSinister")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer siniestros"
      });
    }

    const { dni } = req.params;
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
export const getInsuredByDni = async (req: Request, res: Response) => {
  try {
    if (!PermissionChecker.hasPermission(req, "canReadInsured")) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: "No tiene permisos para leer asegurados"
      });
    }

    const { dni } = req.params;
    if (!dni) {
      return res.status(400).json({ message: "DNI es requerido" });
    }

    const insured = await insuredRepo.findByDni(dni);
    
    if (!insured) {
      return res.status(404).json({ message: "No se encontró ningún asegurado con ese DNI" });
    }

    res.json(insured);
  } catch (error: any) {
    console.error("Error getting insured by DNI:", error);
    res.status(500).json({ message: error.message });
  }
};
