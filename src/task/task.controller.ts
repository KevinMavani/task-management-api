import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { HttpExceptionFilter } from './http.exception-filter';

@Controller('task')
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}

  @Get()
  getTasks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.taskService.getTasks(page, limit);
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
  @UseFilters(HttpExceptionFilter)
  updateTask(@Param('id') id: string, @Body() createTaskDto: TaskDto) {
    return this.taskService.updateTask(id, createTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);                          
  }
}
