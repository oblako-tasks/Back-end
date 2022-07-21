## DEMO
[https://oblako-tasks-back-end.herokuapp.com/projects](https://oblako-tasks-back-end.herokuapp.com/projects)

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

- Инициализация NestJS-приложения и залито на Heroku
- Создан API для списка задач
- Настроен TypeORM
- Настроен GraphQL

## Вопросы

- Взаимосвязь между двумя или более моделями [TypeORM С Базовым Руководством По NEST JS](https://codersera.com/blog/typeorm-with-nest-js-tutorial/)
```bash
При данном варианте, создается поле связи, между двумя таблицами, только в самой базе.
Програмно к этому полю обраться не получиться из-за отсутствия в сущности таблицы.
Создавать еще одну дополнительную сущность, в которой храняться ключи?!
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
