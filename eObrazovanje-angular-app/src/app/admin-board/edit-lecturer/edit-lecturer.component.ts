import { delay } from 'rxjs/operators';
import { Lecturer } from './../../classes/Lecturer';
import { LecturerService } from './../../services/lecturer-service/lecturer.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-lecturer',
  templateUrl: './edit-lecturer.component.html',
  styleUrls: ['./edit-lecturer.component.css']
})
export class EditLecturerComponent implements OnInit {

  isSuccessful = false;
  isDisabled = true;

  constructor(private service : LecturerService, private fb : FormBuilder) { }

  @Input() lecturer: Lecturer;

  ngOnInit(): void {
  }


  enableEdit(){
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled)
  }


  onSubmit(){
    this.service.update(this.lecturer).subscribe(
      data => {

        (async () => {
          // Do something before delay
          this.isSuccessful = true;
          this.isDisabled = true;

          await delay(2000);
          this.isSuccessful = false;
          // Do something after
         // this.isSuccessful = false;
      })();
      },
      err => {

      }

    )
  }
}
