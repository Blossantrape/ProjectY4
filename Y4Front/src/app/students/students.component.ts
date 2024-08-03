import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Observable} from "rxjs";
import {Student} from "../types/student";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students$!:Observable<Student[]>
  toastrService = inject(ToastrService)

  studentService = inject(StudentsService)

  ngOnInit(): void {
    this.getStudents()
  }
  delete(id:number){
    this.studentService.deleteStudent(id).subscribe(
      {
        next: (response) => {
          this.toastrService.success('Student deleted successfully');
        }
      }
    )
  }

  private getStudents():void{
    this.students$=this.studentService.getStudents()
  }
}
