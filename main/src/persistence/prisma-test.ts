import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const operations = await prisma.operation.findMany({
    include: { account: true, user: true },
    take: 10,
  });

  console.dir(operations, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
