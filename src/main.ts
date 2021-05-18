import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createCustomLogger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  await app.listen(3000);
}
bootstrap();
