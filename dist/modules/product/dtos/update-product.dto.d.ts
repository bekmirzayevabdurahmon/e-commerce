import { SpecsDto } from './create-product.dto';
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    brand?: string;
    categoryId?: string;
    images?: string[];
    specs?: SpecsDto;
    stock?: number;
    sellerId?: string;
}
