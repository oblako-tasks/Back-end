import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ToDoInput {
  @Field(() => ID, { nullable: true })
  readonly id?: number;

  @Field()
  readonly text: string;

  @Field()
  readonly isCompleted: boolean;

  @Field(() => Int, { nullable: true })
  readonly taskID?: number;
}