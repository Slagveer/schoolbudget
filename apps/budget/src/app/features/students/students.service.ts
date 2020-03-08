import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../../../api/src/app/students/models/student.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  retrieve(): Observable<StudentModel[]> {
    return this.http
      .get('http://localhost:51786/api/students')
      .pipe(map((students: StudentModel[]) => students));
  }
}
