import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  number!: string;

  @Column()
  signDate!: Date;

  @Column()
  clientId!: number;

  @Column()
  tenantId!: number;
}
