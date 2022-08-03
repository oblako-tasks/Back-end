import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDosService } from '../todos/todos.service';
import { TaskInput } from './inputs/task.input';
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
	constructor (
		@InjectRepository(Task) private readonly TaskRepository: Repository<Task>,
		private todosService: ToDosService
	) {}

	async getTask(title: string): Promise<Task> {
		return await this.TaskRepository.findOne({where: {title: title}});
	}

	async getTasks(): Promise<Task[]> {
		return await this.TaskRepository.find();
	}

	async getAllData(): Promise<any[]> {
		const tasks = await this.getTasks();
        const todos = await this.todosService.getToDos();
        let result = [];

        result = tasks.map(task => {
            return {
                "id": task.id,
                "title": task.title,
                "todos": todos.filter(todo => {
                    return todo.taskID == task.id;
                })
            }
        })

        return result;
	}

	async saveTask(data: TaskInput): Promise<Task> {
		const task = new Task();
        task.title = data.title;

        await this.TaskRepository.save(task);

        return task;
	}
}