import { IsString, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from "class-transformer";

export class ContractDto {
  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  signDate!: Date;

  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @IsNumber()
  @IsNotEmpty()
  tenantId!: number;
}
