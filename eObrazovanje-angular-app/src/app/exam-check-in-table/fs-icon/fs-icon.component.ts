import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nb-fs-icon',
  templateUrl: './fs-icon.component.html',
  styleUrls: ['./fs-icon.component.css']
})
export class FsIconComponent {

  constructor() { }

  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }

}
