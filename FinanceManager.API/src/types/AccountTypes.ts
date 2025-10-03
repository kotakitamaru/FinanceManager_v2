import { IsNumber, IsString, IsDate, IsOptional, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class Account {
  @IsNumber()
  id!: number;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  icon!: string;

  @IsString()
  color!: string;

  @IsDate()
  createDate!: Date;

  @IsDate()
  updateDate!: Date;
}

export class CreateAccountRequest {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  icon!: string;

  @IsString()
  color!: string;
}

export class UpdateAccountRequest {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class AccountResponse {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsString()
  title!: string;

  @Expose()
  @IsString()
  icon!: string;

  @Expose()
  @IsString()
  color!: string;

  @Expose()
  @IsNumber()
  balance!: number;

  @Expose()
  @IsDate()
  createDate!: Date;

  @Expose()
  @IsDate()
  updateDate!: Date;
}
