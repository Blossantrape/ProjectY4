import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Observable} from "rxjs";
import {Student} from "../types/student";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students$!:Observable<Student[]>
  studentService = inject(StudentsService)

  ngOnInit(): void {
    this.students$=this.studentService.getStudent()

    //delete
    this.students$.subscribe(students => console.log(students));
    //delete
  }
}
