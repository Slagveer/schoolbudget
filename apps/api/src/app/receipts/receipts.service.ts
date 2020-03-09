import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReceiptDto } from './dto/createReceiptDto';
import { ReceiptModel } from './models/receipt.model';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectModel('Receipt') private readonly receiptModel: Model<ReceiptModel>
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<ReceiptModel> {
    const createdReceipt = new this.receiptModel(createReceiptDto);
    return createdReceipt.save();
  }

  async find(id: string): Promise<ReceiptModel> {
    const receipt = await this.receiptModel.findById(id).exec();
    if (!receipt) {
      throw new NotFoundException('Could not find receipt.');
    }
    return {
      id: receipt.id,
      studentId: receipt.studentId,
      name: receipt.name
    };
  }

  async findAll(): Promise<ReceiptModel[]> {
    const receipts = await this.receiptModel.find().exec();
    return receipts.map(receipt => ({
      id: receipt.id,
      studentId: receipt.studentId,
      name: receipt.name
    }));
  }

  async update(receipt: ReceiptModel) {
    await this.receiptModel.updateOne({ name: receipt.name }, receipt);
  }

  async editReceipt(
    id: string,
    createReceiptDto: CreateReceiptDto
  ): Promise<ReceiptModel> {

    const editedReceipt = await this.receiptModel.findByIdAndUpdate(
      id,
      createReceiptDto,
      { new: true }
    );
    return editedReceipt;
  }

  async delete(id) {
    await this.receiptModel.deleteOne({ _id: id });
  }
}
