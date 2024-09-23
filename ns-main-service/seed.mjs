import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.tenant.createMany({
    data: [
      { name: 'Tenant 1' },
      { name: 'Tenant 2' },
    ],
  });

  console.log('Seed data added');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });