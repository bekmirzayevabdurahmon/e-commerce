"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FileValidationPipe = class FileValidationPipe {
    transform(files) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files uploaded.');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 2 * 1024 * 1024;
        for (const file of files) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Only JPG, JPEG and PNG formats are allowed.');
            }
            if (file.size > maxSize) {
                throw new common_1.BadRequestException('File size should be smaller than 2 MB.');
            }
        }
        return files;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
//# sourceMappingURL=file-validation.pipe.js.map