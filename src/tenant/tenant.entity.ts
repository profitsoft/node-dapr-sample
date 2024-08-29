import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( {name: 'tenants'} )
export class TenantEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}