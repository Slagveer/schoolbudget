import { ExpenseSchema } from './expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ExpensesController } from '../expenses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }])
  ],
  controllers: [ExpensesController],
  providers: []
})
export class BudgetsModule {}
