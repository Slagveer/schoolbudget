import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Put,
  Res,
  Query,
  NotFoundException,
  HttpStatus
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/createBudgetDto';
import { BudgetModel } from './models/budget.model';
import { ValidateObjectId } from '../students/pipes/validate-object-id.pipes';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    await this.budgetsService.create(createBudgetDto);
  }

  // @Post()
  // async update(@Body() createBudgetDto: CreateBudgetDto) {
  //   await this.budgetsService.update(createBudgetDto);
  // }

  @Get()
  async findAll(): Promise<BudgetModel[]> {
    return this.budgetsService.findAll();
  }

  @Get('budget/:id')
  async find(@Param('id') id: string): Promise<BudgetModel> {
    return this.budgetsService.find(id);
  }

  @Post('update')
  async Update(@Body() budget: BudgetModel) {
    await this.budgetsService.update(budget);
  }

  @Put('/edit')
  async editBudget(
    @Res() res,
    @Query('id', new ValidateObjectId()) id: string,
    @Body() createBudgetDto: CreateBudgetDto
  ) {
    const editedPost = await this.budgetsService.editBudget(
      id,
      createBudgetDto
    );
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost
    });
  }

  @Delete('delete/:id')
  async Delete(@Param('id') id: string) {
    await this.budgetsService.delete(id);
  }
}
