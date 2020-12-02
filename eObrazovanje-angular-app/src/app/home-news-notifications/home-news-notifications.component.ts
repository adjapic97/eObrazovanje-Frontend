import { TokenStorageService } from './../services/token-storage.service';
import { Article } from './../classes/Article';
import { ArticleService } from './../services/article-service/article.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-news-notifications',
  templateUrl: './home-news-notifications.component.html',
  styleUrls: ['./home-news-notifications.component.css']
})
export class HomeNewsNotificationsComponent implements OnInit {

  closeResult = '';
  articleForm : FormGroup;
  created : boolean = false;
  articles : Article[] = [];
  isStudent: boolean;

  constructor(private modalService: NgbModal, private fb : FormBuilder, private articleService : ArticleService, private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.articleForm = this.createForm();

    this.articleService.getAllArticles().subscribe(
      response => this.articles = response
    )
    if(this.tokenStorageService.getUser() == null){
      this.isStudent = true;
    }else{
      this.isStudent = this.tokenStorageService.getUser().authorities.includes('STUDENT');

    }
  }

  createForm(): FormGroup{
    return this.fb.group({
      articleName: [""],
      articleText: [""],
      important: [""]
    })

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  createArticle(){
    this.articleService.createArticle(this.articleForm.value).subscribe(
      response => {
        console.log(response)
        this.created = true;
      },
      err => {
        console.log(err.error.message);
        this.created = true;
      }
    )
  }
}
