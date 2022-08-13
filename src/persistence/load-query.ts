import pgp from "pg-promise";
import { URL } from "url";

const { QueryFile } = pgp;

export const loadQuery = ({ base, url }) => {
  const { pathname } = new URL(url, base);

  const queryFile = new QueryFile(pathname);

  return queryFile;
};
