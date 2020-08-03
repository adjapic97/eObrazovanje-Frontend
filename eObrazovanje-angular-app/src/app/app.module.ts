import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbLayoutComponent, NbCardComponent, NbMenuModule, NbCardModule, NbIconModule, NbContextMenuModule, NbUserModule } from '@nebular/theme';
import { UserSideMenuComponent } from './user-side-menu/user-side-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    UserSideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbEvaIconsModule,
    BrowserAnimationsModule,
    NbIconModule,
    NbContextMenuModule,
    NbUserModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
