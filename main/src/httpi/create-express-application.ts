import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import packageJson from "../../package.json" with { type: "json" };
import { db, redisClient } from "../persistence/connect.js";
import { print } from "./objects/print.js";

const build = packageJson.version.split("-build.")[1];

export const createExpressApplication = async () => {
  if (!process.env.PORT) {
    print.error("NO_PORT");

    process.exit(1);
  }

  const healthCheckEndpoint = process.env.HEALTH_CHECK_ENDPOINT;
  const port = Number(process.env.PORT);

  const expressApplication = express();

  const corsOptions = {
    credentials: true,
    origin: process.env.ORIGIN?.split(","),
  };

  expressApplication.use(cookieParser());
  expressApplication.use(helmet());
  expressApplication.use(cors({ ...corsOptions }));
  expressApplication.use(express.json());

  try {
    if (process.env.NODE_ENV !== "test") {
      await new Promise((resolve) => {
        expressApplication.listen(port, resolve);
      });
    }

    expressApplication.get(healthCheckEndpoint, async (request, response) => {
      let database = false;
      let redis = false;

      try {
        await db.$queryRaw`SELECT 1`;
        database = true;
      } catch {}

      try {
        await redisClient.ping();
        redis = true;
      } catch {}

      response.json({ build, database, redis });
    });

    print.info(`Server listening on port ${port}`);
    print.info(`Health checks available at ${healthCheckEndpoint}`);

    return expressApplication;
  } catch (error) {
    print.error(error);
  }
};
