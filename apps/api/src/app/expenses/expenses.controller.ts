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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/createExpenseDto';
import { ExpenseModel } from './models/expense.model';
import { ValidateObjectId } from '../students/pipes/validate-object-id.pipes';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    await this.expensesService.create(createExpenseDto);
  }

  // @Post()
  // async update(@Body() createExpenseDto: CreateExpenseDto) {
  //   await this.expensesService.update(createExpenseDto);
  // }

  @Get()
  async findAll(): Promise<ExpenseModel[]> {
    return this.expensesService.findAll();
  }

  @Get('expense/:id')
  async find(@Param('id') id: string): Promise<ExpenseModel> {
    return this.expensesService.find(id);
  }

  @Get('expense-by-student/:id')
  async findByStudent(@Param('id') id: string): Promise<ExpenseModel> {
    return this.expensesService.findByStudent(id);
  }

  @Post('update')
  async Update(@Body() expense: ExpenseModel) {
    await this.expensesService.update(expense);
  }

  @Put('/edit')
  async editExpense(
    @Res() res,
    @Body() createExpenseDto: CreateExpenseDto,
    @Query('id', new ValidateObjectId()) id: string
  ) {
    const editedPost = await this.expensesService.editExpense(
      id,
      createExpenseDto
    );
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost
    });
  }

  @Post('/add')
  async addPost(@Res() res, @Body() createExpenseDTO: CreateExpenseDto) {
    const newExpense = await this.expensesService.create(createExpenseDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been submitted successfully!',
      post: newExpense
    });
  }

  @Delete('delete/:id')
  async Delete(@Param('id') id: string) {
    await this.expensesService.delete(id);
  }
}
