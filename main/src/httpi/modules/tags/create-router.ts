import express from "express";

import { deleteTagByID } from "./route-handlers/delete-tag-by-id.js";
import { deleteTagKeyByID } from "./route-handlers/delete-tag-key-by-id.js";
import { deleteTagValueByID } from "./route-handlers/delete-tag-value-by-id.js";
import { getTagByID } from "./route-handlers/get-tag-by-id.js";
import { getTagKeyByID } from "./route-handlers/get-tag-key-by-id.js";
import { getTagKeys } from "./route-handlers/get-tag-keys.js";
import { getTagValueByID } from "./route-handlers/get-tag-value-by-id.js";
import { getTagValues } from "./route-handlers/get-tag-values.js";
import { getTags } from "./route-handlers/get-tags.js";
import { patchTag } from "./route-handlers/patch-tag.js";
import { patchTagKey } from "./route-handlers/patch-tag-key.js";
import { patchTagValue } from "./route-handlers/patch-tag-value.js";
import { postTag } from "./route-handlers/post-tag.js";
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

  tagsRouter.delete("/:tagID", deleteTagByID);

  tagsRouter.get("/", getTags);

  tagsRouter.get("/:tagID", getTagByID);

  tagsRouter.post("/", postTag);

  tagsRouter.patch("/:tagID", patchTag);

  return tagsRouter;
};
