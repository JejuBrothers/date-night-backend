import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/exception.filter';
import { createCustomLogger } from './common/logger';
import { createCustomValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(createCustomValidationPipe());
  app.use(helmet());
  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    optionsSuccessStatus: 200,
  });
  await app.listen(3000);
}
bootstrap();
