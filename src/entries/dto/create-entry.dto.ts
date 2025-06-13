import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  @IsDateString()
  completionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  activityId: string;
}
