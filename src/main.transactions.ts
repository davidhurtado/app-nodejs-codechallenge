import { NestFactory } from '@nestjs/core';
import { AppTransactionModule } from './app.transaction.module';

async function bootstrap() {
  // Crear y configurar el microservicio HTTP
  const app = await NestFactory.create(AppTransactionModule);
  await app.listen(3000);
}
bootstrap();
