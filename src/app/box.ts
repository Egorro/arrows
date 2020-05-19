interface Point {
  readonly x: number;
  readonly y: number;
}

export interface BoxLink {
  box: Box;
  arrow: any;
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
  links: BoxLink[] = [];

  deleteLinkWithLink(link: BoxLink) {
    link.box.deleteLinkWithBox(this);
    link.arrow.remove();
    const index = this.links.indexOf(link);
    this.links.splice(index, 1);
  }

  deleteLinkWithBox(box: Box) {
    const index = this.links.findIndex(link => link.box === box);
    this.links.splice(index, 1);
  }
}

export class Task {
  constructor(public name: string, public boxes: Box[]) {}
}
