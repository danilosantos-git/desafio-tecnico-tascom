import { IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  description: string;
}
