import { IsNumber, Max, Min, MinLength } from 'class-validator';

export class UpdateBookDto {
  @MinLength(2)
  title?: string;

  @MinLength(2)
  author?: string;

  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  year?: number;
}
