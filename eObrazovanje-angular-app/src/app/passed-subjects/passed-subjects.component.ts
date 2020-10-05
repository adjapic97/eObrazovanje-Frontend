import { Component, OnInit } from '@angular/core';


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
  selector: 'app-passed-subjects',
  templateUrl: './passed-subjects.component.html',
  styleUrls: ['./passed-subjects.component.css']
})
export class PassedSubjectsComponent implements OnInit {

  constructor() { }
  subjects = SUBJECTS;
  ngOnInit(): void {
  }

}
