import { Observable } from 'rxjs';
import { Document } from './../classes/Document';
import { DocumentService } from './../services/documents-service/document.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {

    this.documentService.getAllDocuments().subscribe(
      response => this.documents = response
    )
  }


  downloadPdf(url: string, pdfName : string){

    FileSaver.saveAs(url,pdfName);

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }


  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.documentService.uploadFile(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.documentService.getAllDocuments();
          this.documentService.getAllDocuments().subscribe(
            response => this.documents = response
          )
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Upload fajla nije bio uspesan';
        this.currentFile = undefined;
      }
    );
    this.selectedFiles = undefined;
  }

}
/*  */
