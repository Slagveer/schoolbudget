import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@schoolbudget/api-interfaces';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../api/src/app/students/models/student.model';

@Component({
  selector: 'schoolbudget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hello$: Observable<Message> = this.http.get<Message>('/api/hello');

  public students$: Observable<StudentModel> = this.http.get<StudentModel>('/api/students');
  public studentsUpdate$: Observable<StudentModel> = this.http.post<StudentModel>('/api/students', {
    name: 'Peter',
    age: 30
  } as StudentModel);
  constructor(private http: HttpClient) {}
}
