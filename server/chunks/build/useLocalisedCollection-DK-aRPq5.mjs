import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref } from 'vue';
import { b as useNuxtApp, as as asyncDataDefaults, ar as tryUseNuxtApp, aa as createError, d as withoutTrailingSlash } from './server.mjs';

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst((opts == null ? void 0 : opts.normalize) ? p.toLowerCase() : p)).join("") : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join("-") : "";
}
const kebabCaseToCamelCase = (str) => str.replaceAll(/(-+)([a-z])/g, (_, __, char) => char.toUpperCase());
const fallbackTitleKey = (path) => {
  const actualPath = typeof path === "string" ? path : path.join(".");
  return `pages${kebabCaseToCamelCase(actualPath.replaceAll("/", "."))}.title`;
};
const checksums = {
  "content_ar": "CIqfC5tzME",
  "content_de": "87OBKwEQhc",
  "content_en": "ZvYUusYVLI"
};
const tables = {
  "content_ar": "_content_content_ar",
  "content_de": "_content_content_de",
  "content_en": "_content_content_en",
  "info": "_content_info"
};
const buildGroup = (group, type) => {
  const conditions = group._conditions;
  return conditions.length > 0 ? `(${conditions.join(` ${type} `)})` : "";
};
const collectionQueryGroup = (collection) => {
  const conditions = [];
  const query = {
    // @ts-expect-error -- internal
    _conditions: conditions,
    where(field, operator, value) {
      let condition;
      switch (operator.toUpperCase()) {
        case "IN":
        case "NOT IN":
          if (Array.isArray(value)) {
            const values = value.map((val) => `'${val}'`).join(", ");
            condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
          } else {
            throw new TypeError(`Value for ${operator} must be an array`);
          }
          break;
        case "BETWEEN":
        case "NOT BETWEEN":
          if (Array.isArray(value) && value.length === 2) {
            condition = `"${String(field)}" ${operator.toUpperCase()} '${value[0]}' AND '${value[1]}'`;
          } else {
            throw new Error(`Value for ${operator} must be an array with two elements`);
          }
          break;
        case "IS NULL":
        case "IS NOT NULL":
          condition = `"${String(field)}" ${operator.toUpperCase()}`;
          break;
        case "LIKE":
        case "NOT LIKE":
          condition = `"${String(field)}" ${operator.toUpperCase()} '${value}'`;
          break;
        default:
          condition = `"${String(field)}" ${operator} '${value}'`;
      }
      conditions.push(`${condition}`);
      return query;
    },
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "OR"));
      return query;
    }
  };
  return query;
};
const collectionQueryBuilder = (collection, fetch) => {
  const params = {
    conditions: [],
    selectedFields: [],
    offset: 0,
    limit: 0,
    orderBy: [],
    // Count query
    count: {
      field: "",
      distinct: false
    }
  };
  const query = {
    // @ts-expect-error -- internal
    __params: params,
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "OR"));
      return query;
    },
    path(path) {
      return query.where("path", "=", withoutTrailingSlash(path));
    },
    skip(skip) {
      params.offset = skip;
      return query;
    },
    where(field, operator, value) {
      query.andWhere((group) => group.where(String(field), operator, value));
      return query;
    },
    limit(limit) {
      params.limit = limit;
      return query;
    },
    select(...fields) {
      if (fields.length) {
        params.selectedFields.push(...fields);
      }
      return query;
    },
    order(field, direction) {
      params.orderBy.push(`"${String(field)}" ${direction}`);
      return query;
    },
    async all() {
      return fetch(collection, buildQuery()).then((res) => res || []);
    },
    async first() {
      return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
    },
    async count(field = "*", distinct = false) {
      return fetch(collection, buildQuery({
        count: { field: String(field), distinct }
      })).then((m) => m[0].count);
    }
  };
  function buildQuery(opts = {}) {
    let query2 = "SELECT ";
    if (opts == null ? void 0 : opts.count) {
      query2 += `COUNT(${opts.count.distinct ? "DISTINCT" : ""} ${opts.count.field}) as count`;
    } else {
      const fields = Array.from(new Set(params.selectedFields));
      query2 += fields.length > 0 ? fields.map((f) => `"${String(f)}"`).join(", ") : "*";
    }
    query2 += ` FROM ${tables[String(collection)]}`;
    if (params.conditions.length > 0) {
      query2 += ` WHERE ${params.conditions.join(" AND ")}`;
    }
    if (params.orderBy.length > 0) {
      query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
    } else {
      query2 += ` ORDER BY stem ASC`;
    }
    const limit = (opts == null ? void 0 : opts.limit) || params.limit;
    if (limit > 0) {
      if (params.offset > 0) {
        query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
      } else {
        query2 += ` LIMIT ${limit}`;
      }
    }
    return query2;
  }
  return query;
};
async function generateNavigationTree(queryBuilder, extraFields = []) {
  var _a;
  const params = queryBuilder.__params;
  if (!((_a = params == null ? void 0 : params.orderBy) == null ? void 0 : _a.length)) {
    queryBuilder = queryBuilder.order("stem", "ASC");
  }
  const collecitonItems = await queryBuilder.orWhere(
    (group) => group.where("navigation", "<>", "false").where("navigation", "IS NULL")
  ).select("navigation", "stem", "path", "title", "meta", ...extraFields || []).all();
  const { contents, configs } = collecitonItems.reduce((acc, c) => {
    var _a2;
    if (String(c.stem).split("/").pop() === ".navigation") {
      c.title = ((_a2 = c.title) == null ? void 0 : _a2.toLowerCase()) === "navigation" ? "" : c.title;
      const key = c.path.split("/").slice(0, -1).join("/") || "/";
      acc.configs[key] = {
        ...c,
        ...c.body
      };
    } else {
      acc.contents.push(c);
    }
    return acc;
  }, { configs: {}, contents: [] });
  const pickConfigNavigationFields = (content) => ({
    ...pick$1(["title", ...extraFields])(content),
    ...content.meta,
    ...isObject(content == null ? void 0 : content.navigation) ? content.navigation : {}
  });
  const pickNavigationFields = (content) => ({
    ...pick$1(["title", ...extraFields])(content),
    ...isObject(content == null ? void 0 : content.navigation) ? content.navigation : {}
  });
  const nav = contents.reduce((nav2, content) => {
    var _a2;
    const parts = content.path.substring(1).split("/");
    const idParts = content.stem.split("/");
    const isIndex = !!((_a2 = idParts[idParts.length - 1]) == null ? void 0 : _a2.match(/([1-9]\d*\.)?index/g));
    const getNavItem = (content2) => ({
      title: content2.title,
      path: content2.path,
      stem: content2.stem,
      children: [],
      ...pickNavigationFields(content2)
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem.path];
      if (typeof (dirConfig == null ? void 0 : dirConfig.navigation) !== "undefined" && (dirConfig == null ? void 0 : dirConfig.navigation) === false) {
        return nav2;
      }
      if (content.path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      if (dirConfig) {
        Object.assign(
          navItem,
          pickConfigNavigationFields(dirConfig)
        );
      }
    }
    if (parts.length === 1) {
      const existed2 = nav2.find((item) => item.path === navItem.path && item.page === false);
      if (isIndex && existed2) {
        Object.assign(existed2, {
          page: void 0,
          children: [
            ...navItem.children,
            ...existed2.children
          ]
        });
      } else {
        nav2.push(navItem);
      }
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof (conf == null ? void 0 : conf.navigation) !== "undefined" && conf.navigation === false) {
        return [];
      }
      let parent = nodes.find((n) => n.path === currentPathPart);
      if (!parent) {
        const navigationConfig = conf ? pickConfigNavigationFields(conf) : {};
        parent = {
          ...navigationConfig,
          title: navigationConfig.title || generateTitle(part),
          path: currentPathPart,
          stem: idParts.slice(0, i + 1).join("/"),
          children: [],
          page: false
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    const existed = siblings.find((item) => item.path === navItem.path && item.page === false);
    if (existed) {
      Object.assign(existed, {
        ...navItem,
        page: void 0,
        children: [
          ...navItem.children,
          ...existed.children
        ]
      });
    } else {
      siblings.push(navItem);
    }
    return nav2;
  }, []);
  return sortAndClear(nav);
}
function sortAndClear(nav) {
  var _a;
  const sorted = nav;
  for (const item of sorted) {
    if ((_a = item.children) == null ? void 0 : _a.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
  }
  return nav;
}
function pick$1(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return obj !== null && Object.prototype.toString.call(obj) === "[object Object]";
}
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
async function fetchQuery(event, collection, sql) {
  return await $fetch(`/api/content/${collection}/query`, {
    context: event ? { cloudflare: event.context.cloudflare } : {},
    headers: { "content-type": "application/json" },
    query: { v: checksums[String(collection)], t: void 0 },
    method: "POST",
    body: {
      sql
    }
  });
}
const queryCollection = (collection) => {
  var _a, _b;
  const event = (_b = (_a = tryUseNuxtApp()) == null ? void 0 : _a.ssrContext) == null ? void 0 : _b.event;
  return collectionQueryBuilder(collection, (collection2, sql) => executeContentQuery(event, collection2, sql));
};
function queryCollectionNavigation(collection, fields) {
  return chainablePromise(collection, (qb) => generateNavigationTree(qb, fields));
}
async function executeContentQuery(event, collection, sql) {
  {
    return fetchQuery(event, String(collection), sql);
  }
}
function chainablePromise(collection, fn) {
  const queryBuilder = queryCollection(collection);
  const chainable = {
    where(field, operator, value) {
      queryBuilder.where(String(field), operator, value);
      return chainable;
    },
    andWhere(groupFactory) {
      queryBuilder.andWhere(groupFactory);
      return chainable;
    },
    orWhere(groupFactory) {
      queryBuilder.orWhere(groupFactory);
      return chainable;
    },
    order(field, direction) {
      queryBuilder.order(String(field), direction);
      return chainable;
    },
    then(onfulfilled, onrejected) {
      return fn(queryBuilder).then(onfulfilled, onrejected);
    },
    catch(onrejected) {
      return this.then(void 0, onrejected);
    },
    finally(onfinally) {
      return this.then(void 0, void 0).finally(onfinally);
    },
    get [Symbol.toStringTag]() {
      return "Promise";
    }
  };
  return chainable;
}
const useLocalisedCollectionNavigation = () => {
  const { defaultLocale, locale } = useI18n();
  return (handler, fallback = void 0) => {
    const collection = queryCollectionNavigation(
      `content_${locale.value}`
    );
    const defaultCollection = queryCollectionNavigation(
      `content_${defaultLocale}`
    );
    return handler(collection).catch((error) => {
      if (defaultLocale === locale.value) {
        return Promise.reject(error);
      }
      console.log("Unable to perform query. Re-trying with default locale.");
      return handler(defaultCollection);
    }).catch((error) => {
      console.log("Unable to perform query.");
      console.error(error);
      return fallback || {};
    });
  };
};
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useLocalisedCollection = () => {
  const { defaultLocale, locale } = useI18n();
  return (handler, fallback = void 0) => {
    const collection = queryCollection(
      `content_${locale.value}`
    );
    const defaultCollection = queryCollection(
      `content_${defaultLocale}`
    );
    return handler(collection).catch((error) => {
      if (defaultLocale === locale.value) {
        return Promise.reject(error);
      }
      console.log("Unable to perform query. Re-trying with default locale.");
      return handler(defaultCollection);
    }).catch((error) => {
      console.log("Unable to perform query.");
      console.error(error);
      return fallback || {};
    });
  };
};

export { useAsyncData as a, useLocalisedCollectionNavigation as b, kebabCaseToCamelCase as c, fallbackTitleKey as f, kebabCase as k, pascalCase as p, useLocalisedCollection as u };
//# sourceMappingURL=useLocalisedCollection-DK-aRPq5.mjs.map
