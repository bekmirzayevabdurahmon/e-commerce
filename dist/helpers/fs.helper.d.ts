export declare class FsHelper {
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
        fileUrl: string;
    }>;
    removeFiles(fileName: string | string[]): Promise<{
        message: string;
    }>;
}
