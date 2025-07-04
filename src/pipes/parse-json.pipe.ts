import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJSONPipe implements PipeTransform {
  transform(value: any) {
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in specs');
    }
  }
}
