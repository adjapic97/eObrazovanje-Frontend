import { Subject } from './../../classes/Subject';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  constructor() { }


  @Input() subject: Subject;


  ngOnInit(): void {
  }

}
