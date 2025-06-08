"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsHelper = void 0;
const common_1 = require("@nestjs/common");
const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
let FsHelper = class FsHelper {
    async uploadFile(file) {
        const fileFolder = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder, { recursive: true });
        }
        const extension = file.originalname.split('.').pop() || 'txt';
        let fileName = `${Date.now()}-file.${extension}`;
        await fsPromises.writeFile(path.join(fileFolder, fileName), file.buffer);
        return {
            message: 'success ✅',
            fileUrl: fileName,
        };
    }
    async removeFiles(fileName) {
        const files = Array.isArray(fileName) ? [...fileName] : [fileName];
        for (const file of files) {
            const filePath = path.join(process.cwd(), 'uploads', file);
            if (fs.existsSync(filePath)) {
                await fsPromises.unlink(filePath);
            }
        }
        return {
            message: "success ✅",
        };
    }
};
exports.FsHelper = FsHelper;
exports.FsHelper = FsHelper = __decorate([
    (0, common_1.Injectable)()
], FsHelper);
//# sourceMappingURL=fs.helper.js.map