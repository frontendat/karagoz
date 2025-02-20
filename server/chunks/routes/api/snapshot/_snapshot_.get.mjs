import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { snapshot } from '@webcontainer/snapshot';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import 'node:zlib';

const snapshots = ["express", "express-solve"];
const _snapshot__get = defineEventHandler(async (event) => {
  const snapshotName = getRouterParam(event, "snapshot");
  if (snapshotName && !snapshots.includes(snapshotName)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Snapshot not found"
    });
  }
  try {
    const sourceSnapshot = await snapshot(`./server/snapshots/${snapshotName}`);
    event.headers.set("content-type", "application/octet-stream");
    return sourceSnapshot;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to get snapshot"
    });
  }
});

export { _snapshot__get as default };
//# sourceMappingURL=_snapshot_.get.mjs.map
