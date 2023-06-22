export interface UserToken {
    id: string;
    name: string;
    role: number;
    phoneNumber: string;
    email: string;
    token: string;
    expireDate: Date;
}
