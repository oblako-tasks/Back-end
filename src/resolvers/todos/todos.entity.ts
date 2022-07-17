import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/tasks.entity";

@Entity('todos')
export class ToDo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, nullable: false })
	text: string;

	@Column({ default: false })
	isCompleted: boolean;

	@Column()
	taskID?: number;

	// @ManyToOne(() => Task, (task) => task.todos)
	// task: Task;
}