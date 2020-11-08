import { Document } from './../../classes/Document';
import { TokenStorageService } from './../token-storage.service';
import { HttpClient } from '@angular/common/http';
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
}
