cp --recursive ../main/prisma ./prisma && \
docker compose up -d && \
prisma migrate dev --name init --schema ../tests/prisma/schema.prisma && \
prisma generate --schema ../tests/prisma/schema.prisma && \
vitest --config ./vitest.config.integration.ts && \
docker stop tests-db-1 && \
rm -fr ./prisma
