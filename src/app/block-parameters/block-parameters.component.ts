import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Box, BoxLink } from '../box';

@Component({
  selector: 'app-block-parameters',
  templateUrl: './block-parameters.component.html',
  styleUrls: ['./block-parameters.component.scss']
})
export class BlockParametersComponent implements OnInit {
  @Input() box: Box;
  @Output() connection: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  connect() {
    this.connection.emit();
  }

  highlightArrow(arrow: any) {
    console.log('hover:', arrow);
    arrow.setOptions({dash: {animation: true}, dropShadow: {color: 'white', dx: 0, dy: 0}});
  }

  defaultingArrow(arrow: any) {
    arrow.setOptions({dash: false, dropShadow: false});
  }

  deleteLink(link: BoxLink) {
    this.box.deleteLinkWithLink(link);
  }

}
