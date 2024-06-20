export interface Token {
    result: {
        token: string;
        refreshToken: string;
    };
    [resource: string]: any; // To allow for additional dynamic properties
}
