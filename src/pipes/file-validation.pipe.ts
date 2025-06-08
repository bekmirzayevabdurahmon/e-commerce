import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024;

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only JPG, JPEG and PNG formats are allowed.');
      }

      if (file.size > maxSize) {
        throw new BadRequestException('File size should be smaller than 2 MB.');
      }
    }

    return files; 
  }
}