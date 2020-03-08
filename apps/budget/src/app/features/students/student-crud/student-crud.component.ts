import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCrudService } from './student-crud.service';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';
import { BudgetService } from '../budget.service';
import { BudgetModel } from '../../../../../../api/src/app/budgets/models/budget.model';

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
  public budget: BudgetModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentCrudService: StudentCrudService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.studentEditForm = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      budget: new FormControl('')
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
          lastName: this.student.lastname,
          budget: '0,00'
        });
        this.budgetService
          .retrieve(this.student.budgetId)
          .subscribe((budget: BudgetModel) => {
            console.log(budget);
            this.budget = budget;
            this.studentEditForm.patchValue({
              email: this.student.email,
              firstName: this.student.firstname,
              lastName: this.student.lastname,
              budget: this.budget.amount
            });
          });
      });
  }

  submit(): void {
    if (this.type === 'view') {
      this.router.navigate(['students', 'student-details', this.id, 'edit']);
    } else {
      this.studentCrudService.update().subscribe(() => {
        this.router.navigate(['students', 'student-details', this.id, 'edit']);
      });
    }
  }

  cancel(): void {
    console.log(this.cancelRoute);
    this.router.navigate(this.cancelRoute).then();
  }
}
