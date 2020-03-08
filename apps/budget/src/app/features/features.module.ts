import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsModule } from './students/students.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, StudentsModule, ReactiveFormsModule]
})
export class FeaturesModule {}
