import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum STATUS  {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(STATUS)
  status: string;
}