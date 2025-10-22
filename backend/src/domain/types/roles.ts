export type UserRole = "insurance" | "producer";

export interface UserPermissions {
  canCreateInsured: boolean;
  canReadInsured: boolean;
  canUpdateInsured: boolean;
  canDeleteInsured: boolean;
  canCreateSinister: boolean;
  canReadSinister: boolean;
  canUpdateSinister: boolean;
  canDeleteSinister: boolean;
  canManageUsers: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  insurance: {
    canCreateInsured: true,
    canReadInsured: true,
    canUpdateInsured: true,
    canDeleteInsured: true,
    canCreateSinister: true,
    canReadSinister: true,
    canUpdateSinister: true,
    canDeleteSinister: true,
    canManageUsers: false,
  },
  producer: {
    canCreateInsured: false,
    canReadInsured: true,
    canUpdateInsured: false,
    canDeleteInsured: false,
    canCreateSinister: true,
    canReadSinister: true,
    canUpdateSinister: false,
    canDeleteSinister: false,
    canManageUsers: false,
  },
};

export interface JWTPayload {
  id: string;
  email: string;
  type: UserRole;
  iat?: number;
  exp?: number;
}
