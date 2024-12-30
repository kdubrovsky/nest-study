import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchBookDto {
  @IsOptional()
  text?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearTo?: number;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortBy?: 'asc' | 'desc';
}
