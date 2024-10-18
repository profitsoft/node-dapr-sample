import { IsNotEmpty, IsString } from 'class-validator';

export class ClientCreateDto {

  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  readonly address?: string;
}