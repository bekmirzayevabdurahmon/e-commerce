import { UserRole } from "src/enums";
export declare class CreateUserDto {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: UserRole;
    companyName?: string;
    isVerified?: boolean;
}
