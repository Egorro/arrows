import { Component, OnInit, Input } from '@angular/core';
import { Box } from '../box';

@Component({
  selector: 'app-lib-list',
  templateUrl: './lib-list.component.html',
  styleUrls: ['./lib-list.component.scss']
})
export class LibListComponent implements OnInit {
  @Input() items: Box[];

  constructor() { }

  ngOnInit(): void {
  }

}
