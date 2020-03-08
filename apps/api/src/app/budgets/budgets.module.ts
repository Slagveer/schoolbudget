import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BudgetSchema } from './schemas/budget.schema';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }])
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService]
})
export class BudgetsModule {}
