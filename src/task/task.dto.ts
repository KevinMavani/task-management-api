import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

export enum STATUS  {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ValidateIf((o) => o.hasOwnProperty('title'))
  title: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.hasOwnProperty('description'))
  description: string;

  @IsEnum(STATUS)
  @ValidateIf((o) => o.hasOwnProperty('status'))
  status: string;
}