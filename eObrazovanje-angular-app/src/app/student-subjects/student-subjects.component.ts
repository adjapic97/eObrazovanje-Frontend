import { OnInit, Component } from '@angular/core';
import { SubjectService } from './../services/subject-service/subject.service';
import { Subject } from '../classes/Subject';


@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css']
})
export class StudentSubjectsComponent implements OnInit {
  subjects: Subject[];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

  }

  handleSuccessfulResponse(response){
    this.subjects = response;
    this.subjects.forEach(subject => {
      console.log(subject.shortName)
      if(subject.lecturerDTO != null){
        subject.lecturerDTO.forEach(lecturer => {
          console.log(lecturer.firstName)
        })
      }

    });

  }

}
