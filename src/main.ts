import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors) {
      let message = "";
      let currentIndex = 1;
      errors.forEach(err => {
        Object.values(err.constraints ?? {}).forEach((item) => {
          message += `${currentIndex}.- ${item} \n`;
          currentIndex++;
        })
      });

      return new BadRequestException({
        success: false,
        message,
      });
    },
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
