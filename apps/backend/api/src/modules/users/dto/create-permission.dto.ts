import { IsString, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  module?: string;
}