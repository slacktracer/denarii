#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/set-env-vars.sh

docker-compose up -d

echo '🟡 - Waiting for database to be ready...'

$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

prisma migrate dev --schema ../main/prisma/schema.prisma --name init

prisma generate

if [ "$#" -eq  "0" ]
  then
    vitest -c ./vitest.config.integration.ts
else
  vitest -c ./vitest.config.integration.ts --ui
fi
