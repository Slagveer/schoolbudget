import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCrudService } from './student-crud.service';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';
import { BudgetService } from '../budget.service';
import { BudgetModel } from '../../../../../../api/src/app/budgets/models/budget.model';
import { ExpensesService } from '../expenses.service';
import { ExpenseModel } from '../../../../../../api/src/app/expenses/models/expense.model';

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
  public filteredExpenses: ExpenseModel[];
  public uniqueExpenseTypes: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentCrudService: StudentCrudService,
    private budgetService: BudgetService,
    private expensesService: ExpensesService
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
    // merge(
    //   this.studentCrudService
    //     .retrieve(this.id),
    //   this.budgetService
    //     .retrieve(this.student.budgetId),
    //   this.expensesService.retrieve(this.id)
    // ).subscribe((result: any) => {
    //   console.log(result)
    // });
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
                this.studentEditForm.patchValue({
                  email: this.student.email,
                  firstName: this.student.firstname,
                  lastName: this.student.lastname,
                  budget:
                    this.budget.amount -
                    this.calculateBudget(this.budget.amount, expenses)
                });
              });
          });
      });
  }

  calculateBudget(budget: number, expenses: ExpenseModel[]): number {
    const totalExpenses: number = expenses
      .map((expense: ExpenseModel) => expense.amount)
      .reduce((total: number, amount: number) => {
        return amount + total;
      });
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
    // this.expensesService.update(expenseId).subscribe();
  }

  delete(expenseId: string): void {
    this.expensesService.delete(expenseId).subscribe();
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
      this.studentCrudService.update().subscribe(() => {
        this.router.navigate(['students', 'student-details', this.id, 'edit']);
      });
    }
  }

  cancel(): void {
    console.log(this.cancelRoute);
    this.router.navigate(this.cancelRoute).then();
  }

  setFilter(filter: Event): void {
    if (filter.target['value'] !== '') {
      this.filteredExpenses = this.expenses.filter((expense: ExpenseModel) => {
        if (expense.name === filter.target['value']) {
          return expense;
        }
      });
    } else {
      this.filteredExpenses = null;
    }
    console.log(this.filteredExpenses);
  }
}
