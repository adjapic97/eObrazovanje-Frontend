import { Observable } from 'rxjs';
import { LecturerService } from './../../services/lecturer-service/lecturer.service';
import { Lecturer } from './../../classes/Lecturer';
import { SubjectService } from './../../services/subject-service/subject.service';
import { Subject } from './../../classes/Subject';
import { Component, OnInit, Input, Type } from '@angular/core';
import { delay } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Da li ste sigurni da zelite da uklonite {{lecturer.firstName + " " + lecturer.lastName}}?</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="deleteFromSubject(lecturer)">Ok</button>
  </div>
  `
})
export class NgbdModalContent {
  @Input() lecturer : Lecturer;
  @Input() subjectId : number;
  @Input() lecturerArray : Lecturer [];

  constructor(public activeModal: NgbActiveModal, private lecturerService : LecturerService) {}


  deleteFromSubject(lecturer){
   this.lecturerService.deleteFromSubject(lecturer, this.subjectId).subscribe(
     response => {
       this.removeFromArray(this.lecturerArray,lecturer);
     }
   )
    this.activeModal.close();

  }

  removeFromArray(array,lecturer){
    const index = array.indexOf(lecturer)
      if(index > -1){
        array.splice(index,1);
      }

  }
}


@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  isSuccessful = false;
  isDisabled = true;
  constructor(private service : SubjectService, private modalService: NgbModal) { }


  @Input() subject: Subject;
  lecturer: Lecturer;



  ngOnInit(): void {
  }


  open(lecturer, subject, lecturers) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.lecturer = lecturer;
    modalRef.componentInstance.subjectId = subject.id;
    modalRef.componentInstance.lecturerArray = subject.lecturerDTO;
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

