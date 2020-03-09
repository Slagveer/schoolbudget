import * as mongoose from 'mongoose';

export const ReceiptSchema = new mongoose.Schema({
  studentId: String,
  name: String
});
