import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Res,
  Query,
  NotFoundException,
  HttpStatus, Post
} from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/createReceiptDto';
import { ReceiptModel } from './models/receipt.model';
import { ValidateObjectId } from '../students/pipes/validate-object-id.pipes';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async create(@Body() createReceiptDto: CreateReceiptDto) {
    await this.receiptsService.create(createReceiptDto);
  }

  // @Receipt()
  // async update(@Body() createReceiptDto: CreateReceiptDto) {
  //   await this.receiptsService.update(createReceiptDto);
  // }

  @Get()
  async findAll(): Promise<ReceiptModel[]> {
    return this.receiptsService.findAll();
  }

  @Get('receipt/:id')
  async find(@Param('id') id: string): Promise<ReceiptModel> {
    return this.receiptsService.find(id);
  }

  @Post('update')
  async Update(@Body() receipt: ReceiptModel) {
    await this.receiptsService.update(receipt);
  }

  @Put('/edit')
  async editReceipt(
    @Res() res,
    @Query('id', new ValidateObjectId()) id: string,
    @Body() createReceiptDto: CreateReceiptDto
  ) {
    const editedReceipt = await this.receiptsService.editReceipt(
      id,
      createReceiptDto
    );
    if (!editedReceipt) {
      throw new NotFoundException('Receipt does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Receipt has been successfully updated',
      post: editedReceipt
    });
  }

  @Delete('delete/:id')
  async Delete(@Param('id') id: string) {
    await this.receiptsService.delete(id);
  }
}
