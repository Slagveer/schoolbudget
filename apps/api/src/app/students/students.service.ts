import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/createStudentDto';
import { StudentModel } from './models/student.model';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<StudentModel>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentModel> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async find(id: string): Promise<StudentModel> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Could not find student.');
    }
    return {
      id: student.id,
      name: student.name,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      budgetId: student.budgetId,
      age: student.age,
      days: student.days
    };
  }

  async findAll(): Promise<StudentModel[]> {
    const students = await this.studentModel.find().exec();
    return students.map(student => ({
      id: student.id,
      name: student.name,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      budgetId: student.budgetId,
      age: student.age,
      days: student.days
    }));
  }

  async update(student: StudentModel) {
    await this.studentModel.updateOne({ name: student.name }, student);
  }

  async editStudent(
    id: string,
    createStudentDto: CreateStudentDto
  ): Promise<StudentModel> {
    console.log(id);
    const editedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      createStudentDto,
      { new: true }
    );
    return editedStudent;
  }

  async delete(id) {
    await this.studentModel.deleteOne({ _id: id });
  }
}
