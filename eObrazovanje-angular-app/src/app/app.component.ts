import { MainService } from './services/main.service';
import { UserService } from './services/user.service';
import { TokenStorageService } from './services/token-storage.service';
import { Account } from './classes/Account';
import { NbMenuService, NB_WINDOW, NbSidebarService } from '@nebular/theme';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { filter, map } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
    :host nb-layout-header ::ng-deep nav{
      justify-content: flex-end;
    }
    `]

})


export class AppComponent implements OnInit {

  private authorities: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  accountsForUser: Account[];
  clickedAccount: Account[];
  isAccountChosen: boolean;
  emitClassListener = null;
  profileItems = []
  role: string;
  testString: string;

  title = 'eObrazovanje-angular-app';

  user: {};

  userLoggedIn: boolean = false;

  constructor(private mainService : MainService, private userService: UserService, private sidebarService: NbSidebarService, private tokenStorageService: TokenStorageService, private nbMenuService : NbMenuService, @Inject(NB_WINDOW) private window, private authService : NbAuthService ) {


  }



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      const userrole = this.tokenStorageService.getAuthorities();
      this.authorities = user.authorities;

      this.showAdminBoard = this.authorities.includes('ROLE_ADMIN');
     /// this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
     if(this.showAdminBoard && this.checkIfContainsRole("PROFESSOR") == true || this.checkIfContainsRole("ASSISTANT_PROFESSOR") ){
       console.log(this.showAdminBoard)
       this.role = 'administrator/professor'
       this.testString = 'test works'
      this.profileItems = [
        {
          title: 'Profil',
          icon: 'person-outline',
          link: 'sluzba/student-details'
        },
        {
          title: 'Studenti',
          icon: 'settings-2-outline',
          link: ''

        },
        {
          title: 'Upravljaj polaganjima',
          icon: 'settings-2-outline',
          link: 'subject-manage-exam'

        },
        {
          title: 'Izloguj se',
          icon: 'unlock-outline'
        }

      ]

     } else if(this.showAdminBoard){
       this.role = 'Administrator'
      this.profileItems = [
        {
          title: 'Profil',
          icon: 'person-outline',
          link: 'sluzba/student-details'
        },
        {
          title: 'Podešavanja',
          icon: 'settings-2-outline',
          link: ''

        },
        {
          title: 'Izloguj se',
          icon: 'unlock-outline'
        }

      ]

     }

      this.username = user.lastname;



      if(sessionStorage.getItem('selectedAccount') != null){
        this.clickedAccount = JSON.parse(sessionStorage.getItem('selectedAccount'));
        this.isAccountChosen = true;
      }

/*
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => "Izloguj se"),
      )
      .subscribe(title => {
        switch(title){
          case "Izloguj se":
            this.logout();
            break;
          default:
        }
      }

        ); */

    this.nbMenuService.onItemClick().subscribe((event) => {
      switch(event.item.title){
        case 'Izloguj se':
          this.logout();
        case 'Podešavanja':
          console.log("settings");
        default:
      }
    })
  }





  this.emitClassListener = this.mainService.emitClass.subscribe(
    response => {

    }
  )


}

ngOnDestroy(){
  if(this.emitClassListener){
    this.emitClassListener.unsubscribe();
  }
}

toggle(){
  this.sidebarService.toggle(true);
  return false;
}

handleSuccessfulResponse(response)
{
    this.accountsForUser=response;

}

checkIfContainsRole(role){

  return this.showAdminBoard && JSON.parse(sessionStorage.getItem('auth-user')).authorities.includes(role);
}

logout() {
  this.tokenStorageService.signOut();
  window.location.reload();
}
}
