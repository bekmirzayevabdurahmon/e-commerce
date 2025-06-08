import { UserRole } from "src/enums";
export declare class RegisterDto {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: UserRole.USER;
    companyName: string;
}
