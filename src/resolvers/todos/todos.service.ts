import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoInput } from './inputs/todo.input';
import { ToDo } from './todos.entity';

@Injectable()
export class ToDosService {
	constructor (@InjectRepository(ToDo) private readonly ToDoRepository: Repository<ToDo>) {}

	async getToDos(): Promise<ToDo[]> {
		return await this.ToDoRepository.find();
	}
	
	async saveToDo(data: ToDoInput): Promise<ToDo> {
		const todo = new ToDo();
        todo.text = data.text;
        todo.isCompleted = data.isCompleted;
		todo.taskID = data.taskID;

        await this.ToDoRepository.save(todo);

        return todo;
	}
	
	async updateCheckCompleted(todoID: number) {
		const todo = await this.ToDoRepository.findOne({where: {id: todoID}});

		if (todo) {
			const updTodo = {...todo, isCompleted: !(await todo).isCompleted};

			await this.ToDoRepository.update(todoID, updTodo);

			return updTodo;
		}
	}
}