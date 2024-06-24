export interface Token {
    result: {
        token: string;
        refreshToken: string;
    };
    [resource: string]: any; // To allow for additional dynamic properties
}

export interface TokenPayload {
    ObjectId: string;
    unique_name: string;
    exp: number;
    iat: number;
    nbf: number;
    iss: string;
    aud: string;
    [payload: string]: any; // To allow for additional dynamic properties
}
