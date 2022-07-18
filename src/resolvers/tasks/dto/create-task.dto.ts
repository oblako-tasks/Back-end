import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class CreateTaskDto {
    @Field(() => ID)
    id?: number;

    @Field()
    @IsNotEmpty()
    title: string;
}