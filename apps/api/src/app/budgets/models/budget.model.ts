import { Document } from 'mongoose';

export interface BudgetModel extends Document {
  readonly id: string;
  readonly studentId: string;
  readonly amount: number;
}
