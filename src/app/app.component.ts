import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit  {
  @ViewChild('start') startBox: ElementRef;
  @ViewChild('end') endBox: ElementRef;

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    const start = document.getElementById('start');
    console.log(start, this.startBox);
    new LeaderLine(this.startBox.nativeElement, this.endBox.nativeElement);
  }
}
