import { ValidationPipe } from '@nestjs/common';

export function createCustomValidationPipe() {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    skipMissingProperties: true,
  });
}
