import { Request } from "express";
import { ROLE_PERMISSIONS, UserRole } from "../../domain/roles";

export class PermissionChecker {
  static hasPermission(req: Request, permission: keyof typeof ROLE_PERMISSIONS.insurance): boolean {
    if (!req.user) return false;
    return ROLE_PERMISSIONS[req.user.type][permission];
  }

  static hasAnyPermission(req: Request, permissions: (keyof typeof ROLE_PERMISSIONS.insurance)[]): boolean {
    if (!req.user) return false;
    const userPermissions = ROLE_PERMISSIONS[req.user.type];
    return permissions.some(permission => userPermissions[permission]);
  }

  static hasAllPermissions(req: Request, permissions: (keyof typeof ROLE_PERMISSIONS.insurance)[]): boolean {
    if (!req.user) return false;
    const userPermissions = ROLE_PERMISSIONS[req.user.type];
    return permissions.every(permission => userPermissions[permission]);
  }

  static hasRole(req: Request, role: UserRole): boolean {
    return req.user?.type === role;
  }

  static hasAnyRole(req: Request, roles: UserRole[]): boolean {
    return req.user ? roles.includes(req.user.type) : false;
  }

  static getUserPermissions(req: Request) {
    if (!req.user) return null;
    return ROLE_PERMISSIONS[req.user.type];
  }
}
