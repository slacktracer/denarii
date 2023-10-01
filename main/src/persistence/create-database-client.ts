import { Prisma, PrismaClient } from "@prisma/client";

export const createDatabaseClient = () =>
  new PrismaClient({ errorFormat: "pretty" }).$extends({
    model: {
      $allModels: {
        async exists<T>(
          this: T,
          where: Prisma.Args<T, "findFirst">["where"],
        ): Promise<boolean> {
          const context = Prisma.getExtensionContext(this);

          const result: unknown | null = await (
            context as unknown as {
              findFirst: (
                criteria: Record<string, unknown>,
              ) => Promise<unknown | null>;
            }
          ).findFirst({ where });

          return result !== null;
        },
      },
    },
  });
