import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { defaultBoxes } from '../mock/testData';
import { Box, Point, Gates } from '../model/box.model';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  constructor(private idGeneratorService: IdGeneratorService) {}

  getBoxes(): Observable<Box[]> {
    const boxes: Box[] = defaultBoxes.map((box) => {
      const { name, position, gates = [] } = box;
      const stepId = this.idGeneratorService.generateId();

      return this.createNewBox(name, position, stepId, gates);
    });

    return of(boxes);
  }

  createNewBox(name: string, position: Point, stepId: string, gates: Gates = []): Box {
    const id = this.idGeneratorService.generateId();

    return new Box(name, position, gates, id, stepId);
  }
}
