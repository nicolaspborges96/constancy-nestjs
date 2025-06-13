import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFrequencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(['daily', 'weekly', 'monthly'])
  unit: 'daily' | 'weekly' | 'monthly';

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  times: number;
}
