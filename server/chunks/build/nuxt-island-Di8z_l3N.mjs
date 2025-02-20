import { defineComponent, ref, computed, getCurrentInstance, toRaw, createVNode, withMemo, Fragment, h, createStaticVNode, Teleport } from 'vue';
import { ai as selectiveClient, b as useNuxtApp, aj as hash, ak as useRequestEvent, ah as injectHead, an as withQuery, j as joinURL, c as useRuntimeConfig } from './server.mjs';
import nodeCrypto from 'node:crypto';
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

var _a;
((_a = nodeCrypto.webcrypto) == null ? void 0 : _a.subtle) || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};
const pKey = "_islandPromises";
const SSR_UID_RE = /data-island-uid="([^"]*)"/;
const DATA_ISLAND_UID_RE = /data-island-uid(="")?(?!="[^"])/g;
const SLOTNAME_RE = /data-island-slot="([^"]*)"/g;
const SLOT_FALLBACK_RE = / data-island-slot="([^"]*)"[^>]*>/g;
const ISLAND_SCOPE_ID_RE = /^<[^> ]*/;
const getId = randomUUID;
const nuxtIsland = defineComponent({
  name: "NuxtIsland",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    lazy: Boolean,
    props: {
      type: Object,
      default: () => void 0
    },
    context: {
      type: Object,
      default: () => ({})
    },
    scopeId: {
      type: String,
      default: () => void 0
    },
    source: {
      type: String,
      default: () => void 0
    },
    dangerouslyLoadClientComponents: {
      type: Boolean,
      default: false
    }
  },
  emits: ["error"],
  async setup(props, { slots, expose, emit }) {
    var _a2, _b;
    let canTeleport = true;
    const teleportKey = ref(0);
    const key = ref(0);
    computed(() => selectiveClient);
    const error = ref(null);
    const config = useRuntimeConfig();
    const nuxtApp = useNuxtApp();
    const filteredProps = computed(() => props.props ? Object.fromEntries(Object.entries(props.props).filter(([key2]) => !key2.startsWith("data-v-"))) : {});
    const hashId = computed(() => hash([props.name, filteredProps.value, props.context, props.source]));
    const instance = getCurrentInstance();
    const event = useRequestEvent();
    let activeHead;
    const eventFetch = event.fetch;
    ref(false);
    function setPayload(key2, result) {
      const toRevive = {};
      if (result.props) {
        toRevive.props = result.props;
      }
      if (result.slots) {
        toRevive.slots = result.slots;
      }
      if (result.components) {
        toRevive.components = result.components;
      }
      if (result.head) {
        toRevive.head = result.head;
      }
      nuxtApp.payload.data[key2] = {
        __nuxt_island: {
          key: key2,
          ...{ params: { ...props.context, props: props.props ? JSON.stringify(props.props) : void 0 } },
          result: toRevive
        },
        ...result
      };
    }
    const payloads = {};
    if (instance.vnode.el) {
      const slots2 = (_a2 = toRaw(nuxtApp.payload.data[`${props.name}_${hashId.value}`])) == null ? void 0 : _a2.slots;
      if (slots2) {
        payloads.slots = slots2;
      }
    }
    const ssrHTML = ref("");
    const uid = ref(((_b = ssrHTML.value.match(SSR_UID_RE)) == null ? void 0 : _b[1]) || getId());
    const availableSlots = computed(() => [...ssrHTML.value.matchAll(SLOTNAME_RE)].map((m) => m[1]));
    const html = computed(() => {
      const currentSlots = Object.keys(slots);
      let html2 = ssrHTML.value;
      if (props.scopeId) {
        html2 = html2.replace(ISLAND_SCOPE_ID_RE, (full) => full + " " + props.scopeId);
      }
      if (payloads.slots) {
        return html2.replaceAll(SLOT_FALLBACK_RE, (full, slotName) => {
          var _a3, _b2;
          if (!currentSlots.includes(slotName)) {
            return full + (((_b2 = (_a3 = payloads.slots) == null ? void 0 : _a3[slotName]) == null ? void 0 : _b2.fallback) || "");
          }
          return full;
        });
      }
      return html2;
    });
    const head = injectHead();
    async function _fetchComponent(force = false) {
      var _a4;
      var _a3;
      const key2 = `${props.name}_${hashId.value}`;
      if (!force && ((_a3 = nuxtApp.payload.data[key2]) == null ? void 0 : _a3.html)) {
        return nuxtApp.payload.data[key2];
      }
      const url = `/__nuxt_island/${key2}.json`;
      const r = await eventFetch(withQuery(props.source ? url : joinURL((_a4 = config.app.baseURL) != null ? _a4 : "", url), {
        ...props.context,
        props: props.props ? JSON.stringify(props.props) : void 0
      }));
      const result = await r.json();
      setPayload(key2, result);
      return result;
    }
    async function fetchComponent(force = false) {
      nuxtApp[pKey] = nuxtApp[pKey] || {};
      if (!nuxtApp[pKey][uid.value]) {
        nuxtApp[pKey][uid.value] = _fetchComponent(force).finally(() => {
          delete nuxtApp[pKey][uid.value];
        });
      }
      try {
        const res = await nuxtApp[pKey][uid.value];
        ssrHTML.value = res.html.replaceAll(DATA_ISLAND_UID_RE, `data-island-uid="${uid.value}"`);
        key.value++;
        error.value = null;
        payloads.slots = res.slots || {};
        payloads.components = res.components || {};
        if (selectiveClient && false) ;
        if (res == null ? void 0 : res.head) {
          if (activeHead) {
            activeHead.patch(res.head);
          } else {
            activeHead = head.push(res.head);
          }
        }
        if (false) ;
      } catch (e) {
        error.value = e;
        emit("error", e);
      }
    }
    expose({
      refresh: () => fetchComponent(true)
    });
    {
      await fetchComponent();
    }
    return (_ctx, _cache) => {
      var _a4;
      var _a3;
      if (!html.value || error.value) {
        return [(_a4 = (_a3 = slots.fallback) == null ? void 0 : _a3.call(slots, { error: error.value })) != null ? _a4 : createVNode("div")];
      }
      return [
        withMemo([key.value], () => {
          return createVNode(Fragment, { key: key.value }, [h(createStaticVNode(html.value || "<div></div>", 1))]);
        }, _cache, 0),
        // should away be triggered ONE tick after re-rendering the static node
        withMemo([teleportKey.value], () => {
          const teleports = [];
          teleportKey.value === 0 || !!(teleportKey.value && !(teleportKey.value % 2));
          if (uid.value && html.value && canTeleport) {
            for (const slot in slots) {
              if (availableSlots.value.includes(slot)) {
                teleports.push(
                  createVNode(
                    Teleport,
                    // use different selectors for even and odd teleportKey to force trigger the teleport
                    { to: `uid=${uid.value};slot=${slot}` },
                    { default: () => {
                      var _a42, _b2, _c;
                      return (((_c = (_b2 = (_a42 = payloads.slots) == null ? void 0 : _a42[slot]) == null ? void 0 : _b2.props) == null ? void 0 : _c.length) ? payloads.slots[slot].props : [{}]).map((data) => {
                        var _a5;
                        return (_a5 = slots[slot]) == null ? void 0 : _a5.call(slots, data);
                      });
                    } }
                  )
                );
              }
            }
          }
          return h(Fragment, teleports);
        }, _cache, 1)
      ];
    };
  }
});

export { nuxtIsland as default };
//# sourceMappingURL=nuxt-island-Di8z_l3N.mjs.map
