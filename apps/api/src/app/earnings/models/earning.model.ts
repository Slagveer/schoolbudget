import { Document } from 'mongoose';

export interface EarningModel extends Document {
  readonly id: string;
  readonly studentId: string;
  readonly name: string;
  readonly amount: number;
}
