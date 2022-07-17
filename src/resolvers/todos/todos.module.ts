import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './todos.entity';
import { ToDosResolver } from './todos.resolver';
import { ToDosService } from './todos.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ ToDo ]) ],
	providers: [ ToDosService, ToDosResolver ],
    exports: [ ToDosService ],
})

export class ToDoModule {}