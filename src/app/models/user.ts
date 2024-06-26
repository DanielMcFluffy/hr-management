import { Token } from "./token";
import { Admin } from "./admin";

export interface UserAdmin {
    token: Token;
    admin: Admin;
}
