import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEarningDto } from './dto/createEarningDto';
import { EarningModel } from './models/earning.model';

@Injectable()
export class EarningsService {
  constructor(
    @InjectModel('Earning') private readonly earningModel: Model<EarningModel>
  ) {}

  async create(createEarningDto: CreateEarningDto): Promise<EarningModel> {
    const createdEarning = new this.earningModel(createEarningDto);
    return createdEarning.save();
  }

  async find(id: string): Promise<EarningModel> {
    const earning = await this.earningModel.findById(id).exec();
    if (!earning) {
      throw new NotFoundException('Could not find earning.');
    }
    return {
      id: earning.id,
      studentId: earning.studentId,
      amount: earning.amount,
      name: earning.name
    };
  }

  async findByStudent(studentid: string): Promise<EarningModel> {
    const earning = await this.earningModel
      .find({ studentId: studentid })
      .exec();
    if (!earning) {
      throw new NotFoundException('Could not find earning.');
    }
    console.log('earning', earning, studentid);
    return earning.map((exp: EarningModel) => {
      const { id, name, studentId, amount } = exp;
      return { id, name, studentId, amount };
    });
  }

  async findAll(): Promise<EarningModel[]> {
    const earnings = await this.earningModel.find().exec();
    return earnings.map(earning => ({
      id: earning.id,
      studentId: earning.studentId,
      amount: earning.amount,
      name: earning.name
    }));
  }

  async update(earning: EarningModel) {
    await this.earningModel.updateOne({ name: earning.amount }, earning);
  }

  async editEarning(
    id: string,
    createEarningDto: CreateEarningDto
  ): Promise<EarningModel> {
    const editedEarning = await this.earningModel.findByIdAndUpdate(
      id,
      createEarningDto,
      { new: true }
    );
    return editedEarning;
  }

  async delete(id) {
    await this.earningModel.deleteOne({ _id: id });
  }
}
