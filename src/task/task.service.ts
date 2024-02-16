import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  tasks: TaskDto[] = [];

  addTask(task: TaskDto) {
    this.tasks.push(task);
  }

  getTaskById(id: number) {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  updateTask(id: number, task: TaskDto) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index] = task;
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
