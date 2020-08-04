import { NbMenuService, NB_WINDOW, NbSidebarService } from '@nebular/theme';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';

import { filter, map } from 'rxjs/operators';

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
  title = 'eObrazovanje-angular-app';

  constructor(private sidebarService: NbSidebarService,private nbMenuService : NbMenuService, @Inject(NB_WINDOW) private window ) { }


  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.window.alert(`${title} was clicked`));
  }

  toggle(){
    this.sidebarService.toggle(true);
    return false;
  }

  profileItems = [
    {
      title: 'Profil',
      icon: 'person-outline'
    },
    {
      title: 'Podešavanja',
      icon: 'settings-2-outline',
    },
    {
      title: 'Izloguj se',
      icon: 'unlock-outline',
    }

  ]

}

