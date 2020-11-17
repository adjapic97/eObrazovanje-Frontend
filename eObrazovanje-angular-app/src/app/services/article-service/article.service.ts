import { Article } from './../../classes/Article';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {



  constructor(private http : HttpClient) { }


  getAllArticles(){
    return this.http.get<Article[]>("http://localhost:8080/api/article/get-all");
  }

  createArticle(form){
    console.log(form.articleName)
    return this.http.post<Article>("http://localhost:8080/api/article/create-article",{
      articleName: form.articleName,
      articleText: form.articleText,
      important: form.important
    }, httpOptions)
  }
}
