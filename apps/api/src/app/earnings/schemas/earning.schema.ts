import * as mongoose from 'mongoose';

export const EarningSchema = new mongoose.Schema({
  studentId: mongoose.SchemaTypes.ObjectId,
  amount: Number,
  name: String
});
