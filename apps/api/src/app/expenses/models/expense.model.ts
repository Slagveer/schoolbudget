import { Document } from 'mongoose';

export interface ExpenseModel extends Document {
  readonly id: string;
  readonly studentId: string;
  readonly amount: number;
}
