import { SubjectExamManagmentComponent } from './subject-exam-managment/subject-exam-managment.component';
import { DocumentsComponent } from './documents/documents.component';
import { FinancialCardComponent } from './financial-card/financial-card.component';
import { ExamHistoryComponent } from './exam-history/exam-history.component';
import { NonPassedSubjectsComponent } from './non-passed-subjects/non-passed-subjects.component';
import { PassedSubjectsComponent } from './passed-subjects/passed-subjects.component';
import { RoleGuardService } from './services/role-guard.service';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ExamCheckInComponent } from './exam-check-in/exam-check-in.component';
import { HomeNewsNotificationsComponent } from './home-news-notifications/home-news-notifications.component';
import { AppComponent } from './app.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbThemeModule, NbMenuService, NbMenuModule, NbSidebarService } from '@nebular/theme';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { StudentDetailsComponent } from './student-details/student-details.component';


const routes: Routes = [


  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeNewsNotificationsComponent},
  { path: 'login',component: LoginComponent},
  { path:'sluzba',
  canActivate: [AuthGuardService],
  children: [
    { path: 'prijava-ispita', component: ExamCheckInComponent},
    { path: 'student-subjects', component: StudentSubjectsComponent },
    { path: 'passed-subjects', component: PassedSubjectsComponent},
    { path: 'non-passed-subjects', component: NonPassedSubjectsComponent},
    { path: 'exam-history', component: ExamHistoryComponent},
    { path: 'financial-card', component: FinancialCardComponent},
    { path: 'documents', component: DocumentsComponent},
    { path: 'student-details', component: StudentDetailsComponent},
    { path: 'subject-manage-exam', component: SubjectExamManagmentComponent},

    { path: 'admin-board',
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'ROLE_ADMIN'
    },
    component: AdminBoardComponent}
  ]
  },

/*   {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  }, */
];



@NgModule({
  imports: [RouterModule.forRoot(routes),
  NbMenuModule.forRoot(),
  NbThemeModule.forRoot(),


  ],
  exports: [RouterModule],
  providers: [NbSidebarService]
})
export class AppRoutingModule { }
