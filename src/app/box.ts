interface Point {
  readonly x: number;
  readonly y: number;
}

interface Gate {}

export interface InputGate extends Gate {
  name: 'input';
}

export interface OutGate extends Gate {
  name: 'output';
}

export type Gates = Array<InputGate | OutGate>;

export class Box {
  constructor(
    public name: string,
    public position: Point = { x: 0, y: 0 },
    public gates: Gates = []
  ) {}
  dragging: boolean;
  selected: boolean;
  arrows: any[] = [];
  nativeElement?: HTMLElement;
}

export class Task {
  constructor(public name: string, public boxes: Box[]) {}
}
