import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/createExpenseDto';
import { ExpenseModel } from './models/expense.model';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<ExpenseModel>
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseModel> {
    const createdExpense = new this.expenseModel(createExpenseDto);
    return createdExpense.save();
  }

  async find(id: string): Promise<ExpenseModel> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException('Could not find expense.');
    }
    return {
      id: expense.id,
      studentId: expense.studentId,
      amount: expense.amount,
      name: expense.name
    };
  }

  async findByStudent(studentid: string): Promise<ExpenseModel> {
    const expense = await this.expenseModel.find({"studentId": studentid}).exec();
    if (!expense) {
      throw new NotFoundException('Could not find expense.');
    }
    console.log('expense', expense, studentid)
    return expense.map((exp: ExpenseModel)=>{
      const { id, name, studentId, amount} = exp;
      return ({id, name, studentId, amount});
    });
  }

  async findAll(): Promise<ExpenseModel[]> {
    const expenses = await this.expenseModel.find().exec();
    return expenses.map(expense => ({
      id: expense.id,
      studentId: expense.studentId,
      amount: expense.amount,
      name: expense.name
    }));
  }

  async update(expense: ExpenseModel) {
    await this.expenseModel.updateOne({ name: expense.amount }, expense);
  }

  async editExpense(
    id: string,
    createExpenseDto: CreateExpenseDto
  ): Promise<ExpenseModel> {
    console.log(id);
    const editedExpense = await this.expenseModel.findByIdAndUpdate(
      id,
      createExpenseDto,
      { new: true }
    );
    return editedExpense;
  }

  async delete(id) {
    await this.expenseModel.deleteOne({ _id: id });
  }
}
