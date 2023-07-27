cp --recursive ../main/prisma ./prisma && \
prisma migrate dev --name init --schema ../tests/prisma/schema.prisma && \
prisma generate --schema ../tests/prisma/schema.prisma && \
vitest run --config ./vitest.config.integration.ts && \
rm -fr ./prisma
