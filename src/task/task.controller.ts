import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}

  @Get()
  getTasks() {
    return this.taskService.tasks;
  }

  @Get(':id') 
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = this.taskService.getTaskById(id);
    if (!task) {
      return { message: 'Task not found' };
    }
    return task;
  }

  @Post() 
  createTask(@Body() createTaskDto: TaskDto) {
    this.taskService.addTask(createTaskDto);
    return { message: 'Task created successfully' };
  }

  @Put(':id') 
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() createTaskDto: TaskDto) {
    this.taskService.updateTask(id, createTaskDto);
    return { message: 'Task updated successfully' };
  }

  @Delete(':id')
  removeTask(@Param() id: number) {
    this.taskService.removeTask(id);                          
    return { message: 'Task deleted successfully' };
  }
}
