import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientEntity extends EntitySchema{

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  address!: string

  @Column()
  tenantId!: number
}