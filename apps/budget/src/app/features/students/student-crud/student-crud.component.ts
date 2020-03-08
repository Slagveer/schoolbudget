import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCrudService } from './student-crud.service';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';

@Component({
  selector: 'schoolbudget-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss']
})
export class StudentCrudComponent implements OnInit {
  public studentEditForm: FormGroup;
  public id: string;

  @Input() cancelRoute: string[] | number[];
  @Input() actionLabel: string;
  @Input() type: string;
  public student: StudentModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentCrudService: StudentCrudService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.studentEditForm = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    });
    if (this.type === 'view') {
      this.studentEditForm.disable();
    }
    this.studentCrudService
      .retrieve(this.id)
      .subscribe((student: StudentModel) => {
        this.student = student;
        this.studentEditForm.patchValue({
          email: this.student.email,
          firstName: this.student.firstname,
          lastName: this.student.lastname
        });
      });
  }

  submit(): void {
    if (this.type === 'view') {
      this.router.navigate(['students', 'student-details', this.id, 'edit']);
    } else {
      console.log('save');
    }
  }

  cancel(): void {
    console.log(this.cancelRoute);
    this.router.navigate(this.cancelRoute).then();
  }
}
