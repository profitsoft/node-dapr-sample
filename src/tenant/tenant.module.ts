import { Module } from "@nestjs/common";
import { TenantController } from "@app/tenant/tenant.controller";
import { TenantService } from "@app/tenant/tenant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantEntity } from "@app/tenant/tenant.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TenantEntity])],
    controllers: [TenantController],
    providers: [TenantService],
})
export class TenantModule { }