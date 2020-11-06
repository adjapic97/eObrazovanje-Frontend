import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {
  modalBody: string;
  @ViewChild('lgModal') modal:ElementRef;






  constructor() { }

  ngOnInit(): void {
  }

}
