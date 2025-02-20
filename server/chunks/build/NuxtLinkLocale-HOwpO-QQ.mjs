import { n as nuxtLinkDefaults, ab as useLocalePath, h as hasProtocol } from './server.mjs';
import { defineComponent, computed, h } from 'vue';
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

const NuxtLinkLocale = defineNuxtLink({ ...nuxtLinkDefaults, componentName: "NuxtLinkLocale" });
const NuxtLinkLocale$1 = defineComponent({
  name: "NuxtLinkLocale",
  props: {
    ...NuxtLinkLocale.props,
    locale: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props, { slots }) {
    const localePath = useLocalePath();
    const resolvedPath = computed(() => {
      var _a;
      const destination = (_a = props.to) != null ? _a : props.href;
      return destination != null ? localePath(destination, props.locale) : destination;
    });
    const isExternal = computed(() => {
      var _a;
      if (props.external) {
        return true;
      }
      if (props.target && props.target !== "_self") {
        return true;
      }
      const destination = (_a = props.to) != null ? _a : props.href;
      if (typeof destination === "object") {
        return false;
      }
      return destination === "" || destination == null || hasProtocol(destination, { acceptRelative: true });
    });
    const getNuxtLinkProps = () => {
      const _props = {
        ...props
      };
      if (!isExternal.value) {
        _props.to = resolvedPath.value;
      }
      delete _props.href;
      delete _props.locale;
      return _props;
    };
    return () => h(NuxtLinkLocale, getNuxtLinkProps(), slots.default);
  }
});

export { NuxtLinkLocale$1 as default };
//# sourceMappingURL=NuxtLinkLocale-HOwpO-QQ.mjs.map
