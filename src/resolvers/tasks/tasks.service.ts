import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDosService } from '../todos/todos.service';
import { AllDataDto } from './dto/all-task.dto';
import { DataInput } from './inputs/data.input';
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

	async getAllData(): Promise<AllDataDto[]> {
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

	async saveTaskName(data: TaskInput): Promise<Task> {
		const task = new Task();
        task.title = data.title;

        await this.TaskRepository.save(task);

        return task;
	}

	async saveTask(createData: DataInput): Promise<any> {
		const existsTask = await this.getTask(createData.task.title);
        const { task, todos } = createData;

        if (existsTask) {
            const createdTodo =  await this.todosService.saveToDo({...todos, taskID: existsTask.id});
            
            const result = {
                "id": existsTask.id,
                "title": existsTask.title,
                "todos": [createdTodo],
            };
            return result;
        } else {
            const createdTask = await this.saveTaskName(task);
            const createdTodo =  await this.todosService.saveToDo({...todos, taskID: createdTask.id});

            const result = {
                "id": createdTask.id,
                "title": createdTask.title,
                "todos": [createdTodo],
            };
            
            return result;
        }
	}
}