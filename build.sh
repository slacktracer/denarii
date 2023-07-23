#!/usr/bin/env bash
cp -ar ./main/src/. ./build && \
cp -ar ./main/prisma/. ./build/prisma && \
cp ./main/package.json ./build && \
cp ./main/tsconfig.json ./build && \
cp ./main/package-lock.json ./build && \
cd ./build && \
npm ci --omit=dev && \
./node_modules/.bin/tsc --project ./tsconfig.json && \
find ./ -name "*.ts" -type f -delete