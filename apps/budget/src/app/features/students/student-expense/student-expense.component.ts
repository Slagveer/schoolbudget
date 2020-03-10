import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpensesService } from '../expenses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseModel } from '../../../../../../api/src/app/expenses/models/expense.model';

@Component({
  selector: 'schoolbudget-student-expense',
  templateUrl: './student-expense.component.html',
  styleUrls: ['./student-expense.component.scss']
})
export class StudentExpenseComponent implements OnInit {
  public expenseEditForm: FormGroup;
  public id: string;
  public expense: ExpenseModel;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.route.snapshot.data?.type !== 'add') {
      this.expensesService
        .retrieve(this.id)
        .subscribe((expense: ExpenseModel) => {
          this.expense = expense;
          this.expenseEditForm.patchValue({
            name: this.expense.name,
            amount: this.expense.amount
          });
        });
    }
    this.expenseEditForm = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(0)
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.route.snapshot.data?.type === 'add') {
      this.expensesService
        .add({ studentId: this.id, ...this.expenseEditForm.value } as ExpenseModel)
        .subscribe(() => {
          this.location.back();
        });
    } else {
      this.expensesService
        .update({ id: this.id, ...this.expenseEditForm.value } as ExpenseModel)
        .subscribe(() => {
          this.location.back();
        });
    }
  }
}
