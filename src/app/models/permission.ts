type PermissionAction = 'View' | 'Create' | 'Edit' | 'Delete';
type PermissionLevel = 1 | 2 | 3;

export interface Permission {
    permissionLevel: PermissionLevel
    permissionDesc: string;
    permissionAction: PermissionAction[];
    created_at: string;
    updated_at: string;

    [resouces: string]: any;
}

