import { SubjectService } from './../services/subject-service/subject.service';
import { LecturerService } from './../services/lecturer-service/lecturer.service';
import { Lecturer } from './../classes/Lecturer';
import { Subject } from './../classes/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.css']
})
export class SubjectCreationComponent implements OnInit {

  subjectForm: FormGroup;
  subject: Subject;
  lecturers: Lecturer[] = [];

  selectedLecturers: Lecturer[]=  [];



  constructor(private lecturerService : LecturerService, private subjectService: SubjectService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.subjectForm = this.createForm();
    this.lecturerService.getAllLecturers().subscribe(
      response => this.lecturers = response
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      subjectName: ["", Validators.required],
      shortName: ["", Validators.required],
      ectsPoints: ["", Validators.required]

    })
  }


  submitCreateSubject(){
    this.subjectService.createSubject(this.subjectForm.value, this.selectedLecturers).subscribe(
      data => {
        console.log(this.subjectForm)
      },
      err => {
        console.log(err.error.message)
      }
    )
    console.log(this.selectedLecturers);
  }



}
