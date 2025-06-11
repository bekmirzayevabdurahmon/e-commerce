import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Electronics API')
    .setDescription('Ecommerce Electronics API description')
    .setVersion('1.0')
    .addTag('electronics')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000
  await app.listen(port, () => {
    console.log(`Server runing on port ${port} ✅`)
  });
}
bootstrap();
