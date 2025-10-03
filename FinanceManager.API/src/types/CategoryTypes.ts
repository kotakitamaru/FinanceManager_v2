import { IsNumber, IsString, IsIn, IsDate, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

export class Category {
  @IsNumber()
  id!: number;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  icon!: string;

  @IsBoolean()
  isIncome!: boolean;

  @IsString()
  color!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

export class CreateCategoryRequest {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  icon!: string;

  @IsBoolean()
  isIncome!: boolean;

  @IsString()
  color!: string;
}

export class UpdateCategoryRequest {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  isIncome?: boolean;

  @IsOptional()
  @IsString()
  color?: string;
}

export class CategoryResponse {
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
  @IsBoolean()
  isIncome!: boolean;

  @Expose()
  @IsString()
  color!: string;

  @Expose()
  @IsNumber()
  amount!: number;

  @Expose()
  @IsDate()
  createdAt!: Date;

  @Expose()
  @IsDate()
  updatedAt!: Date;
}
