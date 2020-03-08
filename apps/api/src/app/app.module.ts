import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Schoolbudgetten'),
    StudentsModule,
    BudgetsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
