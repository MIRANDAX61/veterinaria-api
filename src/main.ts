import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
   
  );
   app.useGlobalFilters(new PrismaExceptionFilter())
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
