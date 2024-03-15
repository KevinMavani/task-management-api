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
    return this.taskService.getTasks();
  }

  @Get(':id') 
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post() 
  createTask(@Body() createTaskDto: TaskDto) {
    return this.taskService.addTask(createTaskDto);
  }

  @Put(':id') 
  updateTask(@Param('id') id: string, @Body() createTaskDto: TaskDto) {
    return this.taskService.updateTask(id, createTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);                          
  }
}
