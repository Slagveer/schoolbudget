import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  lastname: String,
  email: String,
  age: Number
});
