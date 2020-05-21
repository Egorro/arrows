import { Box } from './box.model';

export class Step {
  constructor(
    public position: { xStart: number; xEnd: number },
    public boxes: Box[] = []
  ) {}
  highlight: boolean;
}
