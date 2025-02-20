import { aa as createError } from './server.mjs';
import 'vue';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../nitro/nitro.mjs';
import 'zod';
import 'better-sqlite3';
import 'unhead';
import 'vue-router';
import 'vue/server-renderer';

function renderStubMessage(name) {
  throw createError({
    fatal: true,
    statusCode: 500,
    statusMessage: `${name} is provided by @nuxt/image. Check your console to install it or run 'npx nuxi@latest module add @nuxt/image'`
  });
}
const NuxtImg = {
  setup: () => renderStubMessage("<NuxtImg>")
};
const NuxtPicture = {
  setup: () => renderStubMessage("<NuxtPicture>")
};

export { NuxtImg, NuxtPicture };
//# sourceMappingURL=nuxt-stubs-CmezUEYc.mjs.map
