import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, IsArray } from 'class-validator';
import { TodoPriority } from '../../common/enums/todo-priority.enum';

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsEnum(TodoPriority)
    priority?: TodoPriority;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
