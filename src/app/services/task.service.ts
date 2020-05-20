import { Injectable } from '@angular/core';
import { data, indexes } from '../testData';
import { Task } from '../model/box';
import { Observable, of } from 'rxjs';
import { Index } from '../model/index.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = data.map((task) => new Task(task.name, task.boxes));
    return of(tasks);
  }

  getIndexes(): Observable<Index[]> {
    return of(indexes);
  }
}
