import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  address?: string;

  @Column()
  tenantId!: number;

  @Column({ nullable: true, default: 0 })
  contractCount?: number;
}
