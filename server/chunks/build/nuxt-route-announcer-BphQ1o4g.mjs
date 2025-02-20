import { defineComponent, h, ref } from 'vue';
import { b as useNuxtApp, ah as injectHead } from './server.mjs';
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

function createRouteAnnouncer(opts = {}) {
  var _a;
  const message = ref("");
  const politeness = ref(opts.politeness || "polite");
  const activeHead = injectHead();
  function set(messageValue = "", politenessSetting = "polite") {
    message.value = messageValue;
    politeness.value = politenessSetting;
  }
  function polite(message2) {
    return set(message2, "polite");
  }
  function assertive(message2) {
    return set(message2, "assertive");
  }
  function _updateMessageWithPageHeading() {
    set(void 0, politeness.value);
  }
  function _cleanup() {
    var _a2;
    (_a2 = activeHead == null ? void 0 : activeHead.hooks) == null ? void 0 : _a2.removeHook("dom:rendered", _updateMessageWithPageHeading);
  }
  _updateMessageWithPageHeading();
  (_a = activeHead == null ? void 0 : activeHead.hooks) == null ? void 0 : _a.hook("dom:rendered", () => {
    _updateMessageWithPageHeading();
  });
  return {
    _cleanup,
    message,
    politeness,
    set,
    polite,
    assertive
  };
}
function useRouteAnnouncer(opts = {}) {
  const nuxtApp = useNuxtApp();
  const announcer = nuxtApp._routeAnnouncer = nuxtApp._routeAnnouncer || createRouteAnnouncer(opts);
  if (opts.politeness !== announcer.politeness.value) {
    announcer.politeness.value = opts.politeness || "polite";
  }
  return announcer;
}
const nuxtRouteAnnouncer = defineComponent({
  name: "NuxtRouteAnnouncer",
  props: {
    atomic: {
      type: Boolean,
      default: false
    },
    politeness: {
      type: String,
      default: "polite"
    }
  },
  setup(props, { slots, expose }) {
    const { set, polite, assertive, message, politeness } = useRouteAnnouncer({ politeness: props.politeness });
    expose({
      set,
      polite,
      assertive,
      message,
      politeness
    });
    return () => h("span", {
      class: "nuxt-route-announcer",
      style: {
        position: "absolute"
      }
    }, h("span", {
      "role": "alert",
      "aria-live": politeness.value,
      "aria-atomic": props.atomic,
      "style": {
        "border": "0",
        "clip": "rect(0 0 0 0)",
        "clip-path": "inset(50%)",
        "height": "1px",
        "width": "1px",
        "overflow": "hidden",
        "position": "absolute",
        "white-space": "nowrap",
        "word-wrap": "normal",
        "margin": "-1px",
        "padding": "0"
      }
    }, slots.default ? slots.default({ message: message.value }) : message.value));
  }
});

export { nuxtRouteAnnouncer as default };
//# sourceMappingURL=nuxt-route-announcer-BphQ1o4g.mjs.map
