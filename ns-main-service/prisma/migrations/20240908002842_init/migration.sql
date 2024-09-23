-- CreateTable
CREATE TABLE "Tenant" (
    "tenantId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("tenantId")
);
