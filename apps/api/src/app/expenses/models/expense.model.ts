import { Document } from 'mongoose';

export interface ExpenseModel extends Document {
  readonly id: string;
  readonly studentId: string;
  readonly name: string;
  readonly amount: number;
}
