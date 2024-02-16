import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

enum STATUS  {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class TaskDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(STATUS)
  status: string;
}