import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export enum Action {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete"
}

export class ContractData {
  @IsEnum(Action)
  action: Action;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  tenantId: number;

  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(action: Action, clientId: number, tenantId: number, id: string) {
    this.action = action;
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.id = id;
  }
}

export class Message {
  @IsString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  messageId: string;

  constructor(data: string, messageId: string) {
    this.data = data;
    this.messageId = messageId;
  }
}

export class ContractEvent {
  message: Message;

  constructor(message: Message) {
    this.message = message;
  }
}