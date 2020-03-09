import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReceiptSchema } from './schemas/receipt.schema';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Receipt', schema: ReceiptSchema }])
  ],
  controllers: [ReceiptsController],
  providers: [ReceiptsService]
})
export class ReceiptsModule {}
