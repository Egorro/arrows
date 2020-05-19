import { Injectable } from '@angular/core';
import { data } from '../testData';
import { Task } from '../box';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = data.map((task) => new Task(task.name, task.boxes));
    return of(tasks);
  }
}
