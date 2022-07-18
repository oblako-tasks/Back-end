import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInput } from './inputs/task.input';
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
	constructor (@InjectRepository(Task) private readonly TaskRepository: Repository<Task>) {}

	async getTasks(): Promise<Task[]> {
		return await this.TaskRepository.find();
	}

	async saveTask(data: TaskInput): Promise<Task> {
		const task = new Task();
        task.title = data.title;

        await this.TaskRepository.save(task);

        return task;
	}
}