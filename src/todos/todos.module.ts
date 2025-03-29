import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { ApiMongooseFeaturesModule } from 'src/api-features/api-mongoose-features.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]), ApiMongooseFeaturesModule],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule { }
