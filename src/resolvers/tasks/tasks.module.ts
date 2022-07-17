import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ Task ]) ],
	providers: [ TasksService, TasksResolver ],
	exports: [ TasksService ],
})

export class TaskModule {}