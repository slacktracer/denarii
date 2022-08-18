import { globby } from "globby";
import { promises as fs } from "node:fs";
import { format } from "sql-formatter";

const queryFilesPaths = await globby(["./src/**/*.sql"]);

const l = "postgresql";
const k = "upper";

const sqlFormatterOptions = {
  keywordCase: k,
  language: l,
  tabWidth: 2,
};

const variablesMap = { $count: 0 };

variablesMap.$count = 0;

const placePlaceHoldersReplaceFunction = (
  match,
  parenthesizedCaptureGroup1,
) => {
  variablesMap.$count += 1;

  const key = `PLACEHOLDER_VARIABLE_${variablesMap.$count}`;

  variablesMap[key] = parenthesizedCaptureGroup1;

  return `$ { ${key} }`;
};

const placePlaceholders = ({ query }) => {
  const queryVariableRegex = /\$\{ ?(.+?) ?\}/g;

  return query.replace(queryVariableRegex, placePlaceHoldersReplaceFunction);
};

const placeVariablesBackReplaceFunction = (
  match,
  parenthesizedCaptureGroup1,
) => {
  if (parenthesizedCaptureGroup1 === "$count") {
    throw new Error("Oh, no!");
  }

  return `$\{ ${variablesMap[parenthesizedCaptureGroup1]} }`;
};

const placeVariablesBack = ({ query }) => {
  const placeholderRegex = /\$ \{ (.+?) \}/g;

  return query.replace(placeholderRegex, placeVariablesBackReplaceFunction);
};

const formattingQueries = queryFilesPaths.map(async (queryFilesPath) => {
  const query = await fs.readFile(queryFilesPath, "utf-8");

  const queryWithPlaceholders = placePlaceholders({ query });

  const formattedQueryWithPlaceholders = format(
    queryWithPlaceholders,
    sqlFormatterOptions,
  );

  const uppercasedFormattedQueryWithPlaceholders =
    formattedQueryWithPlaceholders.toUpperCase();

  const uppercasedFormattedQueryWithVariables = placeVariablesBack({
    query: uppercasedFormattedQueryWithPlaceholders,
  });

  return fs.writeFile(
    queryFilesPath,
    uppercasedFormattedQueryWithVariables + "\n",
  );
});

Promise.all(formattingQueries).then(() =>
  console.log("[FORMAT_QUERY_FILES] Done."),
);
