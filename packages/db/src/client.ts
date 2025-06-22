import { PrismaClient } from "@prisma/client";

declare global {
  var __dbClient: PrismaClient;
}

export const prisma =
  global.__dbClient ||
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = prisma;
}
