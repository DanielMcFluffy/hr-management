export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    permissions: string[];
    access_token: string;
    refresh_token: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
