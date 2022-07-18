import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty } from "class-validator";

@ObjectType()
export class CreateToDoDto {
    @Field(() => ID)
    id?: number;

    @Field()
    @IsNotEmpty()
    text: string;

    @Field()
    @IsBoolean()
    isCompleted: boolean;

    @Field()
    taskID?: number;
}