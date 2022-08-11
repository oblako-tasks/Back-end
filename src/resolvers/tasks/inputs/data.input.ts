import { Field, InputType } from "@nestjs/graphql";
import { ToDoInput } from "src/resolvers/todos/inputs/todo.input";
import { TaskInput } from "./task.input";

@InputType()
export class DataInput {
    @Field()
    readonly task: TaskInput;
    
    @Field()
    readonly todos: ToDoInput;
}