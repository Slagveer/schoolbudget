import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { StudentSchema } from './schemas/student.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
