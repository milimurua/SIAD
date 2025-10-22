import { Request, Response, NextFunction } from "express";
import { UserRole, ROLE_PERMISSIONS } from "../../domain/types/roles";

// Exportar ROLE_PERMISSIONS para uso en otros archivos
export { ROLE_PERMISSIONS };

// Middleware para verificar roles específicos
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Debe estar autenticado para acceder a este recurso"
      });
    }

    if (!allowedRoles.includes(req.user.type)) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: `Acceso denegado. Roles permitidos: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};

// Middleware para verificar permisos específicos
export const requirePermission = (permission: keyof typeof ROLE_PERMISSIONS.insurance) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Debe estar autenticado para acceder a este recurso"
      });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.type];
    
    if (!userPermissions[permission]) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: `No tiene permisos para realizar esta acción: ${permission}`
      });
    }

    next();
  };
};

// Middleware para verificar múltiples permisos (todos deben ser verdaderos)
export const requireAllPermissions = (...permissions: (keyof typeof ROLE_PERMISSIONS.insurance)[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Debe estar autenticado para acceder a este recurso"
      });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.type];
    const hasAllPermissions = permissions.every(permission => userPermissions[permission]);
    
    if (!hasAllPermissions) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: `No tiene todos los permisos necesarios: ${permissions.join(', ')}`
      });
    }

    next();
  };
};

// Middleware para verificar al menos uno de varios permisos
export const requireAnyPermission = (...permissions: (keyof typeof ROLE_PERMISSIONS.insurance)[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Debe estar autenticado para acceder a este recurso"
      });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.type];
    const hasAnyPermission = permissions.some(permission => userPermissions[permission]);
    
    if (!hasAnyPermission) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        message: `No tiene ninguno de los permisos necesarios: ${permissions.join(', ')}`
      });
    }

    next();
  };
};
