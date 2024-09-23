import { prisma } from '@/jest.setup';
import {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} from '@/app/api/actions/tenants/tenants';
import { TenantResponse } from '@/types/tenant';

describe('Tenant API', () => {
  let tenantId: number | undefined;

  beforeAll(async () => {
    await prisma.tenant.deleteMany();
  });

  test('should create a tenant', async () => {
    const response: TenantResponse = await createTenant({
      name: 'Test Tenant',
    });
    expect(response.status).toBe('OK');
    expect(response.data).toBeDefined();
    tenantId = response.data?.tenantId;
    expect(typeof tenantId).toBe('number');
  });

  test('should get all tenants', async () => {
    const response = await getAllTenants();
    expect(response.status).toBe('OK');
    expect(response.data).toHaveLength(1);
  });

  test('should get tenant by ID', async () => {
    if (tenantId === undefined) throw new Error('Tenant ID is undefined');
    const response = await getTenantById(tenantId);
    expect(response.status).toBe('OK');
    expect(response.data).toBeDefined();
  });

  test('should update a tenant', async () => {
    if (tenantId === undefined) throw new Error('Tenant ID is undefined');
    const updatedName: string = 'Updated Tenant';
    const response = await updateTenant(tenantId, updatedName);
    expect(response.status).toBe('OK');
    expect(response.data?.name).toBe(updatedName);
  });

  test('should delete a tenant', async () => {
    if (tenantId === undefined) throw new Error('Tenant ID is undefined');
    const response = await deleteTenant(tenantId);
    expect(response.status).toBe('OK');
    expect(response.data).toBeDefined();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
