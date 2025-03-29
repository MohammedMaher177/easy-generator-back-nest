import { Controller, Post, Get, Body, UseGuards, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { UserDocument } from '../users/schemas/user.schema';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('todos')
@UseGuards()
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Post()
    create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: UserDocument) {
        return this.todosService.create(createTodoDto, String(user._id));
    }

    @Get()
    findAll(@GetUser() user: UserDocument, @Query() query: any) {
        return this.todosService.findAllByUser(String(user._id), query);
    }

    @Get('report')
    report(@GetUser() user: UserDocument) {
        return this.todosService.getTodoReport(String(user._id));
    }

    @Get('generate-random-tasks')
    generateRandomTAsks(@GetUser() user: UserDocument) {
        return this.todosService.bulkCreate(String(user._id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateTodoDto, @GetUser() user: UserDocument) {
        return this.todosService.update(id, user._id.toString(), updateDto);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.todosService.gete(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @GetUser() user: UserDocument) {
        return this.todosService.delete(id, user?._id?.toString());
    }
}
