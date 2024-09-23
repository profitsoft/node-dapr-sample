import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { execSync } from 'node:child_process';

dotenv.config();

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  await prisma.tenant.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
