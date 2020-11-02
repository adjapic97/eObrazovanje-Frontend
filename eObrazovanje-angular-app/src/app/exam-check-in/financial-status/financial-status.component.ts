import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css']
})
export class FinancialStatusComponent implements OnInit {


  @Input() totalPrice: number;

  constructor() { }

  ngOnInit(): void {
  }

}
