import { Tenant } from '@prisma/client';

type TenantsResponse = {
  data: Tenant[] | null,
  status: string,
  message: string,
}

type TenantResponse = {
  data: Tenant | null,
  status: string,
  message: string,
}