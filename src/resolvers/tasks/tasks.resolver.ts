import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskInput } from './inputs/task.input';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';


@Resolver((of) => Task)
export class TasksResolver {
	constructor (private readonly tasksService: TasksService) {}

	@Query(() => [ CreateTaskDto ])
	async tasks () {
		return this.tasksService.getTasks();
	}

	@Mutation(() => CreateTaskDto)
	async createTask(@Args('task') task: TaskInput) {
		return this.tasksService.saveTask(task);
	}
}