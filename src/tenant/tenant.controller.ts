import { Controller, Get } from "@nestjs/common";
import { TenantService } from "./tenant.service";

@Controller('/api/tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    findAll(): string[] {
        return this.tenantService.findAll();
    }
}