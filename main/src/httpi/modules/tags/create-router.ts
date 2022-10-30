import express from "express";

import { deleteTagKeyByID } from "./route-handlers/delete-tag-key-by-id.js";
import { deleteTagValueByID } from "./route-handlers/delete-tag-value-by-id.js";
import { getTagKeyByID } from "./route-handlers/get-tag-key-by-id.js";
import { getTagKeys } from "./route-handlers/get-tag-keys.js";
import { getTagValueByID } from "./route-handlers/get-tag-value-by-id.js";
import { getTagValues } from "./route-handlers/get-tag-values.js";
import { patchTagKey } from "./route-handlers/patch-tag-key.js";
import { patchTagValue } from "./route-handlers/patch-tag-value.js";
import { postTagKey } from "./route-handlers/post-tag-key.js";
import { postTagValue } from "./route-handlers/post-tag-value.js";

export const createRouter = () => {
  const tagsRouter = express.Router();

  tagsRouter.delete("/keys/:tagKeyID", deleteTagKeyByID);

  tagsRouter.get("/keys", getTagKeys);

  tagsRouter.get("/keys/:tagKeyID", getTagKeyByID);

  tagsRouter.post("/keys", postTagKey);

  tagsRouter.patch("/keys/:tagKeyID", patchTagKey);

  tagsRouter.delete("/values/:tagValueID", deleteTagValueByID);

  tagsRouter.get("/values", getTagValues);

  tagsRouter.get("/values/:tagValueID", getTagValueByID);

  tagsRouter.post("/values", postTagValue);

  tagsRouter.patch("/values/:tagValueID", patchTagValue);

  return tagsRouter;
};
