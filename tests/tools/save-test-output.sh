cp --recursive ../main/prisma ./prisma && \
docker compose up -d && \
prisma migrate dev --name init --schema ../tests/prisma/schema.prisma && \
prisma generate --schema ../tests/prisma/schema.prisma && \
vitest run --config ./vitest.config.integration.ts --no-color --reporter verbose --silent > test-output.txt && \
docker stop tests-db-1 && \
rm -fr ./prisma
