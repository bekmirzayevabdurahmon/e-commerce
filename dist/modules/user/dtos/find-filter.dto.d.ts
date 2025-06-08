import { UserRole } from 'src/enums';
export declare class FindUserDto {
    page?: string;
    limit?: string;
    search?: string;
    role?: UserRole;
    isVerified?: string;
}
