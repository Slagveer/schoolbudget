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
import { EarningsService } from './earnings.service';
import { CreateEarningDto } from './dto/createEarningDto';
import { EarningModel } from './models/earning.model';
import { ValidateObjectId } from '../students/pipes/validate-object-id.pipes';

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  @Post()
  async create(@Body() createEarningDto: CreateEarningDto) {
    await this.earningsService.create(createEarningDto);
  }

  // @Post()
  // async update(@Body() createEarningDto: CreateEarningDto) {
  //   await this.earningsService.update(createEarningDto);
  // }

  @Get()
  async findAll(): Promise<EarningModel[]> {
    return this.earningsService.findAll();
  }

  @Get('earning/:id')
  async find(@Param('id') id: string): Promise<EarningModel> {
    return this.earningsService.find(id);
  }

  @Get('earning-by-student/:id')
  async findByStudent(@Param('id') id: string): Promise<EarningModel> {
    return this.earningsService.findByStudent(id);
  }

  @Post('update')
  async Update(@Body() earning: EarningModel) {
    await this.earningsService.update(earning);
  }

  @Put('/edit')
  async editEarning(
    @Res() res,
    @Body() createEarningDto: CreateEarningDto,
    @Query('id', new ValidateObjectId()) id: string
  ) {
    const editedPost = await this.earningsService.editEarning(
      id,
      createEarningDto
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
  async addPost(@Res() res, @Body() createEarningDTO: CreateEarningDto) {
    const newEarning = await this.earningsService.create(createEarningDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Earning has been submitted successfully!',
      post: newEarning
    });
  }

  @Delete('delete/:id')
  async Delete(@Param('id') id: string) {
    await this.earningsService.delete(id);
  }
}
