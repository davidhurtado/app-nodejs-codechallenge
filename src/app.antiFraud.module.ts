import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AntiFraudModule } from './anti-fraud/antiFraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AntiFraudModule,
  ],
})
export class AppAntiFraudModule {}
