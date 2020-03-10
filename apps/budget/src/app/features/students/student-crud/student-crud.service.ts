import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../../../../api/src/app/students/models/student.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentCrudService {
  constructor(private http: HttpClient) {}

  retrieve(id: string): Observable<StudentModel> {
    return this.http
      .get(`http://localhost:51786/api/students/student/${id}`)
      .pipe(map((student: StudentModel) => student));
  }

  update(student: StudentModel): Observable<StudentModel> {
    console.log(student);
    return this.http
      .put(`http://localhost:51786/api/students/edit?id=${student.id}`, student)
      .pipe(map((newStudent: StudentModel) => newStudent));
  }

  add(): Observable<StudentModel> {
    return this.http
      .post('http://localhost:51786/student', {})
      .pipe(map((student: StudentModel) => student));
  }

  delete(): Observable<StudentModel> {
    return this.http
      .delete('http://localhost:51786/student', {})
      .pipe(map((student: StudentModel) => student));
  }
}
