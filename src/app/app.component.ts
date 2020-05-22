import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Box, Task, Point } from './model/box.model';
import {
  CdkDragDrop,
  CdkDragStart,
  CdkDragEnd,
  CdkDragMove,
} from '@angular/cdk/drag-drop';
import { BoxService } from './services/box.service';
import { TaskService } from './services/task.service';
import { Index } from './model/index.model';
import { Step } from './model/step.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('endArrow') endArrow: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  scale = 1;
  tasks: Task[];
  get boxes(): Box[] {
    return this.steps.reduce((acc, step) => acc.concat(step.boxes), []);
  }
  boxes2: Box[];
  selectedBox: Box;
  connectionState: boolean;
  selectedIndex: Index;
  indexes: Index[];
  steps: Step[];

  constructor(
    private boxService: BoxService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.steps = Array.from({ length: 5 }).map(
      (_, i) => new Step({ xStart: i * 210, xEnd: (i + 1) * 210 })
    );
    console.log(this.steps);
    // this.boxService.getBoxes().subscribe((boxes) => (this.boxes = boxes));
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.taskService.getIndexes().subscribe((indexes) => {
      this.indexes = indexes;
      this.selectedIndex = this.indexes[0];
    });
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
    if (box.dragging) {
      box.dragging = false;
      return;
    }

    console.log('select box:', box);
    const boxElement = (event.target as HTMLElement).closest(
      '.box-element'
    ) as HTMLElement;
    box.nativeElement = boxElement;
    if (this.connectionState) {
      this.connectionBlocks(box);
      return;
    }

    if (this.selectedBox) {
      this.selectedBox.selected = false;
    }
    box.selected = true;
    this.selectedBox = box;
  }

  private connectionBlocks(endBox: Box) {
    const arrow = this.drawArrow(this.selectedBox, endBox);

    this.selectedBox.links.push({ box: endBox, arrow });
    endBox.links.push({ box: this.selectedBox, arrow });

    this.connectionState = false;
    this.selectedBox.selected = false;
  }

  connection() {
    this.connectionState = true;
  }

  private drawArrow(startBox: Box, endBox: Box): any {
    return new LeaderLine(startBox.nativeElement, endBox.nativeElement);
  }

  onCanvasClick(event: MouseEvent) {
    const el = event.target as HTMLElement;
    if (el.classList.contains('canvas')) {
      console.log('unselect boxes');
      this.unselectedBox();
    }
  }

  private unselectedBox() {
    this.selectedBox.selected = false;
  }

  dragStart(event: CdkDragStart) {
    console.log('dragStart:', event);
  }

  movedFromLib(event: CdkDragMove) {
    // console.log(event);
    const element = event.source.element.nativeElement;
    const canvasPoint = this.pointFromLibOnCanvas(event.distance, element);
    // console.log(canvasPoint);
    canvasPoint.x += 50; // hardcode!!!
    this.highlightStep(canvasPoint);
    // const currentStep: Step = this.defineStepWithPosition(canvasPoint);
  }

  deleteBoxFromStep() {

  }

  endedFromLib(event: CdkDragEnd) {
    // console.log('ended from lib:', event);
  }

  private pointFromLibOnCanvas(distance: Point, el: HTMLElement): Point {
    const { offsetLeft, offsetTop } = el;
    const { x, y } = distance;
    const positionX = offsetLeft + x;
    const positionY = offsetTop + y;
    const canvasX = positionX - this.canvas.nativeElement.offsetLeft;
    const canvasY = positionY - this.canvas.nativeElement.offsetTop;
    // console.log({x: canvasX, y: canvasY});
    return {x: canvasX, y: canvasY};
  }

  dropFromLib(event: CdkDragDrop<Box>) {
    console.log('drop from lib:', event);
    // debugger;
    const element = event.item.element.nativeElement;
    const canvasPoint = this.pointFromLibOnCanvas(event.distance, element);
    const currentStep: Step = this.defineStepWithPosition(canvasPoint);

    const point: Point = this.boxPointForStep(currentStep, canvasPoint.y);
    const boxName = event.container.data[event.currentIndex];
    const newBox = this.boxService.createNewBox(boxName, point, null);

    currentStep.boxes.push(newBox);

    console.log('added new box:', newBox);
    // this.boxes.push(newBox);
    console.log(this.steps);
    console.log(JSON.stringify(this.steps));
  }

  movedBox(event: CdkDragMove, box: Box) {
    // console.log('moved:', event, 'box:', box.position);
    const point: Point = {x: box.position.x + event.distance.x, y: box.position.y + event.distance.y};
    console.log(point);
    this.highlightStep(point);
    box.links.forEach(({ arrow }) => arrow.position());
  }

  ended(event: CdkDragEnd, box: Box) {
    const { x: deltaX, y: deltaY } = event.distance;
    const point: Point = { x: box.position.x + deltaX, y: box.position.y + deltaY };
    const currentStep = this.getCurrentStep(point);
    const pointForStep = this.boxPointForStep(currentStep, point.y);
    box.position = pointForStep;
    currentStep.boxes.push(box);
    console.log('event:', event, 'box:', box);
  }

  private highlightStep(point: Point) {
    this.steps.forEach(step => {
      step.highlight = point.x < step.position.xEnd && point.x > step.position.xStart;
    });
  }

  private getCurrentStep(point: Point): Step {
    return this.steps.find(step => {
      step.highlight = point.x < step.position.xEnd && point.x > step.position.xStart;
    });
  }

  drop2(event) {
    console.log('drop2');
  }

  setPosition() {
    this.boxes[this.boxes.length - 1].position = { x: 0, y: 0 };
  }

  deleteBox(event: MouseEvent) {
    console.log(event);
  }

  entered(event) {
    console.log('entered', event);
  }

  enterIntoCanvas(event) {
    console.log(event);
  }

  private defineStepWithPosition(point: Point): Step {
    return this.steps.find((step) => point.x < step.position.xEnd);
  }

  private boxPointForStep(step: Step, y: number): Point {
    const marginLeft = 60;

    return {
      x: step.position.xStart + marginLeft,
      y,
    };
  }

  mouseUp(event) {
    console.log(event);
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

  onDeleteBlock(id: string) {
    const deletedIndex = this.boxes.findIndex((box) => box.id === id);
    console.log('delete box:', this.boxes[deletedIndex]);
    this.boxes[deletedIndex].deleteAllLinks();
    this.boxes.splice(deletedIndex, 1);
  }
}
