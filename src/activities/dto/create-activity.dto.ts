import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  weeklyFrequency: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ponderosity?: number = 1;
}
