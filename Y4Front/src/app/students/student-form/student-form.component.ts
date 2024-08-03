import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StudentsService} from "../../services/students.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  studentFormSubscription!: Subscription;
  paramsSubscription!: Subscription;
  studentsService = inject(StudentsService)

  isEdit = false;
  id=0;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService
              ) {
  }

  ngOnDestroy(): void {
    if (this.studentFormSubscription) {
      this.studentFormSubscription.unsubscribe()
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe()
    }
  }

  onSubmit() {
    if (!this.isEdit) {
      this.studentFormSubscription = this.studentsService.addStudent(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success("Student sucesfully added")
          this.router.navigateByUrl('/students');

        },
        error: err => {
          console.log(err);

        }
      })
    } else {
      this.studentsService.editStudent(this.id, this.form.value).subscribe(
        {
          next: value => {
            this.toastrService.success("Edited sucessfully");
            this.router.navigateByUrl('/students')
          }, error: err => {
            this.toastrService.error('Unable to edit');
          }
        }
      )
    }
  }

  ngOnInit(): void {

    this.paramsSubscription = this.activatedRoute.params.subscribe(
      {
        next: (response) => {
          console.log(response['id']);
          let id = response['id']
          this.id = id;
          if (!id) return;

          this.studentsService.getStudent(id).subscribe({
            next: response => {
              this.form.patchValue(response)
              this.isEdit = true
            },
            error: err => {
              console.log(err);
            }
          })
        },
        error: err => {
          console.log(err)
        }
      }
    )

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: [],
      email: [],
      phoneNumber: ['', Validators.email]
    })
  }
}
