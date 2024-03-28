import { Module } from '@nestjs/common';
import { AntiFraudSecondaryAdapter } from './infrastructure/adapters/implements/AntiFraudSecondaryAdapter';
import { AntiFraudConsumerQueue } from './infrastructure/adapters/consumers/AntiFraudPrimaryAdapter';

@Module({
  imports: [],
  providers: [AntiFraudConsumerQueue, AntiFraudSecondaryAdapter],
})
export class AntiFraudModule {}
