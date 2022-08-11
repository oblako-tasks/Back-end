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