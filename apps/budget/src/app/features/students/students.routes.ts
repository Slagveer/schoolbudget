import { Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentCrudComponent } from './student-crud/student-crud.component';
import { StudentDetailsEditComponent } from './student-details-edit/student-details-edit.component';

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
          { path: '', redirectTo: '/students/list', pathMatch: 'full' }
        ]
      }
    ]
  }
];
