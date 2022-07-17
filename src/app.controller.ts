import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './resolvers/tasks/tasks.service';
import { ToDosService } from './resolvers/todos/todos.service';
import { Response } from 'express';
import { CreateDataDto } from './dto/data.dto';

@Controller('projects')
export class AppController {
    constructor (
        private tasksService: TasksService,
        private todosService: ToDosService,
    ) {}
    
    @Get('')
    async tasks() {
        const tasks = await this.tasksService.getTasks();
        const todos = await this.todosService.getToDos();

        const result = {
            "tasks": [...tasks],
            "todos": [...todos],
        };

        return result;
    }

    @Put('/todo/:id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const todos = await this.todosService.updateCheckCompleted(id);

        if (todos) {
            res.send({
                "todo": todos,
            });
        } else {
            res.status(400).send({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Todo not found!',
            });
        }
    }

    @Post('todos')
    @UsePipes(ValidationPipe)
    async createData(
        @Res() res: Response,
        @Body() createData: CreateDataDto,
    ) {
        const { task, todos } = createData;
        const createdTask = await this.tasksService.saveTask(task);
        const createdTodo =  await this.todosService.saveToDo({...todos, taskID: createdTask.id});

        const result = {
            "task": createdTask,
            "todo": createdTodo
        };
        
        res.send(result);
    }
}