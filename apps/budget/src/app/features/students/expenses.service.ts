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

  retrieve(studentId: string): Observable<ExpenseModel[]> {
    return this.http
      .get(`http://localhost:51786/api/expenses/expense-by-student/${studentId}`)
      .pipe(map((expenses: ExpenseModel[]) => expenses));
  }

  update(studentId: string): Observable<ExpenseModel[]> {
    return this.http
      .get(`http://localhost:51786/api/expenses/expense-by-student/${studentId}`)
      .pipe(map((expenses: ExpenseModel[]) => expenses));
  }

  delete(studentId: string): Observable<ExpenseModel[]> {
    return this.http
      .get(`http://localhost:51786/api/expenses/expense-by-student/${studentId}`)
      .pipe(map((expenses: ExpenseModel[]) => expenses));
  }
}
