import { SubjectService } from './../../services/subject-service/subject.service';
import { Subject } from './../../classes/Subject';
import { Component, OnInit, Input } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  isSuccessful = false;
  isDisabled = true;
  constructor(private service : SubjectService) { }


  @Input() subject: Subject;


  ngOnInit(): void {
  }



  enableEdit(){
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled)
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


  onSubmit(){
    this.service.update(this.subject).subscribe(
      data => {

        (async () => {
          // Do something before delay
          this.isSuccessful = true;
          this.isDisabled = true;

          await delay(2000);

          // Do something after
         // this.isSuccessful = false;
      })();
      },
      err => {

      }

    )
  }


}
