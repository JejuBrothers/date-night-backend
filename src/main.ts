import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { createCustomLogger } from './common/logger';
import { createCustomValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  app.useGlobalPipes(createCustomValidationPipe());
  app.use(helmet());
  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    optionsSuccessStatus: 200,
  });
  await app.listen(3000);
}
bootstrap();
