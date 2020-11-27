import { Component, OnInit } from '@angular/core';
import { FinancialCard } from '../classes/FinancialCard';
import { Transaction } from '../classes/Transaction';
import { FinancialCardService } from '../services/financial-card/financial-card.service';

@Component({
  selector: 'app-financial-card',
  templateUrl: './financial-card.component.html',
  styleUrls: ['./financial-card.component.css']
})
export class FinancialCardComponent implements OnInit {

  financialCard: FinancialCard;
  transactionDTO: Transaction[] = [];

  constructor(private financialCardService: FinancialCardService) { }

  ngOnInit(): void {

    this.financialCardService.getFinancialCardForStudent().subscribe(
      response => this.handleFinancialCardForStudent(response)
    )
  }
    handleFinancialCardForStudent(response) {
      this.financialCard = response;
      this.transactionDTO = response.transactionDTO;
      console.log(this.financialCard)
    }


}
