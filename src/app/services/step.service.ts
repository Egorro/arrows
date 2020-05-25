import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Step } from '../model/step.model';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private idGeneratorService: IdGeneratorService) { }

  getSteps(): Observable<Step[]> {
    // const steps: Step[] = defaultSteps.
    return of([]);
  }

  createStep(): Step {
    const id = this.idGeneratorService.generateId();
    return new Step([], id);
  }
}
