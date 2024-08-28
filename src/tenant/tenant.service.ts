import { Injectable } from "@nestjs/common";

@Injectable()
export class TenantService {
    findAll(): string[] {
        return ['tenant1', 'tenant2', 'tenant3'];
    }
}