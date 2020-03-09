import { Document } from 'mongoose';

export interface ReceiptModel extends Document {
  readonly id: string;
  readonly studentId: string;
  readonly name: string;
}
