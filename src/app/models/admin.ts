import { Permission } from "./permission";

export interface Admin {
    username: string;
    password: string;
    email: string;
    isSuperAdmin: boolean;
    permission: Permission[]; // the length here is 1
    loginAttempts: number;
    isLocked: boolean;
    lockoutEnd: any;
    isLogin: boolean;
    lastLogin: any;
    refreshToken: string;
    refreshTokenExpiry: string;
    created_at: string;
    updated_at: string;

    [resouces: string]: any;

}