import prettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["src/**/*.js", "src/**/*.js.map"] },
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      boundaries,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      "boundaries/elements": [
        { type: "domain", pattern: "src/domain", mode: "folder" },
        { type: "persistence", pattern: "src/persistence", mode: "folder" },
        { type: "httpi", pattern: "src/httpi", mode: "folder" },
      ],
      "boundaries/dependency-nodes": ["import", "dynamic-import", "export"],
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "domain" },
              allow: {
                to: {
                  type: "persistence",
                  internalPath: "persistence.{ts,js}",
                },
              },
            },
            {
              from: { type: "httpi" },
              allow: {
                to: { type: "domain", internalPath: "domain.{ts,js}" },
              },
            },
            {
              from: {
                type: "httpi",
                internalPath: "create-express-application.{ts,js}",
              },
              allow: {
                to: {
                  type: "persistence",
                  internalPath: "connect.{ts,js}",
                },
              },
            },
            {
              from: {
                type: "httpi",
                internalPath: "session-store.{ts,js}",
              },
              allow: {
                to: {
                  type: "persistence",
                  internalPath: "connect.{ts,js}",
                },
              },
            },
          ],
        },
      ],
    },
  },
);
