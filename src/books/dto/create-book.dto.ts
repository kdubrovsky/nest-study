import { IsNotEmpty, IsNumber, Max, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  year: number;
}
