import { Document } from './../classes/Document';
import { DocumentService } from './../services/documents-service/document.service';
import { Component, OnInit } from '@angular/core';

declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {

    this.documentService.getAllDocuments().subscribe(
      response => this.documents = response
    )
  }


  downloadPdf(url: string, pdfName : string){

    FileSaver.saveAs(url,pdfName);

  }

}
/*  */
