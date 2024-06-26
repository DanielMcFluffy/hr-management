import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from "../models/token";
import { UserAdmin } from "../models/user";

@Injectable({
    providedIn: 'root'
})

export class UserTokenStoreService {

    constructor(
    ) {}

    getUser(): UserAdmin {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    storeUser(user: UserAdmin) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    clearUser() {
        sessionStorage.removeItem('user');
    }
    
    decodeToken(token: string): TokenPayload {
        return jwtDecode(token) as TokenPayload;
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

    isTokenExpired(token: string): boolean {
        try {
            const decoded = this.decodeToken(token);
            const {exp} = decoded;
            return exp * 1000 < new Date().valueOf();
        } catch (error) {
            console.log('Failed to decode token', error);
            return false
        }
    }

    getUserIdFromToken(token: string): string {
        try {
            const decoded = this.decodeToken(token);
            const {ObjectId} = decoded;
            return ObjectId;
        } catch (error) {
            console.log('Failed to decode token', error);
            return ""
        }
    }


}