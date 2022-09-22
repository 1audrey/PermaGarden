import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TasksService } from '../services/tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AllTaskResolverService {

  constructor(private taskService: TasksService) { }

  resolve(){
    return this.taskService.getAllTasks().pipe(map(tasks => tasks));

  }
}

