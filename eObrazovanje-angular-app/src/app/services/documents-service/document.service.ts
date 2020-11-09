import { Observable } from 'rxjs';
import { Document } from './../../classes/Document';
import { TokenStorageService } from './../token-storage.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = "http://localhost:8080/api/document/"



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  id: number;

  constructor(private http : HttpClient, private tst : TokenStorageService) { }


  getAllDocuments(){
    this.id = this.tst.getUser().id;


    return this.http.get<Document[]>(URL + "files-for-student?id=" + this.id)

  }



  uploadFile(file : File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', "http://localhost:8080/api/document/upload", formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
