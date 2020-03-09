import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  studentId: String,
  amount: Number
});
