import { PrismaClient } from '@prisma/client'

// ini adalah singleton agar tidak buat instance prisma terus  
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
// import prisma ini untuk dipake di seluruh app
const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;