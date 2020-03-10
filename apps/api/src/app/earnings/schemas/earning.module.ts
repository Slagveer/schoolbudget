import { EarningSchema } from './earning.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EarningsController } from '../earnings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Earning', schema: EarningSchema }])
  ],
  controllers: [EarningsController],
  providers: []
})
export class BudgetsModule {}
