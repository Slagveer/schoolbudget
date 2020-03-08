import { BudgetSchema } from './budget.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from '../students.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }])
  ],
  controllers: [BudgetsController],
  providers: []
})
export class BudgetsModule {}
