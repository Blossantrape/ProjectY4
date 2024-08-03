import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../types/student";
import {map, Observable} from "rxjs";
import {StudentFormComponent} from "../students/student-form/student-form.component";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl = 'http://localhost:5287/api/Student';

  constructor(private http: HttpClient) {
  }

  getStudents = (): Observable<Student[]> => this.http.get<Student[]>(this.apiUrl);

  addStudent = (data: Student) => this.http.post(this.apiUrl, data);

  getStudent = (id: number): Observable<Student> => this.http.get<Student>(this.apiUrl + '/' + id);

  deleteStudent = (id: number)=> this.http.delete<Student>(this.apiUrl + '/' + id);

  editStudent = (id: number, data: Student)=> this.http.put<Student>(this.apiUrl + '/' + id, data);
}
