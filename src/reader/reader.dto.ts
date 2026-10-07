import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReaderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}

export class UpdateReaderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
