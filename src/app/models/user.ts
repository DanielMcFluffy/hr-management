import { Token } from "./token";
import { Admin } from "./admin";

export interface User {
    token: Token;
    admin: Admin;
}
