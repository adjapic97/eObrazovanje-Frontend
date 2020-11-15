import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenStorageService } from "./../services/token-storage.service";
import { FinancialCard } from "./../classes/FinancialCard";
import { Student } from "./../classes/Student";
import { StudentService } from "./../services/student-service/student.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.css"],
})
export class StudentDetailsComponent implements OnInit {
  student: Student;
  errorMessage = "";
  financialCard: FinancialCard;
  isStudent: boolean;
  userForm: FormGroup;
  isDisabled: boolean = true;

  constructor(
    private fb : FormBuilder,
    private studentService: StudentService,
    private tokenSS: TokenStorageService
  ) {
    this.studentService
      .getLoggedStudent()
      .subscribe((response) => (this.student = response));

    this.studentService
      .getStudentFinancialCard(this.tokenSS.getUser().id)
      .subscribe((response) => (this.financialCard = response));

      this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: [""],
      phoneNumber: [""],
      residence_address:[""],
      mobilePhoneNumber: [""]
    })
  }

  ngOnInit(): void {
    this.studentService.getLoggedStudent().subscribe(
      (response) => {
        this.student = response;
      },
      (error) => {
        console.error("Could not retrieve logged student");
        this.errorMessage = error;
      }
    );
    console.log(this.student);

    if (this.tokenSS.getUser().authorities.includes("STUDENT")) {
      this.isStudent = true;
    }
  }

  enableEdit(){
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled)
  }


  updateUserData() {


    this.studentService.updatePartial(this.userForm.value).subscribe(
      data => {
        console.log(data)
        this.isDisabled = true;
      },
      err => {
        console.log(err.error.message)
      }
    )
  }
}
