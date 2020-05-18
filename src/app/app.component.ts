import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Box, Task } from './box';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { data, defaultBoxes } from './testData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('endArrow') endArrow: ElementRef;
  arrow: any;
  arrow2: any;
  scale = 1;
  tasks: Task[] = data.map(
    (task) =>
      new Task(
        task.name,
        task.boxes.map((box) => new Box(box))
      )
  );
  boxes: Box[] = defaultBoxes.map(
    ({ name, position, gates = [] }) => new Box(name, position, gates)
  );
  currentBox: Box;

  constructor() {}

  ngOnInit() {}

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const element = this.endArrow.nativeElement;
    const shiftX = event.clientX - element.getBoundingClientRect().left;
    const shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);
    // this.currentBox.arrow.position();

    function moveAt(pageX: number, pageY: number) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  }

  ngAfterViewInit() {}

  fixScale() {
    this.scale = 1;
  }

  onScroll(event: WheelEvent) {
    event.preventDefault();
    const step = 0.05;
    const minLimit = 0.4;
    const delta = event.deltaY;

    if (delta > 0) {
      this.scale += step;
    } else {
      this.scale >= minLimit + step
        ? (this.scale -= step)
        : (this.scale = minLimit);
    }
    // setTimeout(() => this.drawArrow());
  }

  handleDragStart(event: CdkDragStart, box: Box) {
    console.log('move:', box);
    box.dragging = true;
  }

  selectBox(event: MouseEvent, box: Box) {
    console.log('select box:', box);
    box.selected = true;
    const element = event.target as HTMLElement;
    if (box.dragging) {
      box.dragging = false;
      return;
    }
    const start = element;
    if (box.arrow) {
      box.arrow.remove();
    }
    box.arrow = new LeaderLine(start, this.endArrow.nativeElement);
    this.currentBox = box;
  }

  unselectedBoxes(event: MouseEvent) {
    console.log(event);
    const domEl = event.target as HTMLElement;
    if (domEl.classList.contains('canvas')) {
      console.log('unselect boxes');
      this.boxes.forEach(box => box.selected = false);
    }
  }

  drop(event: CdkDragDrop<Box>) {
    const element = event.item.element.nativeElement;
    const { offsetLeft, offsetTop } = element;
    const { x, y } = event.distance;
    const positionX = offsetLeft + x;
    const positionY = offsetTop + y;
    const newX = positionX - 180;
    const newY = positionY - 68 * this.boxes.length;
    const newBox = new Box(event.container.data[event.currentIndex].name, {
      x: newX,
      y: newY,
    });
    console.log('added new box:', newBox);
    this.boxes.push(newBox);
  }

  setPosition() {
    this.boxes[this.boxes.length - 1].position = { x: 0, y: 0 };
  }

  entered(event) {
    console.log('entered', event);
  }

  drawArrow(event: MouseEvent, box: Box) {
    // box.arrow.position();
  }

  editBox(box: Box) {
    console.log('edit:', box);
  }

  applyBox(box: Box) {
    console.log('apply:', box);
  }

  runBox(box: Box) {
    console.log('run:', box);
  }
}
