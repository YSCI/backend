import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeOptions } from './common/options/validation-pipe.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));
  app.setGlobalPrefix('api');

  await app.listen(process.env.HTTP_PORT);

  console.log('Now listening port', process.env.HTTP_PORT);
}
void bootstrap();
