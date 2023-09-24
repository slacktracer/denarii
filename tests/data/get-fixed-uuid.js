import { faker } from "@faker-js/faker";

faker.seed(1981);

export const getFixedUUID = () => faker.string.uuid();
