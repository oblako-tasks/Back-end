import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './resolvers/tasks/tasks.service';
import { ToDosService } from './resolvers/todos/todos.service';
import { Response } from 'express';
import { CreateDataDto } from './resolvers/tasks/dto/data.dto';
import { CreateToDoDto } from './resolvers/todos/dto/create-todo.dto';

@Controller('projects')
export class AppController {
    constructor (
        private tasksService: TasksService,
        private todosService: ToDosService,
    ) {}
    
    @Get('')
    async tasks() {
        return this.tasksService.getAllData();
    }

    @Patch('/todo/:id')
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
        res.send(await this.tasksService.saveTask(createData));
    }
}