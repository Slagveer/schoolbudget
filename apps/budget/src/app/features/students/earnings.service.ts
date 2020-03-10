import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetModel } from '../../../../../api/src/app/budgets/models/budget.model';
import { map } from 'rxjs/operators';
import { EarningModel } from '../../../../../api/src/app/earnings/models/earning.model';
import { ExpenseModel } from '../../../../../api/src/app/expenses/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  constructor(private http: HttpClient) {}

  retrieve(earningId: string): Observable<EarningModel> {
    return this.http
      .get(`http://localhost:51786/api/earnings/earning/${earningId}`)
      .pipe(map((earning: EarningModel) => earning));
  }

  retrieveByStudent(studentId: string): Observable<EarningModel[]> {
    return this.http
      .get(
        `http://localhost:51786/api/earnings/earning-by-student/${studentId}`
      )
      .pipe(map((earnings: EarningModel[]) => earnings));
  }

  update(earning: EarningModel): Observable<EarningModel> {
    return this.http
      .put(`http://localhost:51786/api/earnings/edit?id=${earning.id}`, earning)
      .pipe(map((updatedEarning: EarningModel) => updatedEarning));
  }

  add(earning: EarningModel): Observable<EarningModel> {
    console.log(earning);
    return this.http
      .post(`http://localhost:51786/api/earnings/add`, earning)
      .pipe(map((updatedEarning: EarningModel) => updatedEarning));
  }

  delete(earningId: string): Observable<EarningModel> {
    return this.http
      .delete(`http://localhost:51786/api/earnings/delete/${earningId}`)
      .pipe(map((earning: ExpenseModel) => earning));
  }
}
