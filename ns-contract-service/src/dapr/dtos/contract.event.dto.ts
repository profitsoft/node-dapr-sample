import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
export enum Action {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete"
}
export class ContractEvent {
  @IsEnum(Action)
  @IsNotEmpty()
  action!: Action;

  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @IsNumber()
  @IsNotEmpty()
  tenantId!: number;
}
