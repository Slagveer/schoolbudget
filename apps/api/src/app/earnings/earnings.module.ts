import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EarningSchema } from './schemas/earning.schema';
import { EarningsController } from './earnings.controller';
import { EarningsService } from './earnings.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Earning', schema: EarningSchema }])
  ],
  controllers: [EarningsController],
  providers: [EarningsService]
})
export class EarningsModule {}
