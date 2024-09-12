import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("APP_PORT") || 3000;
  console.log(`App is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
