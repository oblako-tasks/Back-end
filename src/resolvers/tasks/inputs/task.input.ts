import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TaskInput {
  @Field(() => ID, { nullable: true })
  readonly id?: number;

  @Field()
  readonly title: string;
}