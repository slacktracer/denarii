import cors from "cors";
import express from "express";
import helmet from "helmet";

export const createExpressApplication = async () => {
  if (!process.env.PORT) {
    console.error("NO_PORT");

    process.exit(1);
  }

  const healthCheckEndpoint = process.env.HEALTH_CHECK_ENDPOINT;
  const port = Number(process.env.PORT);

  const expressApplication = express();

  expressApplication.use(helmet());
  expressApplication.use(cors());
  expressApplication.use(express.json());

  try {
    await new Promise((resolve) => {
      expressApplication.listen(port, resolve);
    });

    expressApplication.get(healthCheckEndpoint, (request, response) =>
      response.json({ healthy: true }),
    );

    console.log(`Server listening on port ${port}`);
    console.log(`Health checks available at ${healthCheckEndpoint}`);

    return expressApplication;
  } catch (error) {
    console.error(error);
  }
};
