import { Box } from './box.model';

export class Step {
  constructor(public boxes: Box[] = [], public id: string, public width = 210) {}
  highlight: boolean;
  position: { xStart: number; xEnd: number };

  addBox(box: Box) {
    box.stepId = this.id;
    this.boxes.push(box);
  }

  deleteBox(box: Box) {
    box.deleteAllLinks();
    this.boxes = this.boxes.filter((stepBox) => stepBox.id !== box.id);
  }

  setPosition(index: number) {
    const xStart = index * this.width;
    const xEnd = (index + 1) * this.width;
    this.position = {
      xStart,
      xEnd,
    };
  }
}
