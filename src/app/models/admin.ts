import { Permission, PermissionLevel } from "./permission";


export interface Admin {
    username: string;
    password: string;
    email: string;
    isSuperAdmin: boolean;
    permission: Permission<PermissionLevel>[] | null; // the length here is 1
    loginAttempts: number;
    isLocked: boolean;
    lockoutEnd?: string;
    isLogin: boolean;
    lastLogin: string;
    refreshToken: string;
    refreshTokenExpiry: string;
    created_at: string;
    updated_at: string;

    [resouces: string]: any;

}