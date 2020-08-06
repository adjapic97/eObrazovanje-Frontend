import { ExamCheckInComponent } from './exam-check-in/exam-check-in.component';
import { HomeNewsNotificationsComponent } from './home-news-notifications/home-news-notifications.component';
import { AppComponent } from './app.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbThemeModule, NbMenuService, NbMenuModule, NbSidebarService } from '@nebular/theme';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeNewsNotificationsComponent},
  {path: 'prijava-ispita', component: ExamCheckInComponent},
  { path: 'student-subjects', component: StudentSubjectsComponent },
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
