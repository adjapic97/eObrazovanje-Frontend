import { Student } from './../classes/Student';
import { StudentService } from './../services/student-service/student.service';
import { ExamPeriod } from './../classes/ExamPeriod';
import { ExamService } from './../services/exam-service/exam.service';
import { SubjectService } from './../services/subject-service/subject.service';
import { Subject } from './../classes/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';





/* const SUBJECTS: Subject[] = [
  {
    oznaka: 'M1',
    naziv_predmeta: 'Matematika 1',
    iznos: 300.00,
    datum: new Date("2020-01-18"),
    nastavnik: 'Mirko Mirkovic'
  },
  {
    oznaka: 'EO',
    naziv_predmeta: 'EObrazovanje',
    iznos: 200.00,
    datum: new Date("2020-01-16"),
    nastavnik: 'Mirko Mirkovic'
  },
  {
    oznaka: 'EO',
    naziv_predmeta: 'EObrazovanje',
    iznos: 200.00,
    datum: new Date("2020-01-16"),
    nastavnik: 'Mirko Mirkovic'
  },
  {
    oznaka: 'EO',
    naziv_predmeta: 'EObrazovanje',
    iznos: 200.00,
    datum: new Date("2020-01-16"),
    nastavnik: 'Mirko Mirkovic'
  },
  {
    oznaka: 'EO',
    naziv_predmeta: 'EObrazovanje',
    iznos: 200.00,
    datum: new Date("2020-01-16"),
    nastavnik: 'Mirko Mirkovic'
  },




]; */



@Component({
  selector: 'app-exam-check-in',
  templateUrl: './exam-check-in.component.html',
  styleUrls: ['./exam-check-in.component.css']
})
export class ExamCheckInComponent implements OnInit {
  subjects: Subject[] = [];
  isDisabled: boolean = false;
  prijavljeniIspiti: Subject[] = [];
  ispitiZaPrijavu: Subject[] = [];
  examPeriod: ExamPeriod[];
  active = 1;
  form: FormGroup;
  student: Student;
  examPrice: number;
  totalPrice: number = 0;
  //subjects = SUBJECTS;

  constructor( private examService : ExamService, private fb: FormBuilder, private studentService : StudentService) {



    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })


    //jjthis.source = new LocalDataSource(this.data)
   }

   ngOnInit() {


    this.examService.getActivePeriod().subscribe(response =>
     this.handleActivePeriods(response)
    );


    this.studentService.getStudentStatus().subscribe(
      response => this.handleStatus(response)
    )


    this.examService.getNonPassedSubjects().subscribe(
      response => this.handleNonPassed(response)
    );
      console.log(this.student)
    //console.log(this.subjects[0].subjectName + "asdasdasda")


   }


   checkPrice(){
     if(this.student.studentStatus == 'ADVANCED_UNIVERSITY_STUDENT'){
       this.examPrice = 1500;
     } else{
       this.examPrice = 300;
     }
   }

   handleActivePeriods(response){
     this.examPeriod = response;

   }

    handleNonPassed(response){
      this.subjects = response;
      console.log(this.subjects)
    }



    handleStatus(response){
      this.student = response;
      this.checkPrice();

    }

    onChange(subject, selected : boolean){
      if(this.ispitiZaPrijavu.indexOf(subject) === -1 && selected){
        this.ispitiZaPrijavu.push(subject)
        this.totalPrice = this.totalPrice +this.examPrice;
      }
      else if(!selected){
        let index = this.ispitiZaPrijavu.indexOf(subject);
        this.ispitiZaPrijavu.splice(index,1);
        this.totalPrice = this.totalPrice  - this.examPrice;
      }
      console.log(this.totalPrice);
      console.log(this.ispitiZaPrijavu)
    }




}
