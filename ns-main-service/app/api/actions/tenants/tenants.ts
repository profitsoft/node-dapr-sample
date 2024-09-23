'use server';
import dbClient from '@/app/api/actions/DbClient';
import logger from '@/lib/logger';
import { z as validator } from 'zod';
import { Tenant } from '@prisma/client';
import { TenantResponse, TenantsResponse } from '@/types/tenant';

const NAME_CHARACTER_MIN_LENGTH: number = 3;

const createTenantShema = validator.object({
  name: validator.string().min(NAME_CHARACTER_MIN_LENGTH),
});

async function getAllTenants(): Promise<TenantsResponse> {
  try {
    const tenants = await dbClient.tenant.findMany();
    return {
      status: 'OK',
      message: '',
      data: tenants,
    };
  } catch (error) {
    logger.error('Error fetching tenants:', error);
    if (error instanceof Error) {
      logger.error('Error creating tenant:', error.message);
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    } else {
      logger.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'An unexpected error occurred',
        data: null,
      };
    }
  } finally {
    await dbClient.$disconnect();
  }
}

async function createTenant(
  data: Omit<Tenant, 'tenantId'>,
): Promise<TenantResponse> {
  try {
    const createTenant = createTenantShema.parse({
      name: data.name,
    });
    const tenant = await dbClient.tenant.create({
      data: createTenant,
    });
    return {
      status: 'OK',
      message: 'Tenant created successfully',
      data: tenant,
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error creating tenant:', error.message);
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    } else {
      logger.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'An unexpected error occurred',
        data: null,
      };
    }
  } finally {
    await dbClient.$disconnect();
  }
}

async function getTenantById(tenantId: number): Promise<TenantResponse> {
  try {
    const tenant = await dbClient.tenant.findUnique({
      where: { tenantId },
    });
    if (tenant) {
      return {
        data: tenant,
        status: 'OK',
        message: '',
      };
    } else {
      return {
        status: 'OK',
        message: 'Tenant not found',
        data: null,
      };
    }
  } catch (error) {
    logger.error('Error fetching tenant:', error);
    if (error instanceof Error) {
      logger.error('Error creating tenant:', error.message);
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    } else {
      logger.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'An unexpected error occurred',
        data: null,
      };
    }
  } finally {
    await dbClient.$disconnect();
  }
}

async function deleteTenant(tenantId: number): Promise<TenantResponse> {
  try {
    const tenant = await dbClient.tenant.delete({
      where: { tenantId },
    });
    return {
      status: 'OK',
      message: 'Tenant deleted successfully',
      data: tenant,
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error deleting tenant:', error.message);
      return {
        status: 'error',
        message: 'error.message',
        data: null,
      };
    } else {
      logger.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'An unexpected error occurred',
        data: null,
      };
    }
  } finally {
    await dbClient.$disconnect();
  }
}

async function updateTenant(
  tenantId: number,
  name: string,
): Promise<TenantResponse> {
  try {
    const updateTenant = createTenantShema.parse({
      name: name,
    });
    const updated = await dbClient.tenant.update({
      where: { tenantId },
      data: updateTenant,
    });
    return {
      status: 'OK',
      message: 'Tenant updated successfully',
      data: updated,
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error updating tenant:', error.message);
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    } else {
      logger.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'An unexpected error occurred',
        data: null,
      };
    }
  } finally {
    await dbClient.$disconnect();
  }
}

export {
  createTenant,
  deleteTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
};
