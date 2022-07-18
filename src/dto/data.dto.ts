import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateTaskDto } from "src/resolvers/tasks/dto/create-task.dto";
import { CreateToDoDto } from "src/resolvers/todos/dto/create-todo.dto";

export class CreateDataDto {
    @ValidateNested()
    @Type(() => CreateTaskDto)
    task: CreateTaskDto;
    
    @ValidateNested()
    @Type(() => CreateToDoDto)
    todos: CreateToDoDto;
}