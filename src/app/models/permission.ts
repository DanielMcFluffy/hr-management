//will be used for the admin model
export type PermissionLevel = "E01" | "E02" | "E03" | "PS01" | "PS02" | "PS03";

//enables us to map the permission level to the actions that can be performed
type PermissionMapping = {
    "E01": ["ViewEmployee", "CreateEmployee", "UpdateEmployee", "DeleteEmployee"],
    "E02": ["ViewEmployee", "CreateEmployee", "UpdateEmployee"],
    "E03": ["ViewEmployee"],
    "PS01": ["ViewPosition", "CreatePosition", "UpdatePosition", "DeletePosition"],
    "PS02": ["ViewPosition","CreatePosition", "UpdatePosition"],
    "PS03": ["ViewPosition"],
}

//this maps the permission level to the actions that can be performed
//example:
//PermissionActions<"E01"> = ["ViewEmployee", "CreateEmployee", "UpdateEmployee", "DeleteEmployee"]
export type PermissionActions<TLevel extends keyof PermissionMapping> = PermissionMapping[TLevel] 


export interface Permission <TLevel extends keyof PermissionMapping>{
    permissionLevel: TLevel;
    permissionDesc: string;
    permissionAction: PermissionMapping[TLevel];
    created_at: string;
    updated_at: string;

    [resouces: string]: any;
}
