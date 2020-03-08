import { Component, Input, OnInit } from '@angular/core';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'schoolbudget-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() public student: StudentModel;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
