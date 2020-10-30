import { ExamPeriod } from './../classes/ExamPeriod';
import { ExamService } from './../services/exam-service/exam.service';
import { SubjectService } from './../services/subject-service/subject.service';
import { Subject } from './../classes/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';





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
  subjects: Subject[];
  examPeriod: ExamPeriod[];
  active = 1;
  //subjects = SUBJECTS;

  constructor(private subjectService: SubjectService, private examService : ExamService) {


    //jjthis.source = new LocalDataSource(this.data)
   }

   ngOnInit() {

    this.examService.getActivePeriod().subscribe(res =>{
      this.examPeriod = res;
    })

    this.examService.getNonPassedSubjects().subscribe(res => {
      this.subjects = res;
    })

    console.log(this.subjects)

    //console.log(this.subjects[0].subjectName + "asdasdasda")

   }






}
