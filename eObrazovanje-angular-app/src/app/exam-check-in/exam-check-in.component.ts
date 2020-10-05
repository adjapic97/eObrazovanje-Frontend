import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

interface Subject {
  oznaka: string;
  naziv_predmeta: string;
  iznos: number;
  datum: Date;
  nastavnik: string;
}

const SUBJECTS: Subject[] = [
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




];

@Component({
  selector: 'app-exam-check-in',
  templateUrl: './exam-check-in.component.html',
  styleUrls: ['./exam-check-in.component.css']
})
export class ExamCheckInComponent implements OnInit {

  active = 1;
  subjects = SUBJECTS;

  constructor() {
    //jjthis.source = new LocalDataSource(this.data)
   }

   ngOnInit() {
   }






}
