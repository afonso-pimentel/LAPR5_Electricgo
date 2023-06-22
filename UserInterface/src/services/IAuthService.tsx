import { UserToken } from "../dtos/User/UserToken";

export interface IAuthService {
    setLoginUser(user: String): UserToken;
    getUser(): UserToken;
    getToken(): string;
    userAuthenticated(): boolean;
    login(): void;
    logout(): void;
    validateResourceAccess(resource: string): void;
}