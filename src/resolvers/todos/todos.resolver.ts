import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { Task } from '../tasks/tasks.entity';
import { CreateToDoDto } from './dto/create-todo.dto';
import { ToDoInput } from './inputs/todo.input';
import { ToDo } from './todos.entity';
import { ToDosService } from './todos.service';

@Resolver((of) => ToDo)
export class ToDosResolver {
	constructor (private readonly todosService: ToDosService) {}

	@Query(() => [ CreateToDoDto ])
	async todos () {
		return this.todosService.getToDos();
	}

	@Mutation(() => CreateToDoDto)
	async createToDo(@Args('todo') todo: ToDoInput) {
		return this.todosService.saveToDo(todo);
	}

	// @Mutation(() => CreateToDoDto)
	// async changeCheckCompleted(@Args('todoID') todoID: number) {
	// 	return this.todosService.updateCheckCompleted(todoID);
	// }
}