import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbThemeModule, NbMenuService, NbMenuModule, NbSidebarService } from '@nebular/theme';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  NbMenuModule.forRoot(),
  NbThemeModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [NbSidebarService]
})
export class AppRoutingModule { }
