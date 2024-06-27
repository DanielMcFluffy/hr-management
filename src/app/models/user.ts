import { Token } from "./token";
import { Admin } from "./admin";

export interface UserAdmin  {
    auth: Token;
    admin: Admin;
}
