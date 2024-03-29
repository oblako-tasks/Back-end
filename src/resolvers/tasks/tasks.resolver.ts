import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { AllDataDto } from './dto/all-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataInput } from './inputs/data.input';
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

	@Query(() => [ AllDataDto ])
	async allData () {
		return this.tasksService.getAllData();
	}

	@Mutation(() => CreateTaskDto)
	async createTaskName(@Args('task') task: TaskInput) {
		return this.tasksService.saveTaskName(task);
	}

	@Mutation(() => AllDataDto)
	async createTask(@Args('data') data: DataInput) {
		return this.tasksService.saveTask(data);
	}
}