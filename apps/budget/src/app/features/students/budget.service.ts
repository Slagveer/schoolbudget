import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BudgetModel } from '../../../../../api/src/app/budgets/models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  retrieve(): Observable<BudgetModel[]> {
    return this.http
      .get(`http://localhost:51786/api/budgets`)
      .pipe(map((budgets: BudgetModel[]) => budgets));
  }

  retrieveByBudgetId(budgetId: string): Observable<BudgetModel> {
    return this.http
      .get(`http://localhost:51786/api/budgets/budget/${budgetId}`)
      .pipe(map((budget: BudgetModel) => budget));
  }
}
