import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppAntiFraudModule } from './app.antiFraud.module';

async function bootstrap() {
  // Crear y configurar el microservicio Kafka
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppAntiFraudModule,
    );
  await microservice
    .listen()
    .then(() => console.log('Check Anti Fraud is listening'));
}
bootstrap();
