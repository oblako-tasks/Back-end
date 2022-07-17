import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ToDo } from "../todos/todos.entity";

@Entity('task')
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50, nullable: false })
	title: string;

	// @OneToMany(() => ToDo, (todo) => todo.task)
  	// todos: ToDo[];
}