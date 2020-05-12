import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit  {
  @ViewChild('start') startBox: ElementRef;
  @ViewChild('end') endBox: ElementRef;
  @ViewChild('end2') end2Box: ElementRef;
  arrow: any;
  arrow2: any;
  scale = 1;

  constructor() {}

  ngOnInit() {
    // console.log(LeaderLine);
  }

  ngAfterViewInit() {
    this.arrow = new LeaderLine(LeaderLine.pointAnchor(this.startBox.nativeElement), this.endBox.nativeElement);
    this.arrow2 = new LeaderLine(LeaderLine.pointAnchor(this.startBox.nativeElement), this.end2Box.nativeElement);
    // this.drawArrow();
  }

  onScroll(event) {
    console.log(event);
    const delta = event.deltaY;

      // отмасштабируем при помощи CSS
      if (delta > 0) this.scale += 0.05;
      else this.scale -= 0.05;
      setTimeout(() => this.drawArrow());
  }

  drawArrow() {
    this.arrow.position();
    this.arrow2.position();
    // new LeaderLine(this.startBox.nativeElement, this.endBox.nativeElement);
  }
}
