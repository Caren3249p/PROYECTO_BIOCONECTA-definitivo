import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthExceptionFilter } from './auth/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AuthExceptionFilter());
  app.enableCors();
  await app.listen(3000);
  console.log(`Aplicación corriendo en: ${await app.getUrl()}`);
}
bootstrap();