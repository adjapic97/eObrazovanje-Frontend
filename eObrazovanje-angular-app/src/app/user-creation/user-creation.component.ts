import { LecturerService } from './../services/lecturer-service/lecturer.service';
import { SubjectService } from './../services/subject-service/subject.service';
import { Subject } from './../classes/Subject';
import { UserService } from './../services/user.service';
import { Student } from "./../classes/Student";
import { CustomValidator } from "./../common/validators/custom-validator";
import { Courses } from "./../classes/Courses";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthGuardService } from "./../services/auth-guard.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Role } from "../classes/Role";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-user-creation",
  templateUrl: "./user-creation.component.html",
  styleUrls: ["./user-creation.component.css"],
})
export class UserCreationComponent implements OnInit {
  selectedOption: string;
  courseName: string;
  printedOption: string;
  angForm: FormGroup;
  lectForm: FormGroup;
  dateOfBirth: NgbDateStruct;
  public student: Student;
  private routerInfo: BehaviorSubject<string>;
  public flag: boolean;
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  subjects: Subject[] = [];
  selectedSubjects: Subject [] = [];
  courses: Courses[] = [];
  errorOccured: boolean = false;

  constructor(private fb: FormBuilder,private lecturerService : LecturerService, private authSerivce: AuthGuardService, private userService : UserService, private subjectService : SubjectService) {
    this.angForm = this.createForm();
    this.lectForm = this.createLectForm();

    this.routerInfo = new BehaviorSubject<string>("");
  }




  createForm(): FormGroup {
    return this.fb.group({
      firstName: ["", Validators.required],
      course: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      lastName: ["", Validators.required],
      indexNumber: ["", Validators.required],
      role:[],
      username: [
        "",
        Validators.compose([
          Validators.required,
          CustomValidator.cannotContainSpace,
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ]),
      ],
      city: ["", Validators.required],
      residence_address: ["", Validators.required],
      citizenship: ["", Validators.required],
      placeOfBirth: ["", Validators.required],
      stateOfBirth: ["", Validators.required],
      cardType: ["", Validators.required],
      emailAddress: [
        "",
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      ],
      parentName: ["", Validators.required],
      gender: ["", Validators.required],
      mobilePhoneNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
    });
  }


  createLectForm(): FormGroup {
    return this.fb.group({
      firstName: ["", Validators.required],
      course: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      lastName: ["", Validators.required],
      indexNumber: ["", Validators.required],
      username: [
        "",
        Validators.compose([
          Validators.required,
          CustomValidator.cannotContainSpace,
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ]),
      ],
      city: ["", Validators.required],
      residence_address: ["", Validators.required],
      citizenship: ["", Validators.required],
      placeOfBirth: ["", Validators.required],
      stateOfBirth: ["", Validators.required],
      cardType: ["", Validators.required],
      emailAddress: [
        "",
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      ],
      parentName: ["", Validators.required],
      gender: ["", Validators.required],
      mobilePhoneNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],

    });
  }


  async ngOnInit(): Promise<void> {
    this.subjectService.getSubjects().subscribe(response => {
      this.subjects = response;
    })

    this.authSerivce.getRoles().subscribe((response) => {
      this.roles = response;
    });

    this.authSerivce.getCourses().subscribe((response) => {
      this.courses = response;
    });

    this.getValue().subscribe((value) => {
      this.selectedOption = value;
    });
  }

  getValue(): Observable<string> {
    return this.routerInfo.asObservable();
  }

  setValue(newValue): void {
    this.routerInfo.next(newValue);
  }

  get firstName() {
    return this.angForm.get("firstName");
  }

  get username() {
    return this.angForm.get("username");
  }

  get password() {
    return this.angForm.get("password");
  }

  get indexNumber() {
    return this.angForm.get("indexNumber");
  }

  get role(){
    return this.selectedOption;
  }

  submitCreateStudent() {
    this.angForm.value.role = this.selectedOption;
    console.log(this.angForm.value.firstName)
    console.log(this.angForm.value.course)
    this.userService.createNewStudent(this.angForm.value).subscribe(
      data => {
          console.log(this.angForm)
      },
      err => {

        this.errorOccured = true;
          console.log(err.error.message)
      }
    );
  }

  submitCreateLecturer(){
    this.lecturerService.createLecturer(this.lectForm.value,this.selectedRoles, this.selectedSubjects).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err.error.message)
      }
    )
  }
}
