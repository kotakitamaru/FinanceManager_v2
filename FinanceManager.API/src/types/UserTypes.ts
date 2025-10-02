import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class User {
  @IsNumber()
  id!: number;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @Exclude()
  password!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

export class CreateUserRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class UpdateUserRequest {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}

export class UserResponse {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsDate()
  createdAt!: Date;

  @Expose()
  @IsDate()
  updatedAt!: Date;
}

export class UserLoginRequest {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class UserLoginResponse {
  @Expose()
  @Type(() => UserResponse)
  user!: UserResponse;

  @Expose()
  @IsString()
  token!: string;
}
