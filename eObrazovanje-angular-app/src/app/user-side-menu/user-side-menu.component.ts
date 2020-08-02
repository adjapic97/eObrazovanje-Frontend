import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-user-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-side-menu.component.html',
  styleUrls: ['./user-side-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserSideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
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
    },
    {
      title: 'Podešavanja',
      icon: 'settings-2-outline',
    },
    {
      title: 'Izloguj se',
      icon: 'unlock-outline',
    },
  ];
}
