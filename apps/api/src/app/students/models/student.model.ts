import { Document } from 'mongoose';

export interface StudentModel extends Document {
  readonly id: string;
  readonly name: string;
  readonly age: number;
}
