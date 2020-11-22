import { Component, OnInit } from '@angular/core';


interface Subject {
  oznaka: string;
  naziv_predmeta: string;
  iznos: number;
  ects: number;
  datum: Date;
  nastavnik: string
  ocena: number;
}

const SUBJECTS: Subject[] = [
  {
    oznaka: 'M1',
    naziv_predmeta: 'Matematika 1',
    iznos: 300.00,
    ects: 8,
    datum: new Date("2020-01-18"),
    nastavnik: 'Mirko Mirkovic',
    ocena: 7
  },
  {
    oznaka: 'EO',
    naziv_predmeta: 'EObrazovanje',
    iznos: 200.00,
    ects: 6,
    datum: new Date("2020-01-16"),
    nastavnik: 'Nikola Nikolic',
    ocena: 8
  },
  {
    oznaka: 'EUP',
    naziv_predmeta: 'eUprava',
    iznos: 200.00,
    ects: 3,
    datum: new Date("2020-01-13"),
    nastavnik: 'Nikola Nikolic',
    ocena: 6
  },
  {
    oznaka: 'UD',
    naziv_predmeta: 'Upravljanje datotekama',
    iznos: 200.00,
    ects: 7,
    datum: new Date("2020-02-16"),
    nastavnik: 'Mirko Mirkovic',
    ocena: 9
  },
  {
    oznaka: 'ENG1',
    naziv_predmeta: 'Engleski 1',
    iznos: 200.00,
    ects: 5,
    datum: new Date("2020-03-21"),
    nastavnik: 'Mirko Mirkovic',
    ocena: 8
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
