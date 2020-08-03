import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Inject } from '@angular/core';
import { NbMenuItem, NbMenuService, NB_WINDOW } from '@nebular/theme';
@Component({
  selector: 'app-user-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-side-menu.component.html',
  styleUrls: ['./user-side-menu.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class UserSideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  adminItems: NbMenuItem[] = [{
    title: 'kontrolna tabla',
    icon: 'browser-outline'

  }]


  items: NbMenuItem[] = [

    {
      title: 'Ispiti',
      icon: 'book-outline',
      expanded: true,
      children: [
        {
          title: 'Položeni predmeti',
          icon: 'checkmark-outline',
        },
        {
          title: 'Nepoloženi predmeti',
          icon: { icon: 'npm-outline', pack: 'eva' },

        },
        {
          title: 'Prijava ispita',
          icon: 'radio-button-off-outline',
        },
        {
          title: 'Odjava ispita',
          icon: 'close-circle',
        },
        {
          title: 'Istorija polaganja',
          icon: 'clock-outline'
        }
      ],
    },

    {
      title: 'Finansijska kartica',
      icon: 'clipboard-outline',
    },

    {
      title: 'Dokumenti',
      icon: 'file-text-outline',
    }

  ];
}
