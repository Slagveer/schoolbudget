import { Component, Input, OnInit } from '@angular/core';
import { StudentModel } from '../../../../../api/src/app/students/models/student.model';
import { StudentsService } from './students.service';

@Component({
  selector: 'schoolbudget-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students: StudentModel[] = [];
  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.studentsService.retrieve().subscribe((students: StudentModel[]) => {
      this.students = students;
    });
  }
}
