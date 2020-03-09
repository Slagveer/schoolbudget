import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  studentId: mongoose.SchemaTypes.ObjectId,
  amount: Number,
  name: String
});
