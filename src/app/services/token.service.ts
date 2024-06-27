import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    
    decodeToken(token: string): any {
        return jwtDecode(token);
    }

    getToken(): string {
        return sessionStorage.getItem('token') ?? 'No token found';
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