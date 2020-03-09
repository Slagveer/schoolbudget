import { BudgetSchema } from './budget.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BudgetsController } from '../budgets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }])
  ],
  controllers: [BudgetsController],
  providers: []
})
export class BudgetsModule {}
