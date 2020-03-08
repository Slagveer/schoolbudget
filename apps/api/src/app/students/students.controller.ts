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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/createStudentDto';
import { StudentModel } from './models/student.model';
import { ValidateObjectId } from './pipes/validate-object-id.pipes';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    await this.studentsService.create(createStudentDto);
  }

  // @Post()
  // async update(@Body() createStudentDto: CreateStudentDto) {
  //   await this.studentsService.update(createStudentDto);
  // }

  @Get()
  async findAll(): Promise<StudentModel[]> {
    return this.studentsService.findAll();
  }

  @Get('student/:id')
  async find(@Param('id') id: string): Promise<StudentModel> {
    return this.studentsService.find(id);
  }

  @Post('update')
  async Update(@Body() student:StudentModel){
    await this.studentsService.update(student);
  }

  @Put('/edit')
  async editStudent(
    @Res() res,
    @Query('id', new ValidateObjectId()) id: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    const editedPost = await this.studentsService.editStudent(id, createStudentDto);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  @Delete('delete/:id')
  async Delete(@Param('id') id: string){
    await this.studentsService.delete(id);
  }
}
