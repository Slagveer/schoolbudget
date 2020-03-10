import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCrudService } from './student-crud.service';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';
import { BudgetService } from '../budget.service';
import { BudgetModel } from '../../../../../../api/src/app/budgets/models/budget.model';
import { ExpensesService } from '../expenses.service';
import { ExpenseModel } from '../../../../../../api/src/app/expenses/models/expense.model';
import { EarningModel } from '../../../../../../api/src/app/earnings/models/earning.model';
import { EarningsService } from '../earnings.service';

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
  public expenses: ExpenseModel[];
  public earnings: EarningModel[];
  public days = [1];
  public averageExpenses = 0;
  public filteredExpenses: ExpenseModel[];
  public filteredEarnings: EarningModel[];
  public uniqueExpenseTypes: string[];
  public uniqueEarningTypes: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentCrudService: StudentCrudService,
    private budgetService: BudgetService,
    private expensesService: ExpensesService,
    private earningsService: EarningsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.studentEditForm = new FormGroup({
      email: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      username: new FormControl(''),
      days: new FormControl(''),
      budget: new FormControl('')
    });
    if (this.type === 'view') {
      this.studentEditForm.disable();
    }
    this.studentCrudService
      .retrieve(this.id)
      .subscribe((student: StudentModel) => {
        this.student = student;
        this.days = Array.from(
          new Array(student.days),
          (val, index) => index + 1
        );
        this.studentEditForm.patchValue({
          email: this.student.email,
          firstname: this.student.firstname,
          lastname: this.student.lastname,
          days: this.student.days,
          budget: '0,00'
        });
        this.budgetService
          .retrieveByBudgetId(this.student.budgetId)
          .subscribe((budget: BudgetModel) => {
            this.budget = budget;
            this.expensesService
              .retrieveByStudent(this.id)
              .subscribe((expenses: ExpenseModel[]) => {
                this.expenses = expenses;
                this.uniqueExpenseTypes = Array.from([
                  ...new Set(
                    expenses.map((expense: ExpenseModel) => expense.name)
                  )
                ]);
                this.earningsService
                  .retrieveByStudent(this.id)
                  .subscribe((earnings: EarningModel[]) => {
                    this.earnings = earnings;
                    this.uniqueEarningTypes = Array.from([
                      ...new Set(
                        earnings.map((earning: EarningModel) => earning.name)
                      )
                    ]);
                    this.studentEditForm.patchValue({
                      email: this.student.email,
                      firstname: this.student.firstname,
                      lastname: this.student.lastname,
                      budget:
                        this.type === 'view'
                          ? this.budget.amount -
                            this.calculateBudget(this.budget.amount, expenses) +
                            this.calculateBudget(this.budget.amount, earnings)
                          : this.budget.amount
                    });
                  });
              });
          });
      });
  }

  calculateBudget(
    budget: number,
    items: ExpenseModel[] | EarningModel[]
  ): number {
    let totalExpenses = 0;
    if (items.length > 0) {
      totalExpenses = items
        .map((item: ExpenseModel) => item.amount)
        .reduce((total: number, amount: number) => {
          return amount + total;
        });
    }

    return totalExpenses;
  }

  update(expenseId: string): void {
    if (this.type === 'view') {
      this.router.navigate([
        'students',
        'student-details',
        this.id,
        'expense-update',
        expenseId
      ]);
    }
  }

  deleteExpense(expenseId: string): void {
    this.expensesService.delete(expenseId).subscribe(() => {
      this.expensesService
        .retrieveByStudent(this.id)
        .subscribe((expenses: ExpenseModel[]) => {
          this.expenses = expenses;
          this.uniqueExpenseTypes = Array.from([
            ...new Set(expenses.map((expense: ExpenseModel) => expense.name))
          ]);
          this.budgetService
            .retrieveByBudgetId(this.student.budgetId)
            .subscribe((budget: BudgetModel) => {
              this.budget = budget;
              this.studentEditForm.patchValue({
                email: this.student.email,
                firstname: this.student.firstname,
                lastname: this.student.lastname,
                days: this.student.days,
                budget:
                  this.budget.amount -
                  this.calculateBudget(this.budget.amount, this.expenses) +
                  this.calculateBudget(this.budget.amount, this.earnings)
              });
            });
        });
    });
  }

  deleteEarning(earningId: string): void {
    this.earningsService.delete(earningId).subscribe(() => {
      this.earningsService
        .retrieveByStudent(this.id)
        .subscribe((earnings: EarningModel[]) => {
          this.earnings = earnings;
          this.uniqueEarningTypes = Array.from([
            ...new Set(earnings.map((earning: EarningModel) => earning.name))
          ]);
          this.budgetService
            .retrieveByBudgetId(this.student.budgetId)
            .subscribe((budget: BudgetModel) => {
              this.budget = budget;
              this.studentEditForm.patchValue({
                email: this.student.email,
                firstname: this.student.firstname,
                lastname: this.student.lastname,
                days: this.student.days,
                budget:
                  this.budget.amount -
                  this.calculateBudget(this.budget.amount, this.expenses) +
                  this.calculateBudget(this.budget.amount, this.earnings)
              });
            });
        });
    });
  }

  addExpense() {
    this.router.navigate([
      'students',
      'student-details',
      this.id,
      'expense-add'
    ]);
  }

  addEarning() {
    this.router.navigate([
      'students',
      'student-details',
      this.id,
      'earning-add'
    ]);
  }

  submit(): void {
    if (this.type === 'view') {
      this.router.navigate(['students', 'student-details', this.id, 'edit']);
    } else {
      this.router.navigate(['students', 'student-details', this.id]);
    }
  }

  cancel(): void {
    this.router.navigate(this.cancelRoute).then();
  }

  setFilterExpenses(filter: Event): void {
    if (filter.target['value'] !== '') {
      this.filteredExpenses = this.expenses.filter((expense: ExpenseModel) => {
        if (expense.name === filter.target['value']) {
          return expense;
        }
      });
    } else {
      this.filteredExpenses = null;
    }
  }

  setFilterEarnings(filter: Event): void {
    if (filter.target['value'] !== '') {
      this.filteredEarnings = this.earnings.filter((earning: ExpenseModel) => {
        if (earning.name === filter.target['value']) {
          return earning;
        }
      });
    } else {
      this.filteredEarnings = null;
    }
  }

  setDay(day: Event): void {
    let averageExpenses: number;
    if (day.target['value'] !== '') {
      averageExpenses =
        this.calculateBudget(this.budget.amount, this.expenses) /
        +day.target['value'];
    } else {
      averageExpenses = 0;
    }
    this.averageExpenses = averageExpenses;
  }

  updateStudent(): void {
    console.log(1);
    const student: StudentModel = {
      ...this.student,
      ...this.studentEditForm.value
    };
    this.studentCrudService.update(student).subscribe(() => {});
  }
}
