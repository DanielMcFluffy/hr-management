import { Admin } from "./admin";
import { Token } from "./token";

//delete endpoints will return this response
export interface BaseResponse {
    response: {
        statusCode: number;
        message: string;
    }
}

export interface Response<T> extends BaseResponse {
    result: T;
}

export interface TokenResponse extends BaseResponse {
    auth: Token;
}

export type LoginResponse = Response<Admin> & TokenResponse;
