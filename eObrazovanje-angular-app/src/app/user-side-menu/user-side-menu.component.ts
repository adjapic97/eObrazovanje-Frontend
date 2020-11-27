import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Inject, Input } from '@angular/core';
import { NbMenuItem, NbMenuService, NB_WINDOW } from '@nebular/theme';
@Component({
  selector: 'app-user-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-side-menu.component.html',
  styleUrls: ['./user-side-menu.component.css'],
  encapsulation: ViewEncapsulation.None,

})

export class UserSideMenuComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  @Input() authorities: [];
  @Input() testString: string;
  @Input() showAdminBoard: boolean;
  items: NbMenuItem[];

  constructor() { }

  ngOnInit(): void {

    if(this.showAdminBoard){
      this.items =  [
        {
          title: 'Pocetna',
          link: '/home'
        },

        {
          title: 'Ispiti',
          icon: 'book-outline',
          expanded: true,
          children: [
            {
              title: 'predmeti koje predaje',
              icon: 'copy-outline',
              link: 'sluzba/subject-manage-exam'
            },
            {
              title: 'Upravljanje aktivnim rokom',
              icon: 'checkmark-outline',
              link: 'sluzba/passed-subjects'
            },
            {
              title: 'Istorija polaganja',
              icon: 'clock-outline',
              link: 'sluzba/exam-history'

            },
            {
              title: 'Prijava ispita',
              link: 'sluzba/prijava-ispita',
              icon: 'radio-button-off-outline',
            },
            {
              title: 'Odjava ispita',
              icon: 'close-circle',
              link: 'sluzba/odjava-ispita'
            },
          ],
        },
        {
          title: 'Dokumenti',
          icon: 'file-text-outline',
          link: 'sluzba/documents'
        },
        {
          title: 'Admin board',
          icon: 'keypad-outline',
          link: 'sluzba/admin-board'
        }

      ];
    }
    else{
      this.items =  [

        {
          title: 'Ispiti',
          icon: 'book-outline',
          expanded: true,
          children: [
            {
              title: 'svi predmeti',
              icon: 'copy-outline',
              link: 'sluzba/student-subjects'
            },
            {
              title: 'Položeni predmeti',
              icon: 'checkmark-outline',
              link: 'sluzba/passed-subjects'
            },
            {
              title: 'Nepoloženi predmeti',
              icon: { icon: 'npm-outline', pack: 'eva' },
              link: 'sluzba/non-passed-subjects'
            },
            {
              title: 'Prijava ispita',
              link: 'sluzba/prijava-ispita',
              icon: 'radio-button-off-outline',
            },
            {
              title: 'Odjava ispita',
              icon: 'close-circle',
              link: 'sluzba/odjava-ispita'
            },
            {
              title: 'Istorija polaganja',
              icon: 'clock-outline',
              link: 'sluzba/exam-history'
            }
          ],
        },

        {
          title: 'Finansijska kartica',
          icon: 'clipboard-outline',
          link: 'sluzba/financial-card'
        },

        {
          title: 'Dokumenti',
          icon: 'file-text-outline',
          link: 'sluzba/documents'
        },


      ];

    }

  }



  adminItems: NbMenuItem[] = [{
    title: 'kontrolna tabla',
    icon: 'browser-outline'
  }]








}
