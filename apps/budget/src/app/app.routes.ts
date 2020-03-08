import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetDetailsComponent } from './budgets/budget-details/budget-details.component';
import { ReceiptsComponent } from './features/receipts/receipts.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { LoginComponent } from './features/login/login.component';
import { StudentsComponent } from './features/students/students.component';
import { StudentDetailsComponent } from './features/students/student-details/student-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'budget/:id', component: BudgetDetailsComponent },
  // { path: 'students', component: StudentsComponent },
  // { path: 'student-details/:id', component: StudentDetailsComponent },
  {
    path: 'receipts',
    component: ReceiptsComponent
  },
  {
    path: 'receipt',
    component: ReceiptsComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
