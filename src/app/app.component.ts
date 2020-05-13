import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Box } from './box';
import { forkJoin } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

const items = [
  'Get to work',
  'Pick up groceries',
  'Go home',
  'Fall asleep',
  'Get up',
  'Brush teeth',
  'Take a shower',
  'Check e-mail',
  'Walk dog',
];

const boxNames = [
  { name: 'Get to work', position: { x: 276, y: 84 } },
  { name: 'Pick up groceries', position: { x: 130, y: 173 } },
  { name: 'Go home', position: { x: 451, y: 73 } },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('start') startBox: ElementRef;
  @ViewChild('end') endBox: ElementRef;
  @ViewChild('end2') end2Box: ElementRef;
  arrow: any;
  arrow2: any;
  scale = 1;
  items: Box[] = items.map((name) => new Box(name));
  boxes: Box[] = boxNames.map(({ name, position }) => new Box(name, position));

  constructor() {}

  ngOnInit() {
    // console.log(LeaderLine);
  }

  // @HostListener('mouseup', ['$event']) onMouseEnter(e) {
  //   console.log(e);
  //   const lastBox = this.boxes[this.boxes.length - 1];
  //   lastBox.position = { x: e.offsetX, y: e.offsetY - 125 };
  //   console.log(lastBox);
  // }

  ngAfterViewInit() {
    // this.end2Box.setFreeDragPosition({x: 50, y: 3});
    // console.log(this.end2Box.cdkDragFreeDragPosition);
    // this.arrow = new LeaderLine(
    //   this.startBox.nativeElement,
    //   this.endBox.nativeElement
    // );
    // this.arrow2 = new LeaderLine(
    //   this.startBox.nativeElement,
    //   this.end2Box.nativeElement
    // );
    // this.drawArrow();
  }

  onScroll(event) {
    const delta = event.deltaY;

    if (delta > 0) {
      this.scale += 0.05;
    } else {
      this.scale -= 0.05;
    }
    setTimeout(() => this.drawArrow());
  }

  drop(event: CdkDragDrop<Box>) {
    console.log(event);
    const newBox = new Box(event.container.data[event.currentIndex].name);
    console.log(newBox);
    this.boxes.push(newBox);
  }

  entered(event) {
    console.log('entered', event);
  }

  drawArrow(event?) {
    console.log(event.pointerPosition)
    // console.log(event);
    // console.log(event.source.getFreeDragPosition());
    // this.arrow.position();
    // this.arrow2.position();
    // new LeaderLine(this.startBox.nativeElement, this.endBox.nativeElement);
  }
}
