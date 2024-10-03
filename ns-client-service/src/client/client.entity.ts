import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name!: string

  @Column()
  address?: string

  @Column()
  tenantId!: number
}