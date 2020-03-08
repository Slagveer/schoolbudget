import { Component, Input, OnInit } from '@angular/core';
import { StudentModel } from '../../../../../api/src/app/students/models/student.model';

@Component({
  selector: 'schoolbudget-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students: StudentModel[] = [
    { id: '1', name: 'X', age: 30 },
    { id: '2', name: 'Y', age: 25 }
  ];
  constructor() {}

  ngOnInit(): void {}
}
