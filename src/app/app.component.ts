import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Box, Gates } from './box';
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
  { name: 'Get to work', position: { x: 276, y: 84 }, gates: [{name: 'input'}] as Gates },
  { name: 'Pick up groceries', position: { x: 130, y: 173 }, gates: [{name: 'output'}] as Gates },
  { name: 'Go home', position: { x: 451, y: 73 } },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('start') startBox: ElementRef;
  @ViewChild('end') endBox: ElementRef;
  @ViewChild('end2') end2Box: ElementRef;
  arrow: any;
  arrow2: any;
  scale = 1;
  items: Box[] = items.map((name) => new Box(name));
  boxes: Box[] = boxNames.map(({ name, position, gates = [] }) => new Box(name, position, gates));

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
    const element = event.item.element.nativeElement;
    const { offsetLeft, offsetTop } = element;
    const { x, y } = event.distance;
    const positionX = offsetLeft + x;
    const positionY = offsetTop + y;
    const newX = positionX - 110;
    const newY = (positionY - (element.offsetHeight * this.boxes.length) - 19);
    const newBox = new Box(event.container.data[event.currentIndex].name, {x: newX, y: newY});
    this.boxes.push(newBox);
  }

  setPosition() {
    this.boxes[this.boxes.length - 1].position = {x: 0, y: 0};
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
