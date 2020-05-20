
export interface Point {
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
    public gates: Gates = [],
    public id: string,
  ) {}
  dragging: boolean;
  selected: boolean;
  private arrows: any[] = [];
  nativeElement?: HTMLElement;
  links: BoxLink[] = [];

  deleteLinkWithLink(link: BoxLink) {
    link.box.deleteLinkWithId(this.id);
    link.arrow.remove();

    const index = this.links.indexOf(link);
    this.links.splice(index, 1);
  }

  deleteLinkWithId(id: string) {
    const index = this.links.findIndex(link => link.box.id === id);

    this.links.splice(index, 1);
  }

  deleteAllLinks() {
    while (this.links.length) {
      this.deleteLinkWithLink(this.links[0]);
    }
  }
}

export class Task {
  constructor(public name: string, public boxNames: string[]) {}
}
