import { Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsEditComponent } from './student-details-edit/student-details-edit.component';
import { StudentExpenseComponent } from './student-expense/student-expense.component';
import { StudentEarningComponent } from './student-earning/student-earning.component';

export const studentsRoutes: Routes = [
  {
    path: 'students',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: StudentsComponent
      },
      {
        path: 'student-details',
        children: [
          {
            path: ':id',
            component: StudentDetailsComponent
          },
          {
            path: ':id/edit',
            component: StudentDetailsEditComponent
          },
          {
            path: ':id/expense-update',
            children: [{ path: ':id', component: StudentExpenseComponent }]
          },
          {
            path: ':id/earning-update',
            children: [{ path: ':id', component: StudentEarningComponent }]
          },
          {
            path: ':id/expense-add',
            component: StudentExpenseComponent,
            data: { type: 'add' }
          },
          {
            path: ':id/earning-add',
            component: StudentEarningComponent,
            data: { type: 'add' }
          },
          { path: '', redirectTo: '/students/list', pathMatch: 'full' }
        ]
      }
    ]
  }
];
