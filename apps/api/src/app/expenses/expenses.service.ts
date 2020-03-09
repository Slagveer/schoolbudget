import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/createExpenseDto';
import { ExpenseModel } from './models/expense.model';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('Expense') private readonly budgetModel: Model<ExpenseModel>
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseModel> {
    const createdExpense = new this.budgetModel(createExpenseDto);
    return createdExpense.save();
  }

  async find(id: string): Promise<ExpenseModel> {
    const budget = await this.budgetModel.findById(id).exec();
    if (!budget) {
      throw new NotFoundException('Could not find budget.');
    }
    return {
      id: budget.id,
      studentId: budget.studentId,
      amount: budget.amount
    };
  }

  async findAll(): Promise<ExpenseModel[]> {
    const budgets = await this.budgetModel.find().exec();
    return budgets.map(budget => ({
      id: budget.id,
      studentId: budget.studentId,
      amount: budget.amount
    }));
  }

  async update(budget: ExpenseModel) {
    await this.budgetModel.updateOne({ name: budget.amount }, budget);
  }

  async editExpense(
    id: string,
    createExpenseDto: CreateExpenseDto
  ): Promise<ExpenseModel> {
    console.log(id);
    const editedExpense = await this.budgetModel.findByIdAndUpdate(
      id,
      createExpenseDto,
      { new: true }
    );
    return editedExpense;
  }

  async delete(id) {
    await this.budgetModel.deleteOne({ _id: id });
  }
}
