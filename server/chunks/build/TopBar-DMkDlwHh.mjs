import NuxtLink from './nuxt-link-C3CduanY.mjs';
import { navigationMenuTriggerStyle, NavigationMenu as _sfc_main$6, NavigationMenuList as _sfc_main$1, NavigationMenuItem as _sfc_main$3, NavigationMenuTrigger as _sfc_main$2, NavigationMenuContent as _sfc_main$5, NavigationMenuLink as _sfc_main$2$1 } from './index-PSgpDirs.mjs';
import _sfc_main$4 from './LanguageSwitcher-DWMjmyCE.mjs';
import __nuxt_component_8 from './GitHub-B0nG0xJM.mjs';
import __nuxt_component_0 from './client-only-CkMuatfh.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { p as ps, h as hs } from './karagoz-shared-BIF6lT4t.mjs';
import { useDark, useToggle } from '@vueuse/core';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { ab as useLocalePath } from './server.mjs';
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
import 'class-variance-authority';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'radix-vue';
import 'lucide-vue-next';
import './server-placeholder-BiVZCzBa.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TopBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    const isDark = useDark();
    useToggle(isDark);
    const isDev = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      const _component_NavigationMenu = _sfc_main$6;
      const _component_NavigationMenuList = _sfc_main$1;
      const _component_NavigationMenuItem = _sfc_main$3;
      const _component_NavigationMenuTrigger = _sfc_main$2;
      const _component_NavigationMenuContent = _sfc_main$5;
      const _component_NavigationMenuLink = _sfc_main$2$1;
      const _component_DocsTopBarLanguageSwitcher = _sfc_main$4;
      const _component_IconGitHub = __nuxt_component_8;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border" }, _attrs))}><div class="container flex h-14 items-center max-w-screen-2xl">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "flex gap-2 items-center me-6",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ps), {
              "aria-hidden": "true",
              class: "fill-primary h-8",
              title: unref(t)("layouts.siteName")
            }, null, _parent2, _scopeId));
            _push2(`<span class="font-bold"${_scopeId}>${ssrInterpolate(unref(t)("layouts.siteName"))}</span>`);
          } else {
            return [
              createVNode(unref(ps), {
                "aria-hidden": "true",
                class: "fill-primary h-8",
                title: unref(t)("layouts.siteName")
              }, null, 8, ["title"]),
              createVNode("span", { class: "font-bold" }, toDisplayString(unref(t)("layouts.siteName")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NavigationMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NavigationMenuList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NavigationMenuItem, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NavigationMenuTrigger, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandbox"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_NavigationMenuContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"${_scopeId4}><li class="row-span-5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                      to: unref(localePath)({ path: "/sandbox" })
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="mb-2 mt-4 text-lg font-medium"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.siteName"))} <br${_scopeId6}> ${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandbox"))}</div><p class="text-xs leading-tight text-muted-foreground"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandboxTeaser"))}</p>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                              createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                              createVNode("br"),
                                              createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                            ]),
                                            createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, {
                                        class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                        to: unref(localePath)({ path: "/sandbox" })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                            createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                            createVNode("br"),
                                            createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                          ]),
                                          createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</li><li${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/setup" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="text-sm font-medium leading-none"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandboxSetup"))}</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/setup" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</li><li${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="text-sm font-medium leading-none"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted"))}</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</li><li${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/handbook" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="text-sm font-medium leading-none"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandboxHandbook"))}</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/handbook" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</li><li${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="text-sm font-medium leading-none"${_scopeId6}>${ssrInterpolate(unref(t)("layouts.default.topBar.nav.sandboxApiReference"))}</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</li></ul>`);
                            } else {
                              return [
                                createVNode("ul", { class: "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]" }, [
                                  createVNode("li", { class: "row-span-5" }, [
                                    createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                          to: unref(localePath)({ path: "/sandbox" })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                              createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                              createVNode("br"),
                                              createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                            ]),
                                            createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("li", null, [
                                    createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: unref(localePath)({ path: "/sandbox/setup" }),
                                          class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("li", null, [
                                    createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                          class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("li", null, [
                                    createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: unref(localePath)({ path: "/sandbox/handbook" }),
                                          class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("li", null, [
                                    createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                          class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NavigationMenuTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NavigationMenuContent, null, {
                            default: withCtx(() => [
                              createVNode("ul", { class: "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]" }, [
                                createVNode("li", { class: "row-span-5" }, [
                                  createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                        to: unref(localePath)({ path: "/sandbox" })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                            createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                            createVNode("br"),
                                            createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                          ]),
                                          createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("li", null, [
                                  createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/setup" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("li", null, [
                                  createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("li", null, [
                                  createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/handbook" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("li", null, [
                                  createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                        class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(isDev)) {
                    _push3(ssrRenderComponent(_component_NavigationMenuItem, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NavigationMenuLink, {
                            href: "/docs/introduction",
                            class: unref(navigationMenuTriggerStyle)()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(t)("layouts.default.topBar.nav.blog"))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.blog")), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NavigationMenuLink, {
                              href: "/docs/introduction",
                              class: unref(navigationMenuTriggerStyle)()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.blog")), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_NavigationMenuItem, null, {
                      default: withCtx(() => [
                        createVNode(_component_NavigationMenuTrigger, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NavigationMenuContent, null, {
                          default: withCtx(() => [
                            createVNode("ul", { class: "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]" }, [
                              createVNode("li", { class: "row-span-5" }, [
                                createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                      to: unref(localePath)({ path: "/sandbox" })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                          createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                          createVNode("br"),
                                          createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                        ]),
                                        createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, [
                                createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/setup" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, [
                                createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, [
                                createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/handbook" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, [
                                createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                      class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    !unref(isDev) ? (openBlock(), createBlock(_component_NavigationMenuItem, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_NavigationMenuLink, {
                          href: "/docs/introduction",
                          class: unref(navigationMenuTriggerStyle)()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.blog")), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NavigationMenuList, null, {
                default: withCtx(() => [
                  createVNode(_component_NavigationMenuItem, null, {
                    default: withCtx(() => [
                      createVNode(_component_NavigationMenuTrigger, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NavigationMenuContent, null, {
                        default: withCtx(() => [
                          createVNode("ul", { class: "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]" }, [
                            createVNode("li", { class: "row-span-5" }, [
                              createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    class: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md",
                                    to: unref(localePath)({ path: "/sandbox" })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "mb-2 mt-4 text-lg font-medium" }, [
                                        createTextVNode(toDisplayString(unref(t)("layouts.siteName")) + " ", 1),
                                        createVNode("br"),
                                        createTextVNode(" " + toDisplayString(unref(t)("layouts.default.topBar.nav.sandbox")), 1)
                                      ]),
                                      createVNode("p", { class: "text-xs leading-tight text-muted-foreground" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxTeaser")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, [
                              createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: unref(localePath)({ path: "/sandbox/setup" }),
                                    class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxSetup")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, [
                              createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: unref(localePath)({ path: "/sandbox/getting-started" }),
                                    class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxGettingStarted")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, [
                              createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: unref(localePath)({ path: "/sandbox/handbook" }),
                                    class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxHandbook")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, [
                              createVNode(_component_NavigationMenuLink, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: unref(localePath)({ path: "/sandbox/api-reference" }),
                                    class: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-sm font-medium leading-none" }, toDisplayString(unref(t)("layouts.default.topBar.nav.sandboxApiReference")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  !unref(isDev) ? (openBlock(), createBlock(_component_NavigationMenuItem, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_NavigationMenuLink, {
                        href: "/docs/introduction",
                        class: unref(navigationMenuTriggerStyle)()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("layouts.default.topBar.nav.blog")), 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">`);
      if (!unref(isDev)) {
        _push(ssrRenderComponent(_component_DocsTopBarLanguageSwitcher, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="flex items-center">`);
      _push(ssrRenderComponent(unref(hs), {
        as: "a",
        "aria-label": unref(t)("layouts.default.topBar.extras.github"),
        href: "https://github.com/frontendat/karagoz",
        size: "icon",
        target: "_blank",
        title: unref(t)("layouts.default.topBar.extras.github"),
        variant: "ghost"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_IconGitHub, { class: "size-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_IconGitHub, { class: "size-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</nav></div></div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/top-bar/TopBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TopBar-DMkDlwHh.mjs.map
