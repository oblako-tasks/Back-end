import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TaskModule } from './resolvers/tasks/tasks.module';
import { ToDoModule } from './resolvers/todos/todos.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DATABASE || 'project',
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false } || false,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TaskModule,
    ToDoModule,
  ],
  controllers: [ AppController ],
  providers: [],
})

export class AppModule {}