import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Box, Gates, Task } from './box';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';

const items = [
  'P.EqualWeight',
  'P.FixedWeight',
  'P.FactorChooser',
  'P.VolatilityWeighted',
];

const data = [
  {
    name: 'Universe', boxes: ['U.Fixed Set', 'U.Custom Rules', 'U.Index Committee'],
  },
  {
    name: 'Portfolio Method', boxes: [
      'P.EqualWeight',
      'P.FixedWeight',
      'P.FactorChooser',
      'P.VolatilityWeighted',
    ],
  },
  {
    name: 'Market Data', boxes: ['MD.EOD', 'MD.Fixing'],
  },
  { name: 'Corporate Actions', boxes: ['CA.Dividends', 'CA.Exeptions Rule'] },
  { name: 'Risk Features ', boxes: ['RF.Volatility Control'] },
  {
    name: 'Measurements', boxes: [
      'M.Performance Inst',
      'M.Performance Bsk',
      'M.Total Return',
      'M.LogRet Bsk',
      'M.Realized Volatility',
      'M.Exposure',
      'M.Excess Return',
      'M.Index Level',
      'M.Weights for MX',
      'M.Theo Weight ',
      'M.Effective Weight ',
    ],
  },
];

const boxNames = [
  {
    name: 'P.EqualWeight',
    position: { x: 276, y: 84 },
    gates: [{ name: 'input' }] as Gates,
  },
  {
    name: 'P.FixedWeight',
    position: { x: 130, y: 173 },
    gates: [{ name: 'output' }] as Gates,
  },
  { name: 'P.FactorChooser', position: { x: 451, y: 73 } },
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
  @ViewChild('endArrow') endArrow: ElementRef;
  arrow: any;
  arrow2: any;
  scale = 1;
  items: Box[] = items.map((name) => new Box(name));
  tasks: Task[] = data.map(task => new Task(task.name, task.boxes.map(box => new Box(box))));
  boxes: Box[] = boxNames.map(
    ({ name, position, gates = [] }) => new Box(name, position, gates)
  );
  currentBox: Box;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    const element = this.endArrow.nativeElement;
    const shiftX = event.clientX - element.getBoundingClientRect().left;
    const shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);
    // this.currentBox.arrow.position();

    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  }

  ngAfterViewInit() {}

  fixScale() {
    this.scale = 1;
  }

  onScroll(event) {
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

  startArrow(event: MouseEvent, box: Box) {
    const element = event.target as HTMLElement;
    if (box.dragging || !element.classList.contains('gate')) {
      box.dragging = false;
      return;
    }
    console.log(event);
    const start = element;
    if (box.arrow) {
      box.arrow.remove();
    }
    box.arrow = new LeaderLine(start, this.endArrow.nativeElement);
    this.currentBox = box;
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
