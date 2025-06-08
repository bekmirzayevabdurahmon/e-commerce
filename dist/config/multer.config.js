"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/products',
        filename: (req, file, callback) => {
            const randomName = (0, uuid_1.v4)() + (0, path_1.extname)(file.originalname);
            callback(null, randomName);
        },
    }),
    fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = (0, path_1.extname)(file.originalname).toLowerCase();
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && allowedTypes.test(ext)) {
            callback(null, true);
        }
        else {
            callback(new Error('Faqat JPG, JPEG yoki PNG rasmlar yuklanishi mumkin'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 10,
    },
};
//# sourceMappingURL=multer.config.js.map