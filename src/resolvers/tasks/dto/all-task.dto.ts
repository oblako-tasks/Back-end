import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateToDoDto } from "src/resolvers/todos/dto/create-todo.dto";

@ObjectType()
export class AllDataDto {
    @Field(() => ID)
    id?: number;

    @Field()
    title: string;

    @Field(() => [CreateToDoDto])
    todos: CreateToDoDto[];
}