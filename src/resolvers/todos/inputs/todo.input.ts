import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class ToDoInput {
  @Field(() => ID, { nullable: true })
  readonly id?: number;

  @Field()
  readonly text: string;

  @Field()
  readonly isCompleted: boolean;

  @Field()
  readonly taskID?: number;
}