import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Starting API server...', 3000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
