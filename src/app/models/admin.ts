export interface Admin {
    username: string;
    password: string;
    email: string;
    isSuperAdmin: boolean;
    permission: any;
    loginAttempts: number;
    isLocked: boolean;
    lockoutEnd: any;
    isLogin: boolean;
    lastLogin: any;
    refreshToken: string;
    refreshTokenExpiry: string;
    id: {
        timestamp: number;
        machine: number;
        pid: number;
        increment: number;
        creationTime: string;
    },
    created_at: string;
    updated_at: string;
}