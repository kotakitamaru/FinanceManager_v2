import { IsNumber, IsString, IsIn, IsDate, IsOptional, IsPositive, MinLength } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class Transaction {
  @IsNumber()
  id!: number;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  @MinLength(1)
  note!: string;

  @IsDate()
  date!: Date;

  @IsNumber()
  categoryId!: number;

  @IsNumber()
  accountId!: number;

  @IsDate()
  createDate!: Date;

  @IsDate()
  updateDate!: Date;
}

export class CreateTransactionRequest {
  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  @MinLength(1)
  note!: string;

  @IsDate()
  date!: Date;

  @IsNumber()
  categoryId!: number;

  @IsNumber()
  accountId!: number;
}

export class UpdateTransactionRequest {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  note?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  accountId?: number;
}

export class TransactionResponse {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsNumber()
  amount!: number;

  @Expose()
  @IsString()
  note!: string;

  @Expose()
  @IsDate()
  date!: Date;

  @Expose()
  @IsNumber()
  categoryId!: number;

  @Expose()
  @IsNumber()
  accountId!: number;

  @Expose()
  @IsDate()
  createDate!: Date;

  @Expose()
  @IsDate()
  updateDate!: Date;

  @Expose()
  @IsOptional()
  category?: {
    id: number;
    title: string;
    icon: string;
    color: string;
    isIncome: boolean;
  };

  @Expose()
  @IsOptional()
  account?: {
    id: number;
    title: string;
    icon: string;
    color: string;
  };
}

export class TransactionFilters {
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  accountId?: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
