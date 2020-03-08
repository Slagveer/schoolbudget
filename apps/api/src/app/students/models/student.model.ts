import { Document } from 'mongoose';

export interface StudentModel extends Document {
  readonly id: string;
  readonly name: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly budgetId: string;
  readonly age: number;
}
