import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create(createTaskDto as any);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const task = await this.findOne(id);
    await task.update(updateTaskDto);
    return task;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }
}
