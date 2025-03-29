import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ApiMongooseFeaturesDto {
    @IsOptional()
    search?: string;

    @IsOptional()
    sort?: string;

    @IsOptional()
    filters?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}
