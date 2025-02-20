import { defineComponent } from 'vue';

const devOnly = defineComponent({
  name: "DevOnly",
  inheritAttrs: false,
  setup(_, props) {
    return () => {
      var _a, _b;
      return (_b = (_a = props.slots).fallback) == null ? void 0 : _b.call(_a);
    };
  }
});

export { devOnly as default };
//# sourceMappingURL=dev-only-BpaJTl-4.mjs.map
