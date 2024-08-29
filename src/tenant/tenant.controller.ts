import { Controller, Get } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { TenantEntity } from "./tenant.entity";

@Controller('/api/tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    async findAll(): Promise<TenantEntity[]> {
        return await this.tenantService.findAll();
    }
}