import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Box } from '../box';

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

}
