import { StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from '../students.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [],
})
export class StudentsModule {}
