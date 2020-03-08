import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';

@Component({
  selector: 'schoolbudget-student-details',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css']
})
export class StudentDetailsEditComponent implements OnInit {
  public id: string;
  public student$: Observable<StudentModel[]>;
  public cancelRoute: string[] | number[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.cancelRoute = ['students', 'student-details', this.id];
  }
}
