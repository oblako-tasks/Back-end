import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './resolvers/tasks/tasks.service';
import { ToDosService } from './resolvers/todos/todos.service';
import { Response } from 'express';
import { CreateDataDto } from './dto/data.dto';
import { CreateToDoDto } from './resolvers/todos/dto/create-todo.dto';

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
        const result = [];
        let tmp = [];

        // map -> filter
        tasks.forEach(task => {
            tmp = [];
            todos.forEach(todo => {
                if(task.id === todo.taskID) {
                    tmp.push(todo);
                }
            });

            result.push({
                "id": task.id,
                "title": task.title,
                "todos": tmp
            });
        });
        
        return result;
    }

    @Patch('/todo/:id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
        @Body() todo: CreateToDoDto
    ) {
        const todos = await this.todosService.updateCheckCompleted(id, todo);

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