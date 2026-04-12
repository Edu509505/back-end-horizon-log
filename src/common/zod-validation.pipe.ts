import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    // console.log(result);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validação falhou',
        errors: result.error.flatten().fieldErrors,
      });
    }
    return result.data;
  }
}
