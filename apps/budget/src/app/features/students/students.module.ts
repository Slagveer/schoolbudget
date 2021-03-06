import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentComponent } from './student/student.component';
import { studentsRoutes } from './students.routes';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { FeaturesModule } from '../features.module';
import { StudentCrudComponent } from './student-crud/student-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsEditComponent } from './student-details-edit/student-details-edit.component';
import { StudentExpenseComponent } from './student-expense/student-expense.component';
import { StudentEarningComponent } from './student-earning/student-earning.component';

@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentComponent,
    StudentsComponent,
    StudentCrudComponent,
    StudentDetailsEditComponent,
    StudentExpenseComponent,
    StudentEarningComponent
  ],
  exports: [StudentDetailsComponent, StudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(studentsRoutes),
    ReactiveFormsModule
  ]
})
export class StudentsModule {}
