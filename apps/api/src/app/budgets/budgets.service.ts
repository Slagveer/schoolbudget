import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBudgetDto } from './dto/createBudgetDto';
import { BudgetModel } from './models/budget.model';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budget') private readonly budgetModel: Model<BudgetModel>
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<BudgetModel> {
    const createdBudget = new this.budgetModel(createBudgetDto);
    return createdBudget.save();
  }

  async find(id: string): Promise<BudgetModel> {
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

  async findAll(): Promise<BudgetModel[]> {
    const budgets = await this.budgetModel.find().exec();
    return budgets.map(budget => ({
      id: budget.id,
      studentId: budget.studentId,
      amount: budget.amount
    }));
  }

  async update(budget: BudgetModel) {
    await this.budgetModel.updateOne({ name: budget.amount }, budget);
  }

  async editBudget(
    id: string,
    createBudgetDto: CreateBudgetDto
  ): Promise<BudgetModel> {
    console.log(id);
    const editedBudget = await this.budgetModel.findByIdAndUpdate(
      id,
      createBudgetDto,
      { new: true }
    );
    return editedBudget;
  }

  async delete(id) {
    await this.budgetModel.deleteOne({ _id: id });
  }
}
