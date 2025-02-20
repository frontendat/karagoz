import { n as nuxtLinkDefaults, ac as useSwitchLocalePath, ad as SWITCH_LOCALE_PATH_LINK_IDENTIFIER } from './server.mjs';
import { defineComponent, h, Comment } from 'vue';
import { defineNuxtLink } from './nuxt-link-C3CduanY.mjs';
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

const NuxtLink = defineNuxtLink({ ...nuxtLinkDefaults, componentName: "NuxtLink" });
const SwitchLocalePathLink = defineComponent({
  name: "SwitchLocalePathLink",
  props: {
    locale: {
      type: String,
      required: true
    }
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const switchLocalePath = useSwitchLocalePath();
    return () => [
      h(Comment, `${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-[${props.locale}]`),
      h(NuxtLink, { ...attrs, to: encodeURI(switchLocalePath(props.locale)) }, slots.default),
      h(Comment, `/${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}`)
    ];
  }
});

export { SwitchLocalePathLink as default };
//# sourceMappingURL=SwitchLocalePathLink-C7FFsN_X.mjs.map
