import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit  {
  @ViewChild('start') startBox: ElementRef;
  @ViewChild('end') endBox: ElementRef;
  arrow: any;

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.arrow = new LeaderLine(this.startBox.nativeElement, this.endBox.nativeElement);
    // this.drawArrow();
  }

  drawArrow() {
    this.arrow.position();
    // new LeaderLine(this.startBox.nativeElement, this.endBox.nativeElement);
  }
}
