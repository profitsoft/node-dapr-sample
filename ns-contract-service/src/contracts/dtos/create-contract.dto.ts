import { IsString, IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  signDate!: Date;

  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  tenantId!: string;
}
