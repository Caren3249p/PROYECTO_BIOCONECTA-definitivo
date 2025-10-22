import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // permite llamadas del front (Vite/React)
  app.enableCors({ origin: true, credentials: true });

  await app.listen(3000);
  console.log('🚀 API lista en http://localhost:3000');
}
bootstrap();
