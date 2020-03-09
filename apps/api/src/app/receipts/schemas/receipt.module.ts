import { ReceiptSchema } from './receipt.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceiptsController } from '../receipts.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Receipt', schema: ReceiptSchema }])
  ],
  controllers: [ReceiptsController],
  providers: []
})
export class BudgetsModule {}
