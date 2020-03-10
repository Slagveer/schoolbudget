import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetModel } from '../../../../../api/src/app/budgets/models/budget.model';
import { map } from 'rxjs/operators';
import { ExpenseModel } from '../../../../../api/src/app/expenses/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  retrieve(expenseId: string): Observable<ExpenseModel> {
    return this.http
      .get(`http://localhost:51786/api/expenses/expense/${expenseId}`)
      .pipe(map((expense: ExpenseModel) => expense));
  }

  retrieveByStudent(studentId: string): Observable<ExpenseModel[]> {
    return this.http
      .get(
        `http://localhost:51786/api/expenses/expense-by-student/${studentId}`
      )
      .pipe(map((expenses: ExpenseModel[]) => expenses));
  }

  update(expense: ExpenseModel): Observable<ExpenseModel> {
    return this.http
      .put(`http://localhost:51786/api/expenses/edit?id=${expense.id}`, expense)
      .pipe(map((updatedExpense: ExpenseModel) => updatedExpense));
  }

  add(expense: ExpenseModel): Observable<ExpenseModel> {
    return this.http
      .post(`http://localhost:51786/api/expenses/add`, expense)
      .pipe(map((updatedExpense: ExpenseModel) => updatedExpense));
  }

  delete(expenseId: string): Observable<ExpenseModel> {
    return this.http
      .delete(`http://localhost:51786/api/expenses/delete/${expenseId}`)
      .pipe(map((expense: ExpenseModel) => expense));
  }
}
