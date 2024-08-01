import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../types/student";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl = 'http://localhost:5287/api/Student';
  constructor(private http: HttpClient) { }

  getStudent=():Observable<Student[]>=> this.http.get<Student[]>(this.apiUrl);




}
