import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from "../models/token";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})

export class UserTokenStoreService {

    constructor(
    ) {}

    getUser(): User {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    storeUser(user: User) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    clearUser() {
        sessionStorage.removeItem('user');
    }
    
    decodeToken(token: string): TokenPayload {
        return jwtDecode(token);
    }

    getToken(): string {
        return sessionStorage.getItem('token') ?? '';
    }

    setToken(token: string): void {
        sessionStorage.setItem('token', token);
    }

    removeToken(): void {
        sessionStorage.removeItem('token');
    }

    isTokenExpired(token: string): void {
        try {
            const decoded: any = jwtDecode(token!);
            console.log(decoded);
        } catch (error) {
            console.log('Failed to decode token', error);
        }
    }

    isTokenValid(token: string): boolean {
        return false;
    }


}