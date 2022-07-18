## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Итог

- Настроен TypeORM
- Настроен GraphQL
- Создан функционал (Получить задачи / Создать задачу / Обновиться задачу)
- Подключение к Heroku

## Вопросы

- Взаимосвязь между двумя или более моделями [TypeORM С Базовым Руководством По NEST JS](https://codersera.com/blog/typeorm-with-nest-js-tutorial/)
```bash
# tasks.entity.ts
@Entity('task')
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50, nullable: false })
	title: string;

	@OneToMany(() => ToDo, (todo) => todo.task)
  	todos: ToDo[];
}

# todos.entity.ts
@Entity('todos')
export class ToDo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, nullable: false })
	text: string;

	@Column({ default: false })
	isCompleted: boolean;

	@ManyToOne(() => Task, (task) => task.todos)
	task: Task;
}

При данном варианте, создается поле связи, между двумя таблицами, только в самой базе.
Програмно к этому полю обраться не получиться из-за отсутствия в сущности таблицы.
Создавать еще одну дополнительную сущность?!
ссылка выше(TypeORM С Базовым Руководством По NEST JS).
```
- Создание API
```bash
# TypeORM
Создать контроллеры использующие декораторы методов @Get() и т.д., описывая функционал по работе с базой.

# GraphQL
Создать единую точку запросов (http://localhost:3000/graphql), которая будет использовать
инструменты запросов и мутаций над базой.

Как? и нужно ли использовать из под капота GraphQL для декоратовор @Get() и т.д., для получения данных
по механизму маршрутизации (GET /projects — вернуть все проекты с задачами и т.д.)

GraphQL работает с Apollo server, и по логике на back он уже сделать, с единой точкой входа,
то на front просто создается экземпляр Apollo server и идет подключение к этой едитой точки,
после чего делаем query и mutation (ранее описанные в GraphQL).
```