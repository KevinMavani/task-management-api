import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
   ) { }

  async getTasks(page: number, limit: number) {
    const totalCount = await this.taskModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const tasks = await this.taskModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: tasks,
      page,
      limit,
      totalItems: totalCount,
      totalPages,
      message: 'Task list fetched successfully'
    };
  }


  async addTask(task: TaskDto) {
    try {
      const data = new this.taskModel(task);
      await data.save();
      return {
        data,
        status: HttpStatus.CREATED,
        message: 'Task created successfully'
      }
    } catch {
      throw new BadRequestException()
    }
  }

  async getTaskById(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException();
    }
    return {
      data: task,
      message: 'Task detail fetched successfully',
      status: HttpStatus.OK
    };
  }

  async updateTask(id: string, task: TaskDto) {
    await this.taskModel.findByIdAndUpdate(id, task).exec();
    return {
      message: 'Task updated successfully',
      data: [],
      status: HttpStatus.OK
    }
  }

  async removeTask(id: string) {
    await this.taskModel.findByIdAndDelete(id).exec();
    return {
      message: 'Task deleted successfully',
      data: [],
      status: HttpStatus.OK
    }
  }
}
