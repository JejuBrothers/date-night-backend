import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createCustomLogger } from './common/logger';
import { createCustomValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  app.useGlobalPipes(createCustomValidationPipe());
  await app.listen(3000);
}
bootstrap();
