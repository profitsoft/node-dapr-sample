import { Injectable } from "@nestjs/common";
import { TenantEntity } from "./tenant.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(TenantEntity)
        private readonly tenantRepository: Repository<TenantEntity>,
    ) { }
    async findAll(): Promise<TenantEntity[]> {
        return await this.tenantRepository.find();
    }
}