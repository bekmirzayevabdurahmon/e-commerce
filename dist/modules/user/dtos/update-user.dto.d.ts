import { UserRole } from "src/enums";
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    role?: UserRole;
    companyName?: string;
    isVerified?: boolean;
}
