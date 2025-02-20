import { defineComponent, ref, provide, createElementBlock } from 'vue';
import ServerPlaceholder from './server-placeholder-BiVZCzBa.mjs';

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
// @__NO_SIDE_EFFECTS__
function createClientOnly(component) {
  {
    return ServerPlaceholder;
  }
}

export { clientOnlySymbol, createClientOnly, __nuxt_component_0 as default };
//# sourceMappingURL=client-only-CkMuatfh.mjs.map
