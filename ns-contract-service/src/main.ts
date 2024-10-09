import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import sdk from './opentelemetry-sdk';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  await sdk.start();

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("PORT") || 3000;

  await app.listen(port);
  logger.log(`App is running on port ${port}`);
}

bootstrap();
