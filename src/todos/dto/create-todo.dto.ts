import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { TodoPriority } from 'src/common/enums';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

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
