import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'schoolbudget-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss']
})
export class StudentCrudComponent implements OnInit {
  public studentEditForm: FormGroup;
  public id: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.studentEditForm = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    });
    this.studentEditForm.patchValue({
      email: this.id
    });
    this.studentEditForm.disable();
  }

  submit(): void {
    console.log(this.studentEditForm.invalid);
  }

  cancel(): void {
    this.router.navigate(['students', 'student-details', this.id]);
  }
}
