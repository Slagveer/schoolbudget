import * as mongoose from 'mongoose';

export const BudgetSchema = new mongoose.Schema({
  studentId: String,
  amount: Number
});
