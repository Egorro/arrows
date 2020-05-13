interface Point {
  readonly x: number;
  readonly y: number;
}

export class Box {
  constructor(public name: string, public position: Point = {x: 0, y: 0}) {}
}
