export declare class SpecsDto {
    color: string;
    ram: string;
    storage: string;
    processor: string;
    battery: string;
    camera: string;
    selfieCamera: string;
}
export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    brand: string;
    categoryId: string;
    images: string;
    specs: SpecsDto;
    stock: number;
    sellerId: string;
}
