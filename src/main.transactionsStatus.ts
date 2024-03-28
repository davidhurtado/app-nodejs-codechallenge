import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppTransactionStatusModule } from './app.transactionStatus.module';

async function bootstrap() {
  // Crear y configurar el microservicio Kafka
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppTransactionStatusModule,
    );
  await microservice
    .listen()
    .then(() => console.log('Transaction Status Queue is listening'));
}
bootstrap();
