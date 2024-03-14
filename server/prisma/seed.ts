import { PrismaClient } from "@prisma/client";
import createSuperAdmin from "./seeders/superadmin";

const prisma = new PrismaClient();

const main = async () => {
  await createSuperAdmin(prisma);
  // await createMockLessons(prisma);

  // ... other seeders
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
