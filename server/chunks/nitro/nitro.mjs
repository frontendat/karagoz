import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import vt, { Server as Server$1 } from 'node:http';
import Bs, { Server } from 'node:https';
import { promises, existsSync } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as z from 'zod';
import Database from 'better-sqlite3';
import * as zlib from 'node:zlib';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp$1(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

let H3Error$1 = class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode$1(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage$1(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
};
function createError$2(input) {
  if (typeof input === "string") {
    return new H3Error$1(input);
  }
  if (isError$1(input)) {
    return input;
  }
  const err = new H3Error$1(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp$1(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode$1(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode$1(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage$1(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError$1(error) ? error : createError$2(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError$1(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams$1(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam$1(event, name, opts = {}) {
  const params = getRouterParams$1(event, opts);
  return params[name];
}
function isMethod$1(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod$1(event, expected, allowHead) {
  if (!isMethod$1(event, expected)) {
    throw createError$2({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol$1 = Symbol.for("h3RawBody");
const PayloadMethods$1$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody$1(event, encoding = "utf8") {
  assertMethod$1(event, PayloadMethods$1$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol$1] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol$1] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol$1 in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody$1(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS$1 = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage$1(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS$1, "");
}
function sanitizeStatusCode$1(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode$1(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode$1(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage$1(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode$1(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp$1(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp$1(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode$1(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage$1(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody$1(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$2({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode$1(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage$1(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp$1(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray$1(handler.onRequest),
    onBeforeResponse: _normalizeArray$1(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler$1(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray$1(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler$1(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler$1 = defineEventHandler$1;
function isEventHandler(input) {
  return hasProp$1(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler$1((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler$1(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$2({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$2(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$2({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$2({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$2({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler$1((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$2(_error);
      if (!isError$1(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new vt.Agent(agentOptions);
  const httpsAgent = new Bs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
createFetch$1({ fetch, Headers: Headers$1, AbortController });

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"-mode\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"-mode\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _qHZ7TBXNJO = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _qHZ7TBXNJO
];

const assets$1 = {
  "/karagoz-logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"571-cE3gYKYMm2V9us8WfB0NEZEqMLE\"",
    "mtime": "2025-02-20T11:45:08.404Z",
    "size": 1393,
    "path": "../public/karagoz-logo.svg"
  },
  "/img/karagoz-and-hacivat.png": {
    "type": "image/png",
    "etag": "\"5d6ab-/pg2bMy3DcktbUx2D7Z1CGcAJ2A\"",
    "mtime": "2025-02-20T11:45:08.404Z",
    "size": 382635,
    "path": "../public/img/karagoz-and-hacivat.png"
  },
  "/_nuxt/-K35Mja_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"78b-CEFf8i5urra6CLBY0GZDcWd07vA\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 1931,
    "path": "../public/_nuxt/-K35Mja_.js"
  },
  "/_nuxt/0pArz5Cm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1717-GsBvo1+iFrHx4PqP3fqd6bWf46I\"",
    "mtime": "2025-02-20T11:45:08.278Z",
    "size": 5911,
    "path": "../public/_nuxt/0pArz5Cm.js"
  },
  "/_nuxt/2BzcgxYb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19f-rYeG86CZnavAlEcR0e0iwmyJzLU\"",
    "mtime": "2025-02-20T11:45:08.278Z",
    "size": 415,
    "path": "../public/_nuxt/2BzcgxYb.js"
  },
  "/_nuxt/3YHwbsGf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46c-8GL+/I38tJfkkNr2bhZ5O/7628I\"",
    "mtime": "2025-02-20T11:45:08.278Z",
    "size": 1132,
    "path": "../public/_nuxt/3YHwbsGf.js"
  },
  "/_nuxt/4ONG2Roa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e8-AYMRgpvv51a6gTtF+Pb1uvl8+bE\"",
    "mtime": "2025-02-20T11:45:08.278Z",
    "size": 232,
    "path": "../public/_nuxt/4ONG2Roa.js"
  },
  "/_nuxt/5Ct-VuMp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"384-fQ1FmauNutYiSU2gIF5SNqVY1lc\"",
    "mtime": "2025-02-20T11:45:08.279Z",
    "size": 900,
    "path": "../public/_nuxt/5Ct-VuMp.js"
  },
  "/_nuxt/6pXw7SSE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31b2-2bxUzK6Od4xMNtR7346lzsU1cRw\"",
    "mtime": "2025-02-20T11:45:08.280Z",
    "size": 12722,
    "path": "../public/_nuxt/6pXw7SSE.js"
  },
  "/_nuxt/8YQvVHVw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"415-tcyq6tyWNptZ4kG1aAx3TDp+4yQ\"",
    "mtime": "2025-02-20T11:45:08.279Z",
    "size": 1045,
    "path": "../public/_nuxt/8YQvVHVw.js"
  },
  "/_nuxt/AsAyGGJA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"182-amf0GqPUowlth1/f02GSekRBcOg\"",
    "mtime": "2025-02-20T11:45:08.279Z",
    "size": 386,
    "path": "../public/_nuxt/AsAyGGJA.js"
  },
  "/_nuxt/B-8jnY81.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1180-ZWdY3NYmf0fn7LR50RAZ17iQD+8\"",
    "mtime": "2025-02-20T11:45:08.280Z",
    "size": 4480,
    "path": "../public/_nuxt/B-8jnY81.js"
  },
  "/_nuxt/B-luBPCB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a7dd-iJRdmc7Q8Qb9rQUgohEqBNJ6XBc\"",
    "mtime": "2025-02-20T11:45:08.281Z",
    "size": 42973,
    "path": "../public/_nuxt/B-luBPCB.js"
  },
  "/_nuxt/B1M7N8fd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"276-lcdhTPE8ICLauifNlwiA0L2ctNM\"",
    "mtime": "2025-02-20T11:45:08.280Z",
    "size": 630,
    "path": "../public/_nuxt/B1M7N8fd.js"
  },
  "/_nuxt/B1tBg_DP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b9-bVKRZU8i1+vUCQV8Xmq9X6xX1mM\"",
    "mtime": "2025-02-20T11:45:08.280Z",
    "size": 1977,
    "path": "../public/_nuxt/B1tBg_DP.js"
  },
  "/_nuxt/B1wCu0_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ef-gXpRE5ocHgaUuyjWXucPMZoAYFs\"",
    "mtime": "2025-02-20T11:45:08.280Z",
    "size": 2287,
    "path": "../public/_nuxt/B1wCu0_E.js"
  },
  "/_nuxt/B2Rjki9n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"142c-KKM0f4n7Mcqe/xX6b8q9sDTEBOQ\"",
    "mtime": "2025-02-20T11:45:08.281Z",
    "size": 5164,
    "path": "../public/_nuxt/B2Rjki9n.js"
  },
  "/_nuxt/B4CMkyY2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8fd-lyp8u6QiNFJ0j90lWnKWv6VB3/8\"",
    "mtime": "2025-02-20T11:45:08.281Z",
    "size": 2301,
    "path": "../public/_nuxt/B4CMkyY2.js"
  },
  "/_nuxt/B4kiWyti.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2476-k1paXLnu9B+ZXhmVPUdwQ9pokgc\"",
    "mtime": "2025-02-20T11:45:08.281Z",
    "size": 9334,
    "path": "../public/_nuxt/B4kiWyti.js"
  },
  "/_nuxt/B53LhvXH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"406c3-XH180iW16ZWBHIlwHuwJmwmrZGE\"",
    "mtime": "2025-02-20T11:45:08.284Z",
    "size": 263875,
    "path": "../public/_nuxt/B53LhvXH.js"
  },
  "/_nuxt/B6W0miNI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30860-clSlVRIEln5J0TKi23yN7Ppckyk\"",
    "mtime": "2025-02-20T11:45:08.284Z",
    "size": 198752,
    "path": "../public/_nuxt/B6W0miNI.js"
  },
  "/_nuxt/BA5vi2Kp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db6-vQ21m3ZQeSYxagOlf3kyZoDeoYk\"",
    "mtime": "2025-02-20T11:45:08.281Z",
    "size": 3510,
    "path": "../public/_nuxt/BA5vi2Kp.js"
  },
  "/_nuxt/BAng5TT0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31130-GUiGNuxza4CWadEWwPBI9YnCi60\"",
    "mtime": "2025-02-20T11:45:08.284Z",
    "size": 201008,
    "path": "../public/_nuxt/BAng5TT0.js"
  },
  "/_nuxt/BBYI1fVV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b7-nKkGEW5IlfB6DnkWRNXHREq6kY8\"",
    "mtime": "2025-02-20T11:45:08.283Z",
    "size": 183,
    "path": "../public/_nuxt/BBYI1fVV.js"
  },
  "/_nuxt/BBqrzcBx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"229-klBBZPkdVxlknuam2StCxksH8SA\"",
    "mtime": "2025-02-20T11:45:08.284Z",
    "size": 553,
    "path": "../public/_nuxt/BBqrzcBx.js"
  },
  "/_nuxt/BCZA_wO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"472-o3D2g5yx/Z1jkOrHJTKGNVnR1DI\"",
    "mtime": "2025-02-20T11:45:08.285Z",
    "size": 1138,
    "path": "../public/_nuxt/BCZA_wO0.js"
  },
  "/_nuxt/BDli8Cr9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"792-hdVvCqR4qPpMlZIarby/gu2mY/4\"",
    "mtime": "2025-02-20T11:45:08.291Z",
    "size": 1938,
    "path": "../public/_nuxt/BDli8Cr9.js"
  },
  "/_nuxt/BEncEFOb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-fVA1FPqKdA66OjVc5hyqxRckZKA\"",
    "mtime": "2025-02-20T11:45:08.285Z",
    "size": 175,
    "path": "../public/_nuxt/BEncEFOb.js"
  },
  "/_nuxt/BEugSyMb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d72-DO+q/iY1PZ2wRMZOAoNt/YTzTdU\"",
    "mtime": "2025-02-20T11:45:08.289Z",
    "size": 11634,
    "path": "../public/_nuxt/BEugSyMb.js"
  },
  "/_nuxt/BFay_et-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4cc7-RaXNTY34AksUPVRkmrbRfBY2o3E\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 19655,
    "path": "../public/_nuxt/BFay_et-.js"
  },
  "/_nuxt/BHtG5hZ8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ff-3J3MDgGoueEgsx6hnJIZEcVa+LU\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 1791,
    "path": "../public/_nuxt/BHtG5hZ8.js"
  },
  "/_nuxt/BIkV9KBc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1015-x81YRQcbO3Fdy4XzZ6ttHxpLfys\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 4117,
    "path": "../public/_nuxt/BIkV9KBc.js"
  },
  "/_nuxt/BIz3_E7O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-3cV2FWtI17I6E9RkkPVtA59ESKA\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 175,
    "path": "../public/_nuxt/BIz3_E7O.js"
  },
  "/_nuxt/BJ4BC0dw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"86a-7M//hJi3CEH4PZPuB6kuqrzgodU\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 2154,
    "path": "../public/_nuxt/BJ4BC0dw.js"
  },
  "/_nuxt/BJgvnI81.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7853-eIXW1QBaW7YR6T8v+ZBLMWm+PDE\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 30803,
    "path": "../public/_nuxt/BJgvnI81.js"
  },
  "/_nuxt/BKpUYXoa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a8-56yxfzARSyTFaaZWJpv/JdxrxCE\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 1704,
    "path": "../public/_nuxt/BKpUYXoa.js"
  },
  "/_nuxt/BLLYADJu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28c-gGdK5Sd16MwZiG2mu0IoSxFVumQ\"",
    "mtime": "2025-02-20T11:45:08.292Z",
    "size": 652,
    "path": "../public/_nuxt/BLLYADJu.js"
  },
  "/_nuxt/BMYPR7BL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef7e-ThqlbJVBl2xQMgnJxRAnIDiBf68\"",
    "mtime": "2025-02-20T11:45:08.293Z",
    "size": 61310,
    "path": "../public/_nuxt/BMYPR7BL.js"
  },
  "/_nuxt/BMjYHr_A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a3f-bnwS3hB3zP5ygcKnYLknuasMz+Y\"",
    "mtime": "2025-02-20T11:45:08.293Z",
    "size": 10815,
    "path": "../public/_nuxt/BMjYHr_A.js"
  },
  "/_nuxt/BN7Hg25s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97b-1gGwKNrk8ChmTR2zn6AxJSknJ1s\"",
    "mtime": "2025-02-20T11:45:08.293Z",
    "size": 2427,
    "path": "../public/_nuxt/BN7Hg25s.js"
  },
  "/_nuxt/BNw1qcRV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f9f-RYiHlfi/FmpQgxiqXDvHs1RTfqw\"",
    "mtime": "2025-02-20T11:45:08.294Z",
    "size": 8095,
    "path": "../public/_nuxt/BNw1qcRV.js"
  },
  "/_nuxt/BOR0Rekm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92e-AZLAqocB2l2Ecrz255zX/0xoAaE\"",
    "mtime": "2025-02-20T11:45:08.294Z",
    "size": 2350,
    "path": "../public/_nuxt/BOR0Rekm.js"
  },
  "/_nuxt/BPhBrDlE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d227-7oRpJucwQoOcqa/utG1Tc2TMc4s\"",
    "mtime": "2025-02-20T11:45:08.295Z",
    "size": 53799,
    "path": "../public/_nuxt/BPhBrDlE.js"
  },
  "/_nuxt/BQcQLZzw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"656-8hhGFZcTMOkSIWHC1cluv6DYIFk\"",
    "mtime": "2025-02-20T11:45:08.294Z",
    "size": 1622,
    "path": "../public/_nuxt/BQcQLZzw.js"
  },
  "/_nuxt/BQoSv7ci.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b64-3Hkq258bKK+kQ+p/6TpLfDJxISs\"",
    "mtime": "2025-02-20T11:45:08.295Z",
    "size": 2916,
    "path": "../public/_nuxt/BQoSv7ci.js"
  },
  "/_nuxt/BQqOBYOt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30f-DFefkXRPVNlNKqV9hwp3odATW2k\"",
    "mtime": "2025-02-20T11:45:08.295Z",
    "size": 783,
    "path": "../public/_nuxt/BQqOBYOt.js"
  },
  "/_nuxt/BSZjDM4v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12c7-twEn/VlHTRo3zWeArvwvfu1IkrE\"",
    "mtime": "2025-02-20T11:45:08.295Z",
    "size": 4807,
    "path": "../public/_nuxt/BSZjDM4v.js"
  },
  "/_nuxt/BSn50F78.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"317-3FnplqiwX56zzeBLHfVdjeILE+I\"",
    "mtime": "2025-02-20T11:45:08.296Z",
    "size": 791,
    "path": "../public/_nuxt/BSn50F78.js"
  },
  "/_nuxt/BT43cFF4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"815-Gu9v3Ip+Ai5wtN8ktXEdXNkxwRU\"",
    "mtime": "2025-02-20T11:45:08.296Z",
    "size": 2069,
    "path": "../public/_nuxt/BT43cFF4.js"
  },
  "/_nuxt/BUQQrMoF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ab-qO0dpYOszHNxEaI2+DrNsi0gubs\"",
    "mtime": "2025-02-20T11:45:08.296Z",
    "size": 939,
    "path": "../public/_nuxt/BUQQrMoF.js"
  },
  "/_nuxt/BVWBbkPw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27a-+JWzpYIg88HIFogyNTZ1gndFuWY\"",
    "mtime": "2025-02-20T11:45:08.296Z",
    "size": 634,
    "path": "../public/_nuxt/BVWBbkPw.js"
  },
  "/_nuxt/BWDZoCOh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1044-xRUerCq/L6133hkbj3i4/pIyC/0\"",
    "mtime": "2025-02-20T11:45:08.299Z",
    "size": 4164,
    "path": "../public/_nuxt/BWDZoCOh.js"
  },
  "/_nuxt/BXUEaScT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"465-UjTHC3YdsPgYg6FqDp1SX0Yjgqo\"",
    "mtime": "2025-02-20T11:45:08.299Z",
    "size": 1125,
    "path": "../public/_nuxt/BXUEaScT.js"
  },
  "/_nuxt/BYZS6m_K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-lB4TVZqtAnstvPDTvjIbUXiX5TU\"",
    "mtime": "2025-02-20T11:45:08.299Z",
    "size": 580,
    "path": "../public/_nuxt/BYZS6m_K.js"
  },
  "/_nuxt/BZNvigVH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1673-rKaJUbR7/WeMWfhudBt8LjJAqA8\"",
    "mtime": "2025-02-20T11:45:08.300Z",
    "size": 5747,
    "path": "../public/_nuxt/BZNvigVH.js"
  },
  "/_nuxt/Ba3mYYLI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9c5f-Mj8nxNBwrj1Ly3335LscW9c+rMA\"",
    "mtime": "2025-02-20T11:45:08.301Z",
    "size": 40031,
    "path": "../public/_nuxt/Ba3mYYLI.js"
  },
  "/_nuxt/Bcjmg1Ak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38b3b-si1LojSTuaanmckIGpdWPDIE/dk\"",
    "mtime": "2025-02-20T11:45:08.302Z",
    "size": 232251,
    "path": "../public/_nuxt/Bcjmg1Ak.js"
  },
  "/_nuxt/BcuJ5XMV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6697-hPjO8f9t/kLlZBR/35j7w0raQHU\"",
    "mtime": "2025-02-20T11:45:08.301Z",
    "size": 26263,
    "path": "../public/_nuxt/BcuJ5XMV.js"
  },
  "/_nuxt/BdAi1jBa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64d2-Hq1qlXjyaGHSkKGS+1BzqyD+9Oo\"",
    "mtime": "2025-02-20T11:45:08.302Z",
    "size": 25810,
    "path": "../public/_nuxt/BdAi1jBa.js"
  },
  "/_nuxt/BdKO8Zav.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bf21-HUOS03JhxmYfZwqINvEy74J8f8E\"",
    "mtime": "2025-02-20T11:45:08.304Z",
    "size": 48929,
    "path": "../public/_nuxt/BdKO8Zav.js"
  },
  "/_nuxt/BfvgReVJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"836-vREa0gApDBp0ds0W1+DdpNuPlVk\"",
    "mtime": "2025-02-20T11:45:08.303Z",
    "size": 2102,
    "path": "../public/_nuxt/BfvgReVJ.js"
  },
  "/_nuxt/BgMRiT3U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d43-vwo73V2tQvOzIO0D8W8HdMKkjkM\"",
    "mtime": "2025-02-20T11:45:08.307Z",
    "size": 3395,
    "path": "../public/_nuxt/BgMRiT3U.js"
  },
  "/_nuxt/Bkc02AR5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"547e-dvn4Fd0twdatLKhy5oqWUm4bhvw\"",
    "mtime": "2025-02-20T11:45:08.307Z",
    "size": 21630,
    "path": "../public/_nuxt/Bkc02AR5.js"
  },
  "/_nuxt/BmHVzp2v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156-0ytK1AdkFgWpz0uWSBfpwFu7Bko\"",
    "mtime": "2025-02-20T11:45:08.307Z",
    "size": 342,
    "path": "../public/_nuxt/BmHVzp2v.js"
  },
  "/_nuxt/Bn7K4fcV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90-LtXkM0edYwA+3O/r6GGmT84rSAo\"",
    "mtime": "2025-02-20T11:45:08.308Z",
    "size": 144,
    "path": "../public/_nuxt/Bn7K4fcV.js"
  },
  "/_nuxt/BnMrqG3P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69fc-BLIWxZcj0qygoKcXzUCl3cv2130\"",
    "mtime": "2025-02-20T11:45:08.308Z",
    "size": 27132,
    "path": "../public/_nuxt/BnMrqG3P.js"
  },
  "/_nuxt/Bneqetm1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11d7-36M+BuNh3yjzMK2Iy/LNx7j7QHU\"",
    "mtime": "2025-02-20T11:45:08.309Z",
    "size": 4567,
    "path": "../public/_nuxt/Bneqetm1.js"
  },
  "/_nuxt/BoNHBf0Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2-TfP5M0+tObBp4QlBqGQVdDG15V8\"",
    "mtime": "2025-02-20T11:45:08.309Z",
    "size": 210,
    "path": "../public/_nuxt/BoNHBf0Q.js"
  },
  "/_nuxt/BprdLu8Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a6-xbZdjRQ2gosYbaI5GybgxFXRGY0\"",
    "mtime": "2025-02-20T11:45:08.309Z",
    "size": 166,
    "path": "../public/_nuxt/BprdLu8Y.js"
  },
  "/_nuxt/BrvQKn6I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ba-qw/BpzQNGa9WEbz+gYd2YXTRAq8\"",
    "mtime": "2025-02-20T11:45:08.309Z",
    "size": 186,
    "path": "../public/_nuxt/BrvQKn6I.js"
  },
  "/_nuxt/BuJXcnF6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16b7-d0GcdVft9Hw2v7NBxaVAZayslzs\"",
    "mtime": "2025-02-20T11:45:08.319Z",
    "size": 5815,
    "path": "../public/_nuxt/BuJXcnF6.js"
  },
  "/_nuxt/BuPzkPfP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"194b-5nCdlOOQYn7hcxwshQQ4TPxRa/8\"",
    "mtime": "2025-02-20T11:45:08.319Z",
    "size": 6475,
    "path": "../public/_nuxt/BuPzkPfP.js"
  },
  "/_nuxt/BwQOo05w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ff7-CW5xfGYX9vri7nnm+MMBj5ofLdk\"",
    "mtime": "2025-02-20T11:45:08.310Z",
    "size": 4087,
    "path": "../public/_nuxt/BwQOo05w.js"
  },
  "/_nuxt/ByUWDzMO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"540-/nUeTGXxUdgLp8sZu6SilZHM1M0\"",
    "mtime": "2025-02-20T11:45:08.319Z",
    "size": 1344,
    "path": "../public/_nuxt/ByUWDzMO.js"
  },
  "/_nuxt/BzpIVaGY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f73-r9BLGDgyoLaaOrgEZChYdfsh8Zk\"",
    "mtime": "2025-02-20T11:45:08.319Z",
    "size": 3955,
    "path": "../public/_nuxt/BzpIVaGY.js"
  },
  "/_nuxt/BzwKVEFT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b50-Z+/G/yctBtfAHDdPzWvZBeifk78\"",
    "mtime": "2025-02-20T11:45:08.320Z",
    "size": 2896,
    "path": "../public/_nuxt/BzwKVEFT.js"
  },
  "/_nuxt/C-DLLqJE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ff-PWKQfOuKSU2q4V0c0JEgD+9Sqt0\"",
    "mtime": "2025-02-20T11:45:08.320Z",
    "size": 1023,
    "path": "../public/_nuxt/C-DLLqJE.js"
  },
  "/_nuxt/C0-hI3Jb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"200-Bn/t1Yb1+i+TlGGqZowsVRbSZVc\"",
    "mtime": "2025-02-20T11:45:08.320Z",
    "size": 512,
    "path": "../public/_nuxt/C0-hI3Jb.js"
  },
  "/_nuxt/C0OgpTy9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13d22-+2tWDb85dYiuqbelNntpnGMzlHw\"",
    "mtime": "2025-02-20T11:45:08.321Z",
    "size": 81186,
    "path": "../public/_nuxt/C0OgpTy9.js"
  },
  "/_nuxt/C2-R6T1U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59a1-VZbljnAhgtaYw6PiHiUpbR4dFbM\"",
    "mtime": "2025-02-20T11:45:08.321Z",
    "size": 22945,
    "path": "../public/_nuxt/C2-R6T1U.js"
  },
  "/_nuxt/C3Gn_uJK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"652-unmA3eX14wtzZiiBzZq/92mvoCY\"",
    "mtime": "2025-02-20T11:45:08.321Z",
    "size": 1618,
    "path": "../public/_nuxt/C3Gn_uJK.js"
  },
  "/_nuxt/C3Mn_kJy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"114a3-M27+a9q8LHkIh/IryZ6V/TiOjEA\"",
    "mtime": "2025-02-20T11:45:08.322Z",
    "size": 70819,
    "path": "../public/_nuxt/C3Mn_kJy.js"
  },
  "/_nuxt/C3f8Ysf7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c34-oFv+jsTxXHstmajyod19ibaqmhg\"",
    "mtime": "2025-02-20T11:45:08.321Z",
    "size": 3124,
    "path": "../public/_nuxt/C3f8Ysf7.js"
  },
  "/_nuxt/C3idC2hE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"663-SlkHXkopRK0zWRR2MqQ+nBMZf/U\"",
    "mtime": "2025-02-20T11:45:08.322Z",
    "size": 1635,
    "path": "../public/_nuxt/C3idC2hE.js"
  },
  "/_nuxt/C4DGRd-O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a38-CylxeV6tkC8WNoAqtJQsYsnT1rk\"",
    "mtime": "2025-02-20T11:45:08.322Z",
    "size": 2616,
    "path": "../public/_nuxt/C4DGRd-O.js"
  },
  "/_nuxt/C4LP7Hcl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25e-g9QCecH5DQ1bgq9XQ8hg/UBC6vM\"",
    "mtime": "2025-02-20T11:45:08.324Z",
    "size": 606,
    "path": "../public/_nuxt/C4LP7Hcl.js"
  },
  "/_nuxt/C4Nsj8zu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b6-rZjjB/H+WVpNKtvDiBAXKmr2vG4\"",
    "mtime": "2025-02-20T11:45:08.324Z",
    "size": 2230,
    "path": "../public/_nuxt/C4Nsj8zu.js"
  },
  "/_nuxt/C4g8LzGK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90d0-XV+Q+NWNvKVTWphJnb/g8lPopa0\"",
    "mtime": "2025-02-20T11:45:08.325Z",
    "size": 37072,
    "path": "../public/_nuxt/C4g8LzGK.js"
  },
  "/_nuxt/C6RDOZhf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2034-iQtXMdqgAH3R04z9SsHXFudwbK0\"",
    "mtime": "2025-02-20T11:45:08.325Z",
    "size": 8244,
    "path": "../public/_nuxt/C6RDOZhf.js"
  },
  "/_nuxt/C78fOPTZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29b-t1+k46tbt13NbzZqsbOnyYWsuOA\"",
    "mtime": "2025-02-20T11:45:08.326Z",
    "size": 667,
    "path": "../public/_nuxt/C78fOPTZ.js"
  },
  "/_nuxt/C7v_XJAW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33f-fb1X9j6JAMwyUOA0KnSTVkce4Ec\"",
    "mtime": "2025-02-20T11:45:08.326Z",
    "size": 831,
    "path": "../public/_nuxt/C7v_XJAW.js"
  },
  "/_nuxt/CDlu_fPY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-1Qkt/MVVXIjRxcY/AirVlUsX6ac\"",
    "mtime": "2025-02-20T11:45:08.327Z",
    "size": 321,
    "path": "../public/_nuxt/CDlu_fPY.js"
  },
  "/_nuxt/CDyGwa7X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c2-7vuqMcb2oG5cn8Nk5aii6bsMmsY\"",
    "mtime": "2025-02-20T11:45:08.327Z",
    "size": 1986,
    "path": "../public/_nuxt/CDyGwa7X.js"
  },
  "/_nuxt/CFHJl5sT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e59-dwhojfQzryHqzl6IMu0/Bb2TFqk\"",
    "mtime": "2025-02-20T11:45:08.328Z",
    "size": 7769,
    "path": "../public/_nuxt/CFHJl5sT.js"
  },
  "/_nuxt/CG6Dc4jp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97f00-rYm+CybCMCqxOZ2Np2GsfIrREbo\"",
    "mtime": "2025-02-20T11:45:08.330Z",
    "size": 622336,
    "path": "../public/_nuxt/CG6Dc4jp.js"
  },
  "/_nuxt/CGOzndHr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f95-pVqoo0C97VneQj+svUbshXPq5Qk\"",
    "mtime": "2025-02-20T11:45:08.330Z",
    "size": 3989,
    "path": "../public/_nuxt/CGOzndHr.js"
  },
  "/_nuxt/CIBuHeNm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-Ry9OpltrrOF986+UtEDe7iH8au8\"",
    "mtime": "2025-02-20T11:45:08.330Z",
    "size": 474,
    "path": "../public/_nuxt/CIBuHeNm.js"
  },
  "/_nuxt/CIWB_GMp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2-/QOjGbpd+FXR6e+SlcrZ/I+GtDc\"",
    "mtime": "2025-02-20T11:45:08.330Z",
    "size": 178,
    "path": "../public/_nuxt/CIWB_GMp.js"
  },
  "/_nuxt/CKLilsmF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c33-N0KU1lRAVKufj0bSnS+wVGOYUQg\"",
    "mtime": "2025-02-20T11:45:08.332Z",
    "size": 11315,
    "path": "../public/_nuxt/CKLilsmF.js"
  },
  "/_nuxt/CKsJNSqx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-AjuxGsL/oo2LCsyLsK3K4Q+3/cM\"",
    "mtime": "2025-02-20T11:45:08.332Z",
    "size": 580,
    "path": "../public/_nuxt/CKsJNSqx.js"
  },
  "/_nuxt/CMAmuVfn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97b-tReGSPvx3ARWcI6/Q/JtJ2DtygM\"",
    "mtime": "2025-02-20T11:45:08.332Z",
    "size": 2427,
    "path": "../public/_nuxt/CMAmuVfn.js"
  },
  "/_nuxt/CMCxJQZV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-znWx68XNoO9qKLld7Qt/fmaDHc8\"",
    "mtime": "2025-02-20T11:45:08.334Z",
    "size": 100,
    "path": "../public/_nuxt/CMCxJQZV.js"
  },
  "/_nuxt/CN1MU496.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"551-12YxR0LBE0ax8KTLlsrt4+QcQVo\"",
    "mtime": "2025-02-20T11:45:08.335Z",
    "size": 1361,
    "path": "../public/_nuxt/CN1MU496.js"
  },
  "/_nuxt/CN2zyHPj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f3-mbDGctgP1i9YVGGARmiEa3wXZTQ\"",
    "mtime": "2025-02-20T11:45:08.335Z",
    "size": 499,
    "path": "../public/_nuxt/CN2zyHPj.js"
  },
  "/_nuxt/CNhZ1qSd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"575-ihPON8Z8YUh2vjvUpYhECzfZmW8\"",
    "mtime": "2025-02-20T11:45:08.335Z",
    "size": 1397,
    "path": "../public/_nuxt/CNhZ1qSd.js"
  },
  "/_nuxt/CRVTQob4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f9d3-rXbxMl8+wH+nDlB8MWxPgBilif8\"",
    "mtime": "2025-02-20T11:45:08.337Z",
    "size": 457171,
    "path": "../public/_nuxt/CRVTQob4.js"
  },
  "/_nuxt/CRjxCua3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46eee-kdjYGjwWCoTbLKedgWmJwdJ8ccc\"",
    "mtime": "2025-02-20T11:45:08.336Z",
    "size": 290542,
    "path": "../public/_nuxt/CRjxCua3.js"
  },
  "/_nuxt/CTu-6PCP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"656-G3UZSa34P7Tw0n/dtK+KFlbyceY\"",
    "mtime": "2025-02-20T11:45:08.336Z",
    "size": 1622,
    "path": "../public/_nuxt/CTu-6PCP.js"
  },
  "/_nuxt/CV49qYfF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-Uo5JeR1/oYd2wZ26Rw0CdIzoMz0\"",
    "mtime": "2025-02-20T11:45:08.336Z",
    "size": 180,
    "path": "../public/_nuxt/CV49qYfF.js"
  },
  "/_nuxt/CVw76BM1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a29-KfZDVnTHK+jue/V0/82ZqiEGVoQ\"",
    "mtime": "2025-02-20T11:45:08.337Z",
    "size": 10793,
    "path": "../public/_nuxt/CVw76BM1.js"
  },
  "/_nuxt/CWMqh8Gs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"271-jPgU682z06hxakGn0rhh66t6tL4\"",
    "mtime": "2025-02-20T11:45:08.338Z",
    "size": 625,
    "path": "../public/_nuxt/CWMqh8Gs.js"
  },
  "/_nuxt/CX-kmq42.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-lLZQYfKcLI4seDhN6DNIrlId3Ys\"",
    "mtime": "2025-02-20T11:45:08.338Z",
    "size": 580,
    "path": "../public/_nuxt/CX-kmq42.js"
  },
  "/_nuxt/C_8OmSiT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12da-ihscV0D0R3Ix9EIAGf0uaBFh4Nk\"",
    "mtime": "2025-02-20T11:45:08.339Z",
    "size": 4826,
    "path": "../public/_nuxt/C_8OmSiT.js"
  },
  "/_nuxt/C_CwsFkJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de9-b/iha8a7ituYd7CFd8YilK6YRuU\"",
    "mtime": "2025-02-20T11:45:08.339Z",
    "size": 3561,
    "path": "../public/_nuxt/C_CwsFkJ.js"
  },
  "/_nuxt/Cabwm37j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1408-yJcFOwPhqDMWLPoCOAb1QW47C14\"",
    "mtime": "2025-02-20T11:45:08.339Z",
    "size": 5128,
    "path": "../public/_nuxt/Cabwm37j.js"
  },
  "/_nuxt/Cbov2Yme.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a52-bTUB6jvmjArngcTi+22DQQIfRAQ\"",
    "mtime": "2025-02-20T11:45:08.339Z",
    "size": 2642,
    "path": "../public/_nuxt/Cbov2Yme.js"
  },
  "/_nuxt/CdUhqbSi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"791-a03mR2W9lAav2DnPWV2Ot+yMNsY\"",
    "mtime": "2025-02-20T11:45:08.341Z",
    "size": 1937,
    "path": "../public/_nuxt/CdUhqbSi.js"
  },
  "/_nuxt/CdXCOZ3F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2619-rtqKWYGjGbGZG5x8wqUNYLxSXFY\"",
    "mtime": "2025-02-20T11:45:08.342Z",
    "size": 9753,
    "path": "../public/_nuxt/CdXCOZ3F.js"
  },
  "/_nuxt/Cg86bNeT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c2-ZNMo0gnkxYpzqUws//J8WE/zup4\"",
    "mtime": "2025-02-20T11:45:08.342Z",
    "size": 450,
    "path": "../public/_nuxt/Cg86bNeT.js"
  },
  "/_nuxt/ChK-085T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"360-Zw5nFUOUGoaKnMOBpZb/VdcEDmY\"",
    "mtime": "2025-02-20T11:45:08.342Z",
    "size": 864,
    "path": "../public/_nuxt/ChK-085T.js"
  },
  "/_nuxt/ChqWPjPk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"510-10uL4+h9hvaPbMaviD08Jevo8l0\"",
    "mtime": "2025-02-20T11:45:08.345Z",
    "size": 1296,
    "path": "../public/_nuxt/ChqWPjPk.js"
  },
  "/_nuxt/CiI51P6-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"574-gJPP5/WbX/sb2jmmmjjA8xMb2HY\"",
    "mtime": "2025-02-20T11:45:08.347Z",
    "size": 1396,
    "path": "../public/_nuxt/CiI51P6-.js"
  },
  "/_nuxt/CjFT_Tl9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a0b-TMrn13AvPZxLrJEXP5XkqBTemRE\"",
    "mtime": "2025-02-20T11:45:08.347Z",
    "size": 2571,
    "path": "../public/_nuxt/CjFT_Tl9.js"
  },
  "/_nuxt/Ck1zUtKM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"902-OnFiVodNmsLNuv5z7LQlgsFfjDs\"",
    "mtime": "2025-02-20T11:45:08.347Z",
    "size": 2306,
    "path": "../public/_nuxt/Ck1zUtKM.js"
  },
  "/_nuxt/Ck3Hc0QD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ba2-z54twG8EWZXr3/PFOz5yI1Vxm+A\"",
    "mtime": "2025-02-20T11:45:08.347Z",
    "size": 2978,
    "path": "../public/_nuxt/Ck3Hc0QD.js"
  },
  "/_nuxt/Cm8bTaHs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-b3bfCZrCNIVLBS5ajgtgB/d65is\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 175,
    "path": "../public/_nuxt/Cm8bTaHs.js"
  },
  "/_nuxt/CmGdzxic.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f40-vHhsqgEar8aB6YsABjjHbFIIs+0\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 3904,
    "path": "../public/_nuxt/CmGdzxic.js"
  },
  "/_nuxt/CnDTJFAw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a91-XPwM9rQDJlXP3PcumIKVz+kLK8k\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 6801,
    "path": "../public/_nuxt/CnDTJFAw.js"
  },
  "/_nuxt/CnHTOXQT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d7-elkNKybRkPVAu437KQ7GUMOTA+M\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 2007,
    "path": "../public/_nuxt/CnHTOXQT.js"
  },
  "/_nuxt/CnXjOkPa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d3-O0h4S2vkOSpTms+X2rNyy5W5P2Y\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 1747,
    "path": "../public/_nuxt/CnXjOkPa.js"
  },
  "/_nuxt/CnydiIhH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70f-Aq2J5vHiDoeektgwv6r8EweXlBI\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 1807,
    "path": "../public/_nuxt/CnydiIhH.js"
  },
  "/_nuxt/Coqi7tDf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f-ha9sTkYnzLpwxcV6fIi65SKOBJU\"",
    "mtime": "2025-02-20T11:45:08.348Z",
    "size": 127,
    "path": "../public/_nuxt/Coqi7tDf.js"
  },
  "/_nuxt/Coz-4G0c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc-Cpv4D+Os6F85ZQMPfRxDlJT2iDI\"",
    "mtime": "2025-02-20T11:45:08.349Z",
    "size": 188,
    "path": "../public/_nuxt/Coz-4G0c.js"
  },
  "/_nuxt/Cq9hK5qc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"548-8RJGkaRJ8dEfRDhBLEMTIZft8Vc\"",
    "mtime": "2025-02-20T11:45:08.349Z",
    "size": 1352,
    "path": "../public/_nuxt/Cq9hK5qc.js"
  },
  "/_nuxt/CsXdQQw6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ae-/KcpplArrZFEOEZII5i1Dukx6YY\"",
    "mtime": "2025-02-20T11:45:08.349Z",
    "size": 430,
    "path": "../public/_nuxt/CsXdQQw6.js"
  },
  "/_nuxt/Cu5O4Ujl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a0-lyaKaATRS7QQWZUarErezmW3GaU\"",
    "mtime": "2025-02-20T11:45:08.349Z",
    "size": 416,
    "path": "../public/_nuxt/Cu5O4Ujl.js"
  },
  "/_nuxt/Cw4ziVa0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9d3-+Oiin7zy9QKxvcGokonQhGp168U\"",
    "mtime": "2025-02-20T11:45:08.350Z",
    "size": 2515,
    "path": "../public/_nuxt/Cw4ziVa0.js"
  },
  "/_nuxt/Cwv1VCaj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-iF8UqO3wjP+4TSdQS6abyG2B57Y\"",
    "mtime": "2025-02-20T11:45:08.350Z",
    "size": 175,
    "path": "../public/_nuxt/Cwv1VCaj.js"
  },
  "/_nuxt/D0U42jzU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-yrAX1ud7effZ5c06AU0iA3XhQXs\"",
    "mtime": "2025-02-20T11:45:08.350Z",
    "size": 579,
    "path": "../public/_nuxt/D0U42jzU.js"
  },
  "/_nuxt/D0s39XTH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90-HY+1FYbSJI2FbYqRDnLBXGg1244\"",
    "mtime": "2025-02-20T11:45:08.350Z",
    "size": 144,
    "path": "../public/_nuxt/D0s39XTH.js"
  },
  "/_nuxt/D2hJH4YF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f5-dmobJK74h7Dt0U3JwiGaauG/b5k\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 1781,
    "path": "../public/_nuxt/D2hJH4YF.js"
  },
  "/_nuxt/D2iVDMXf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"118d-b9frk2D7cwR2NxeWKj/McEqTbfc\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 4493,
    "path": "../public/_nuxt/D2iVDMXf.js"
  },
  "/_nuxt/D3cDmouS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f3-OSBnZO5shJGcLn8g4NmUC0wt3sg\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 499,
    "path": "../public/_nuxt/D3cDmouS.js"
  },
  "/_nuxt/D4DN14Tf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2-ZQxLB6LDf9nkoBy1VIHghwIix7E\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 178,
    "path": "../public/_nuxt/D4DN14Tf.js"
  },
  "/_nuxt/D4NPbgj4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-FKz1dFoDS0RFeSEC2V0gfAPfrP4\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 580,
    "path": "../public/_nuxt/D4NPbgj4.js"
  },
  "/_nuxt/D4h5O-jR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ecc-X4WIf5/MKovdXkpn2ucY2Fvz+nI\"",
    "mtime": "2025-02-20T11:45:08.352Z",
    "size": 7884,
    "path": "../public/_nuxt/D4h5O-jR.js"
  },
  "/_nuxt/D7QpfO6c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"565-AQo+9Lgt58nqEYazcbftml4FAJQ\"",
    "mtime": "2025-02-20T11:45:08.351Z",
    "size": 1381,
    "path": "../public/_nuxt/D7QpfO6c.js"
  },
  "/_nuxt/D7y2-I-4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-/CDgykR+2q1eoLamV0x4aXzOdho\"",
    "mtime": "2025-02-20T11:45:08.353Z",
    "size": 175,
    "path": "../public/_nuxt/D7y2-I-4.js"
  },
  "/_nuxt/D9Dt4D0W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"102b-pzPFOaVufiyE1YwWZrBTrCmkhxE\"",
    "mtime": "2025-02-20T11:45:08.353Z",
    "size": 4139,
    "path": "../public/_nuxt/D9Dt4D0W.js"
  },
  "/_nuxt/DBKNyK5s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"913-JNIFxTycsFfR24dy75Mxh0lwBEc\"",
    "mtime": "2025-02-20T11:45:08.353Z",
    "size": 2323,
    "path": "../public/_nuxt/DBKNyK5s.js"
  },
  "/_nuxt/DBlCnlav.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"350-W/j73uiF9oxpuOzp4/xe12/JXII\"",
    "mtime": "2025-02-20T11:45:08.353Z",
    "size": 848,
    "path": "../public/_nuxt/DBlCnlav.js"
  },
  "/_nuxt/DBm57jXL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30ff3-RTW8zw22BqTmsDVtYESkTSNaXKg\"",
    "mtime": "2025-02-20T11:45:08.355Z",
    "size": 200691,
    "path": "../public/_nuxt/DBm57jXL.js"
  },
  "/_nuxt/DBw_kmFK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d42-WWb1htf8h1C0pvO7dlHedhn3q1o\"",
    "mtime": "2025-02-20T11:45:08.354Z",
    "size": 3394,
    "path": "../public/_nuxt/DBw_kmFK.js"
  },
  "/_nuxt/DDtLYa_d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13db-rjxHW+G/iiatftlAApYFkySvKls\"",
    "mtime": "2025-02-20T11:45:08.354Z",
    "size": 5083,
    "path": "../public/_nuxt/DDtLYa_d.js"
  },
  "/_nuxt/DFLus7Mh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c2-qEu5LwjcZhyIL6AgTCA5UMR9XpM\"",
    "mtime": "2025-02-20T11:45:08.354Z",
    "size": 962,
    "path": "../public/_nuxt/DFLus7Mh.js"
  },
  "/_nuxt/DF_7sFjM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80b-0VuaWO4Z20J89uVLSegrylfzc6Q\"",
    "mtime": "2025-02-20T11:45:08.357Z",
    "size": 2059,
    "path": "../public/_nuxt/DF_7sFjM.js"
  },
  "/_nuxt/DGYXhP31.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cb1-CBxGs3g6yI/Til8lz0MQ8B7+LsY\"",
    "mtime": "2025-02-20T11:45:08.357Z",
    "size": 3249,
    "path": "../public/_nuxt/DGYXhP31.js"
  },
  "/_nuxt/DGsrx4ib.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ed-4esZ2vfeAVFDHtodjruLHzmZxko\"",
    "mtime": "2025-02-20T11:45:08.357Z",
    "size": 493,
    "path": "../public/_nuxt/DGsrx4ib.js"
  },
  "/_nuxt/DHho59qG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9dd-rRQzobUCHn8t++6mpofI8llCW8o\"",
    "mtime": "2025-02-20T11:45:08.358Z",
    "size": 2525,
    "path": "../public/_nuxt/DHho59qG.js"
  },
  "/_nuxt/DIg2PSTM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69d-MdKCw4gJAc0IRsvtl8zwf7IP/o8\"",
    "mtime": "2025-02-20T11:45:08.358Z",
    "size": 1693,
    "path": "../public/_nuxt/DIg2PSTM.js"
  },
  "/_nuxt/DLbd_Dcw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137-J32QKvD3jZHNpQ5iDrcSJd6L40U\"",
    "mtime": "2025-02-20T11:45:08.359Z",
    "size": 311,
    "path": "../public/_nuxt/DLbd_Dcw.js"
  },
  "/_nuxt/DMA9R1ak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9ef-cuCZFM83+8nE1R+YxFnJWw7osAA\"",
    "mtime": "2025-02-20T11:45:08.359Z",
    "size": 2543,
    "path": "../public/_nuxt/DMA9R1ak.js"
  },
  "/_nuxt/DMQUSz-_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6919-/dY+HR7y3Jw0r75MbOYJHA3DyKE\"",
    "mtime": "2025-02-20T11:45:08.359Z",
    "size": 26905,
    "path": "../public/_nuxt/DMQUSz-_.js"
  },
  "/_nuxt/DO-Gjzrf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"add-eF0z+5+hZFYkWOPVFXELE2MDM80\"",
    "mtime": "2025-02-20T11:45:08.360Z",
    "size": 2781,
    "path": "../public/_nuxt/DO-Gjzrf.js"
  },
  "/_nuxt/DPfTpBK9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16864-H4f3fXdPPuts9m/6AwKd2Y+/qAg\"",
    "mtime": "2025-02-20T11:45:08.360Z",
    "size": 92260,
    "path": "../public/_nuxt/DPfTpBK9.js"
  },
  "/_nuxt/DQifDi7g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1736e-dNXo0/mTeJYCuv9o+YiIJQKL0x4\"",
    "mtime": "2025-02-20T11:45:08.361Z",
    "size": 95086,
    "path": "../public/_nuxt/DQifDi7g.js"
  },
  "/_nuxt/DSQz3UXp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f453-EPuMSEVKMN5XO+AOAKlH1zweWnY\"",
    "mtime": "2025-02-20T11:45:08.367Z",
    "size": 652371,
    "path": "../public/_nuxt/DSQz3UXp.js"
  },
  "/_nuxt/DSad5W19.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14e58-nF3XhIPl8I9b3+xgka9cUiAmdKs\"",
    "mtime": "2025-02-20T11:45:08.365Z",
    "size": 85592,
    "path": "../public/_nuxt/DSad5W19.js"
  },
  "/_nuxt/DT3LP0dY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"79-xttyvqWkipyUoTME6mvKqnsFZNQ\"",
    "mtime": "2025-02-20T11:45:08.363Z",
    "size": 121,
    "path": "../public/_nuxt/DT3LP0dY.js"
  },
  "/_nuxt/DTYp-o1l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-jtdTVcPC01bUjNNbHsw33TUKUBI\"",
    "mtime": "2025-02-20T11:45:08.363Z",
    "size": 177,
    "path": "../public/_nuxt/DTYp-o1l.js"
  },
  "/_nuxt/DTrFuWx2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77c-KDyCLr975q/BsxuznEF2gewyX98\"",
    "mtime": "2025-02-20T11:45:08.364Z",
    "size": 1916,
    "path": "../public/_nuxt/DTrFuWx2.js"
  },
  "/_nuxt/DU8OuEeG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aec-PQEVPJo93l/beBzFPkcdxPsYWVU\"",
    "mtime": "2025-02-20T11:45:08.365Z",
    "size": 10988,
    "path": "../public/_nuxt/DU8OuEeG.js"
  },
  "/_nuxt/DUYO_cvP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b77-GWi4VloLY+NPY/EE1S2OKlxNyoY\"",
    "mtime": "2025-02-20T11:45:08.368Z",
    "size": 2935,
    "path": "../public/_nuxt/DUYO_cvP.js"
  },
  "/_nuxt/DYsAlyEM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31ad-4Ax5RrPS0KWflxYYCcu6vV2iKaA\"",
    "mtime": "2025-02-20T11:45:08.368Z",
    "size": 12717,
    "path": "../public/_nuxt/DYsAlyEM.js"
  },
  "/_nuxt/DYz_wnZ1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"122c-HFpuJCvimy2mde2Vpdg6lComrks\"",
    "mtime": "2025-02-20T11:45:08.368Z",
    "size": 4652,
    "path": "../public/_nuxt/DYz_wnZ1.js"
  },
  "/_nuxt/DbHgGBPj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c20-VOXczN67oW+QIhbc38Y42xD6zGE\"",
    "mtime": "2025-02-20T11:45:08.369Z",
    "size": 101408,
    "path": "../public/_nuxt/DbHgGBPj.js"
  },
  "/_nuxt/DbItnlRl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"135-iKoNteNzucuZpKMc/f8fhN9OpPU\"",
    "mtime": "2025-02-20T11:45:08.370Z",
    "size": 309,
    "path": "../public/_nuxt/DbItnlRl.js"
  },
  "/_nuxt/DbOWO1BC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"180-oFk235hMmlrtd7mcvniVWdIgRQI\"",
    "mtime": "2025-02-20T11:45:08.369Z",
    "size": 384,
    "path": "../public/_nuxt/DbOWO1BC.js"
  },
  "/_nuxt/Dbc09XpZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b3-+tPZd3iI0Wvdi0RQMU0h+3HurdU\"",
    "mtime": "2025-02-20T11:45:08.369Z",
    "size": 179,
    "path": "../public/_nuxt/Dbc09XpZ.js"
  },
  "/_nuxt/Dc1JOy9r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae4-NUU0j+JASz1UDU4xXNM46TogNRE\"",
    "mtime": "2025-02-20T11:45:08.370Z",
    "size": 2788,
    "path": "../public/_nuxt/Dc1JOy9r.js"
  },
  "/_nuxt/DdIZxoE0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cad-Ag5o9p4F/Djr8tWoCEUn/sAmGPM\"",
    "mtime": "2025-02-20T11:45:08.370Z",
    "size": 7341,
    "path": "../public/_nuxt/DdIZxoE0.js"
  },
  "/_nuxt/DdXL0SIy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d54-pI5SMI2hZJN6o1/rrFTJ3Cd8w/I\"",
    "mtime": "2025-02-20T11:45:08.370Z",
    "size": 3412,
    "path": "../public/_nuxt/DdXL0SIy.js"
  },
  "/_nuxt/DehyRSwq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"362-O3fim2FTRqQbD5Nike7nHACpoEk\"",
    "mtime": "2025-02-20T11:45:08.371Z",
    "size": 866,
    "path": "../public/_nuxt/DehyRSwq.js"
  },
  "/_nuxt/Df11BRmG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"312-zgv63uF9+m69mVQpB/3X2oZack4\"",
    "mtime": "2025-02-20T11:45:08.371Z",
    "size": 786,
    "path": "../public/_nuxt/Df11BRmG.js"
  },
  "/_nuxt/DgCEG-0m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13af-h1/M5ZTwLKY2qDc3RW4WZkW9GIE\"",
    "mtime": "2025-02-20T11:45:08.371Z",
    "size": 5039,
    "path": "../public/_nuxt/DgCEG-0m.js"
  },
  "/_nuxt/DgrZC8Kp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53bb-LcZ4f8ZFG/8pRuCWJdaDlJdhRN0\"",
    "mtime": "2025-02-20T11:45:08.372Z",
    "size": 21435,
    "path": "../public/_nuxt/DgrZC8Kp.js"
  },
  "/_nuxt/Dj5kSLHa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f5e-WlNAUC4Og/1fYCnncLDezlsEZqQ\"",
    "mtime": "2025-02-20T11:45:08.377Z",
    "size": 20318,
    "path": "../public/_nuxt/Dj5kSLHa.js"
  },
  "/_nuxt/Dj6nwHGl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33080-PHp9OtcBpJaL17dBPjYizkICOYA\"",
    "mtime": "2025-02-20T11:45:08.377Z",
    "size": 209024,
    "path": "../public/_nuxt/Dj6nwHGl.js"
  },
  "/_nuxt/DkX4rCTl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-sNpxalZJxVKJ/z8dirjdYaW64NY\"",
    "mtime": "2025-02-20T11:45:08.376Z",
    "size": 175,
    "path": "../public/_nuxt/DkX4rCTl.js"
  },
  "/_nuxt/DkYu6x3z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dd9-3MUWvjAjkneJnafow3LlXxEOwhI\"",
    "mtime": "2025-02-20T11:45:08.376Z",
    "size": 3545,
    "path": "../public/_nuxt/DkYu6x3z.js"
  },
  "/_nuxt/DlP9HciU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"345-+4LOqVRAMpCeP4MQ3eJ0CqaN8OA\"",
    "mtime": "2025-02-20T11:45:08.378Z",
    "size": 837,
    "path": "../public/_nuxt/DlP9HciU.js"
  },
  "/_nuxt/DoFEwaud.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23e-SEs3SSK9EqmE9URW/OLAR5ResCw\"",
    "mtime": "2025-02-20T11:45:08.378Z",
    "size": 574,
    "path": "../public/_nuxt/DoFEwaud.js"
  },
  "/_nuxt/Dq6fSHCB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a61-x/Cy20NM0gg/0C0OT2DXeVAZEmE\"",
    "mtime": "2025-02-20T11:45:08.378Z",
    "size": 2657,
    "path": "../public/_nuxt/Dq6fSHCB.js"
  },
  "/_nuxt/DqndaKoR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-t2mhUmlX6XC9wVXwhbXSOjQ/vwo\"",
    "mtime": "2025-02-20T11:45:08.378Z",
    "size": 100,
    "path": "../public/_nuxt/DqndaKoR.js"
  },
  "/_nuxt/DrumaeyD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-eK+LbYSi7pS0ppZIgB0THjsF//Y\"",
    "mtime": "2025-02-20T11:45:08.379Z",
    "size": 580,
    "path": "../public/_nuxt/DrumaeyD.js"
  },
  "/_nuxt/Dsg3ZxQb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"702e-IsFr6pGeZlgsBfx51bGpoveTVjw\"",
    "mtime": "2025-02-20T11:45:08.380Z",
    "size": 28718,
    "path": "../public/_nuxt/Dsg3ZxQb.js"
  },
  "/_nuxt/DuME0IfC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1509-x4Zh2hxD4bhUJ1ND15203y+4fTY\"",
    "mtime": "2025-02-20T11:45:08.380Z",
    "size": 5385,
    "path": "../public/_nuxt/DuME0IfC.js"
  },
  "/_nuxt/DwRh75JA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fd3-Ch05H7ujPtjXf7WNKuZyroZASm4\"",
    "mtime": "2025-02-20T11:45:08.380Z",
    "size": 4051,
    "path": "../public/_nuxt/DwRh75JA.js"
  },
  "/_nuxt/DzWey9um.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49a-rX2A8SdO7oax5SG2sljOwRJKajo\"",
    "mtime": "2025-02-20T11:45:08.381Z",
    "size": 1178,
    "path": "../public/_nuxt/DzWey9um.js"
  },
  "/_nuxt/ENBdVkOQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3fb5-QbthiAIVIqrMjbq638EZblClXhc\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 16309,
    "path": "../public/_nuxt/ENBdVkOQ.js"
  },
  "/_nuxt/Ffai-XNe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f0-Z5RFrlG+6Q0NSJKuIxBBS9NHTTs\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 2544,
    "path": "../public/_nuxt/Ffai-XNe.js"
  },
  "/_nuxt/Hint.qK0h8laA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39-STVZF0s9OHgdg16V44Q+RqLcHsA\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 57,
    "path": "../public/_nuxt/Hint.qK0h8laA.css"
  },
  "/_nuxt/Hz9HOZM7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d7-C5cQ6t4wd3M3XSWve4Yg0xvd/w8\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 1751,
    "path": "../public/_nuxt/Hz9HOZM7.js"
  },
  "/_nuxt/Kvtd6kyn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"81b-En9t/MZ9xb1v1U0h4wrBF3fb/OM\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 2075,
    "path": "../public/_nuxt/Kvtd6kyn.js"
  },
  "/_nuxt/LandingTeaserGrid.CWzXEV1s.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"72-iXd1kQtxUOV5rxCI2OiAwJoVieU\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 114,
    "path": "../public/_nuxt/LandingTeaserGrid.CWzXEV1s.css"
  },
  "/_nuxt/Lp7qdW-F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae62-MNsDnok2XnSJwv2bn/m/Vlaa9QE\"",
    "mtime": "2025-02-20T11:45:08.383Z",
    "size": 44642,
    "path": "../public/_nuxt/Lp7qdW-F.js"
  },
  "/_nuxt/ProsePre.D5orA6B_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e-jczvRAVUXbzGL6yotozKFbyMO4s\"",
    "mtime": "2025-02-20T11:45:08.382Z",
    "size": 30,
    "path": "../public/_nuxt/ProsePre.D5orA6B_.css"
  },
  "/_nuxt/S37ZYGWr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f1c-C79rmrw8Aapy/dpLhOPAtBEAOjo\"",
    "mtime": "2025-02-20T11:45:08.383Z",
    "size": 3868,
    "path": "../public/_nuxt/S37ZYGWr.js"
  },
  "/_nuxt/S53pbjXH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-ZZ4LO2d+Tcy/PDxTV/WHeBBRHMw\"",
    "mtime": "2025-02-20T11:45:08.383Z",
    "size": 100,
    "path": "../public/_nuxt/S53pbjXH.js"
  },
  "/_nuxt/SideBarLevel.D8-KbwtF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ee-XNz+W9u78SWucww4OZB/YAXfaRE\"",
    "mtime": "2025-02-20T11:45:08.383Z",
    "size": 238,
    "path": "../public/_nuxt/SideBarLevel.D8-KbwtF.css"
  },
  "/_nuxt/SjHAIU92.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140a-oa2TteYUwUMj6+FSzKnUqbQNxfc\"",
    "mtime": "2025-02-20T11:45:08.383Z",
    "size": 5130,
    "path": "../public/_nuxt/SjHAIU92.js"
  },
  "/_nuxt/UIAJJxZW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de9b-FeoLF/YrLurLxbDo9OD1mlec0ps\"",
    "mtime": "2025-02-20T11:45:08.384Z",
    "size": 56987,
    "path": "../public/_nuxt/UIAJJxZW.js"
  },
  "/_nuxt/VpzWduSd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a60-oQNXbH2cwA/N2rBeXJUW7ZIE3ys\"",
    "mtime": "2025-02-20T11:45:08.384Z",
    "size": 2656,
    "path": "../public/_nuxt/VpzWduSd.js"
  },
  "/_nuxt/VqIxK8tf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a07-/eDP/7e/Ikru6iVka+cxkZOj9zg\"",
    "mtime": "2025-02-20T11:45:08.384Z",
    "size": 6663,
    "path": "../public/_nuxt/VqIxK8tf.js"
  },
  "/_nuxt/WRlm2TX8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a39-O2c+d/vUhXwL/hhkVMExnoOIjAQ\"",
    "mtime": "2025-02-20T11:45:08.384Z",
    "size": 6713,
    "path": "../public/_nuxt/WRlm2TX8.js"
  },
  "/_nuxt/YevNB6hB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"475-3F3jJdze7tM7msdaZrazpG88FYQ\"",
    "mtime": "2025-02-20T11:45:08.384Z",
    "size": 1141,
    "path": "../public/_nuxt/YevNB6hB.js"
  },
  "/_nuxt/ZUOGA8zP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"696-AL/G8ePzgxgwG3T7Q/1xW6xXN2o\"",
    "mtime": "2025-02-20T11:45:08.385Z",
    "size": 1686,
    "path": "../public/_nuxt/ZUOGA8zP.js"
  },
  "/_nuxt/ZXfAyPTL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9d5-e97eMejt72jA1LVSCEz2L9N/0jA\"",
    "mtime": "2025-02-20T11:45:08.385Z",
    "size": 2517,
    "path": "../public/_nuxt/ZXfAyPTL.js"
  },
  "/_nuxt/ZnEupP5q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f97-JiY9lZd4BmidwREqB+A6bL0TAco\"",
    "mtime": "2025-02-20T11:45:08.385Z",
    "size": 3991,
    "path": "../public/_nuxt/ZnEupP5q.js"
  },
  "/_nuxt/_AkZj6fF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67c-1GCgXeS4SFN5Z9Yidy59pVZesXQ\"",
    "mtime": "2025-02-20T11:45:08.385Z",
    "size": 1660,
    "path": "../public/_nuxt/_AkZj6fF.js"
  },
  "/_nuxt/_DqIKt4u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da4-NpEV8Cf9z4Osmbopi0zecWY4AXA\"",
    "mtime": "2025-02-20T11:45:08.385Z",
    "size": 3492,
    "path": "../public/_nuxt/_DqIKt4u.js"
  },
  "/_nuxt/_hGpxIKP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"184f-Fy8J3+VyvXedVpGAHKoxyz6Ajvw\"",
    "mtime": "2025-02-20T11:45:08.386Z",
    "size": 6223,
    "path": "../public/_nuxt/_hGpxIKP.js"
  },
  "/_nuxt/atvbtKCR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a6d9-+G1uBoxn9DzOzOSGG1oOFieSfrw\"",
    "mtime": "2025-02-20T11:45:08.386Z",
    "size": 42713,
    "path": "../public/_nuxt/atvbtKCR.js"
  },
  "/_nuxt/bNaE6FFb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f-q42BFfiRogfcH1Y60YZFuPDwE5Q\"",
    "mtime": "2025-02-20T11:45:08.386Z",
    "size": 79,
    "path": "../public/_nuxt/bNaE6FFb.js"
  },
  "/_nuxt/bTLz1t2b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-TjCIhBSpgmbWGbOP31lBDOhr1wc\"",
    "mtime": "2025-02-20T11:45:08.386Z",
    "size": 100,
    "path": "../public/_nuxt/bTLz1t2b.js"
  },
  "/_nuxt/ch4rkcr2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3640-xlbcw2ohzDpkNwJn0E/6qVEQFFg\"",
    "mtime": "2025-02-20T11:45:08.386Z",
    "size": 13888,
    "path": "../public/_nuxt/ch4rkcr2.js"
  },
  "/_nuxt/dcZl70xG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18a-FdmrI1Z1qfxpqtwKjtoQcEv3liU\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 394,
    "path": "../public/_nuxt/dcZl70xG.js"
  },
  "/_nuxt/dipk9cTn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a8b-jonadA/GfEYT2tHxG5kC4MeFmI0\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 6795,
    "path": "../public/_nuxt/dipk9cTn.js"
  },
  "/_nuxt/docs.DSpqFxOi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"67-exLK76+j5+fJ6Bf2dMVV/O/8Ajw\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 103,
    "path": "../public/_nuxt/docs.DSpqFxOi.css"
  },
  "/_nuxt/error-404.7C66WSsj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-4wyqV1Eukpfdyg7toHZCLYOjOtk\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.7C66WSsj.css"
  },
  "/_nuxt/error-500.DKV8V_Qr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-38FFP9VJoMcEIhLpBcRdpR4FEcM\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.DKV8V_Qr.css"
  },
  "/_nuxt/gVu3Rg8e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2abc-RFzBCiWHJNZOaiX7GzdMZ3TsI8A\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 10940,
    "path": "../public/_nuxt/gVu3Rg8e.js"
  },
  "/_nuxt/hcftUACO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f26-UFTrdnTrYpL0jzaVJhaJnipF2EQ\"",
    "mtime": "2025-02-20T11:45:08.388Z",
    "size": 40742,
    "path": "../public/_nuxt/hcftUACO.js"
  },
  "/_nuxt/heZmZLOM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27af-TlRoCc6JmX5to1abwsqDWHNfS6c\"",
    "mtime": "2025-02-20T11:45:08.387Z",
    "size": 10159,
    "path": "../public/_nuxt/heZmZLOM.js"
  },
  "/_nuxt/iSgyE4tI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42c4-wCE3qcNg8SnxAxXoSEYyPwqxDwk\"",
    "mtime": "2025-02-20T11:45:08.388Z",
    "size": 17092,
    "path": "../public/_nuxt/iSgyE4tI.js"
  },
  "/_nuxt/kq9sZchD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5bc-b0BtzTaVVP6hB1YZ0M1UgtdWI74\"",
    "mtime": "2025-02-20T11:45:08.388Z",
    "size": 1468,
    "path": "../public/_nuxt/kq9sZchD.js"
  },
  "/_nuxt/lSbBsy5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d14-gX6Arn5K0XGgU1+DzMtMeeJRUug\"",
    "mtime": "2025-02-20T11:45:08.388Z",
    "size": 3348,
    "path": "../public/_nuxt/lSbBsy5d.js"
  },
  "/_nuxt/m3dOiVG6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70f5d-RI050naiFFgonPShFLjIgtuPtPM\"",
    "mtime": "2025-02-20T11:45:08.389Z",
    "size": 462685,
    "path": "../public/_nuxt/m3dOiVG6.js"
  },
  "/_nuxt/oIydvzGM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b11-yzzIkS5iIlVpYYmBuNBU6/1Wub8\"",
    "mtime": "2025-02-20T11:45:08.389Z",
    "size": 19217,
    "path": "../public/_nuxt/oIydvzGM.js"
  },
  "/_nuxt/pRatUO7H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e87-4Sd67z21b858eZdNPWOSWUCsbOg\"",
    "mtime": "2025-02-20T11:45:08.388Z",
    "size": 3719,
    "path": "../public/_nuxt/pRatUO7H.js"
  },
  "/_nuxt/pv4rovob.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ee1-FnRM5M0dB7tei4z7WWmWyr+Qdmw\"",
    "mtime": "2025-02-20T11:45:08.389Z",
    "size": 7905,
    "path": "../public/_nuxt/pv4rovob.js"
  },
  "/_nuxt/qoAyLfif.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b-PRfbGjYowZ7hyvNwmoemROr2BYQ\"",
    "mtime": "2025-02-20T11:45:08.389Z",
    "size": 139,
    "path": "../public/_nuxt/qoAyLfif.js"
  },
  "/_nuxt/sqlite3-D0DavjUQ.wasm": {
    "type": "application/wasm",
    "etag": "\"d0435-K0kA/+fJ9aj6ESThXFJpDHbjxfs\"",
    "mtime": "2025-02-20T11:45:08.392Z",
    "size": 853045,
    "path": "../public/_nuxt/sqlite3-D0DavjUQ.wasm"
  },
  "/_nuxt/sqlite3-opfs-async-proxy-DZdsd1Kz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"254d-TWLxW7Q1OCg2wWR1nCUIyfrREog\"",
    "mtime": "2025-02-20T11:45:08.389Z",
    "size": 9549,
    "path": "../public/_nuxt/sqlite3-opfs-async-proxy-DZdsd1Kz.js"
  },
  "/_nuxt/sqlite3-worker1-bundler-friendly-S52FP0de.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3049d-ey1Z86NIntRKUs86YwYXeCsInLg\"",
    "mtime": "2025-02-20T11:45:08.391Z",
    "size": 197789,
    "path": "../public/_nuxt/sqlite3-worker1-bundler-friendly-S52FP0de.js"
  },
  "/_nuxt/sqlite3.D0DavjUQ.wasm": {
    "type": "application/wasm",
    "etag": "\"d0435-K0kA/+fJ9aj6ESThXFJpDHbjxfs\"",
    "mtime": "2025-02-20T11:45:08.392Z",
    "size": 853045,
    "path": "../public/_nuxt/sqlite3.D0DavjUQ.wasm"
  },
  "/_nuxt/tuetCS8h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec4-NGlnvCJ1X7cUw4KT7pzng/iKnSE\"",
    "mtime": "2025-02-20T11:45:08.391Z",
    "size": 3780,
    "path": "../public/_nuxt/tuetCS8h.js"
  },
  "/_nuxt/vLlmbW-K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"763-SFLhT0nMq4hoOD1+xUM3co7G+S4\"",
    "mtime": "2025-02-20T11:45:08.392Z",
    "size": 1891,
    "path": "../public/_nuxt/vLlmbW-K.js"
  },
  "/_nuxt/w3NHGvyK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18dd-3KKbRP3ygzSj+e8tPQTGRMgFfHQ\"",
    "mtime": "2025-02-20T11:45:08.391Z",
    "size": 6365,
    "path": "../public/_nuxt/w3NHGvyK.js"
  },
  "/_nuxt/wAsdV37c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c0-mUkUiEGUVGGeaORIpPc4OFyPTL0\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 960,
    "path": "../public/_nuxt/wAsdV37c.js"
  },
  "/_nuxt/wD8xDpL-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5730-09Wv++WIp6sQooIhDQBOwphs+0M\"",
    "mtime": "2025-02-20T11:45:08.392Z",
    "size": 22320,
    "path": "../public/_nuxt/wD8xDpL-.js"
  },
  "/_nuxt/welcome.-RblTpVi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"307d-eQN4v1sYQ3cIPZUjdF4IA8EoWBE\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 12413,
    "path": "../public/_nuxt/welcome.-RblTpVi.css"
  },
  "/_nuxt/wpYPQvoI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae-0IZtD4wsIGzT40Trcvg86i/5+bo\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 174,
    "path": "../public/_nuxt/wpYPQvoI.js"
  },
  "/_nuxt/ySlJ1b_l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3058f-oEJdxvDuqoCyHeAjBlw0Zu0Ayag\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 198031,
    "path": "../public/_nuxt/ySlJ1b_l.js"
  },
  "/_nuxt/zzU6IEUh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"440-VTUw4xQAkFszhVOms5jW5elGz6I\"",
    "mtime": "2025-02-20T11:45:08.393Z",
    "size": 1088,
    "path": "../public/_nuxt/zzU6IEUh.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-d9yIee+fTJvHyiGFCJ4nExzWgXM\"",
    "mtime": "2025-02-20T11:45:08.241Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/dev.json": {
    "type": "application/json",
    "etag": "\"117-hrAAfMUtFNBvDpkggPWegmEWTPQ\"",
    "mtime": "2025-02-20T11:45:08.236Z",
    "size": 279,
    "path": "../public/_nuxt/builds/meta/dev.json"
  },
  "/_nuxt/builds/meta/fcec07f3-58f3-4ba7-9eb7-b0b90ae1350c.json": {
    "type": "application/json",
    "etag": "\"138-iKioJozR3TDAf2lvzb7ZLQTgFOA\"",
    "mtime": "2025-02-20T11:45:08.237Z",
    "size": 312,
    "path": "../public/_nuxt/builds/meta/fcec07f3-58f3-4ba7-9eb7-b0b90ae1350c.json"
  },
  "/api/content/content_ar/database.sql/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"264-ziT4Gk4EnqoVlpV5TPB//9qY8AQ\"",
    "mtime": "2025-02-20T11:45:08.227Z",
    "size": 612,
    "path": "../public/api/content/content_ar/database.sql/index.html"
  },
  "/api/content/content_de/database.sql/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"264-YaEBPl5OLU4FRYuOFZnBc9HzmGo\"",
    "mtime": "2025-02-20T11:45:08.227Z",
    "size": 612,
    "path": "../public/api/content/content_de/database.sql/index.html"
  },
  "/api/content/content_en/database.sql/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"6a78-Bt9ACaMxdEvzaElGczUccYI7Guk\"",
    "mtime": "2025-02-20T11:45:08.227Z",
    "size": 27256,
    "path": "../public/api/content/content_en/database.sql/index.html"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE$1 = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute$1(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute$1(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute$1 = function(p) {
  return _IS_ABSOLUTE_RE$1.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute$1(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _UWdAZk = eventHandler$1((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$2({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

async function validateData(data, fn) {
  try {
    const res = await fn(data);
    if (res === false) {
      throw createValidationError();
    }
    if (res === true) {
      return data;
    }
    return res ?? data;
  } catch (error) {
    throw createValidationError(error);
  }
}
function createValidationError(validateError) {
  throw createError$1({
    status: 400,
    statusMessage: "Validation Error",
    message: validateError?.message || "Validation Error",
    data: validateError
  });
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readValidatedBody(event, validate) {
  const _body = await readBody(event, { strict: true });
  return validateData(_body, validate);
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;

const _RUYCEn = eventHandler(async (event) => {
  const collection = getRouterParam(event, "collection");
  const data = await useStorage().getItem(`build:content:database.compressed.mjs`) || "";
  if (data) {
    const lineStart = `export const ${collection} = "`;
    const content = String(data).split("\n").find((line) => line.startsWith(lineStart));
    if (content) {
      return content.substring(lineStart.length, content.length - 1);
    }
  }
  return await import('../build/database.compressed.mjs').then((m) => m[collection]);
});

async function decompressSQLDump(base64Str, compressionType = "gzip") {
  const binaryData = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  const response = new Response(new Blob([binaryData]));
  const decompressedStream = response.body?.pipeThrough(new DecompressionStream(compressionType));
  const decompressedText = await new Response(decompressedStream).text();
  return decompressedText.split("\n");
}

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
const contentManifest = {
  "content_ar": {
    "fields": {
      "id": "string",
      "stem": "string",
      "extension": "string",
      "meta": "json",
      "path": "string",
      "title": "string",
      "description": "string",
      "seo": "json",
      "body": "json",
      "navigation": "json",
      "hideBreadcrumb": "boolean",
      "hideToc": "boolean"
    }
  },
  "content_de": {
    "fields": {
      "id": "string",
      "stem": "string",
      "extension": "string",
      "meta": "json",
      "path": "string",
      "title": "string",
      "description": "string",
      "seo": "json",
      "body": "json",
      "navigation": "json",
      "hideBreadcrumb": "boolean",
      "hideToc": "boolean"
    }
  },
  "content_en": {
    "fields": {
      "id": "string",
      "stem": "string",
      "extension": "string",
      "meta": "json",
      "path": "string",
      "title": "string",
      "description": "string",
      "seo": "json",
      "body": "json",
      "navigation": "json",
      "hideBreadcrumb": "boolean",
      "hideToc": "boolean"
    }
  },
  "info": {
    "fields": {}
  }
};

async function fetchDatabase(event, collection) {
  return await $fetch(`/api/content/${collection}/database.sql`, {
    context: event ? { cloudflare: event.context.cloudflare } : {},
    responseType: "text",
    headers: { "content-type": "text/plain" },
    query: { v: checksums[String(collection)], t: void 0 }
  });
}

function refineContentFields(sql, doc) {
  const fields = findCollectionFields(sql);
  const item = { ...doc };
  for (const key in item) {
    if (fields[key] === "json" && item[key] && item[key] !== "undefined") {
      item[key] = JSON.parse(item[key]);
    }
    if (fields[key] === "boolean" && item[key] !== "undefined") {
      item[key] = Boolean(item[key]);
    }
  }
  for (const key in item) {
    if (item[key] === "NULL") {
      item[key] = void 0;
    }
  }
  return item;
}
function findCollectionFields(sql) {
  const table = sql.match(/FROM\s+(\w+)/);
  if (!table) {
    return {};
  }
  const info = contentManifest[getCollectionName(table[1])];
  return info?.fields || {};
}
function getCollectionName(table) {
  return table.replace(/^_content_/, "");
}

function createDatabaseAdapter(factory) {
  return (opts) => {
    const adapter = factory(opts);
    return {
      all: async (sql, params) => {
        const result = await adapter.all(sql, params);
        if (!result) {
          return [];
        }
        return result.map((item) => refineContentFields(sql, item));
      },
      first: async (sql, params) => {
        const item = await adapter.first(sql, params);
        if (!item) {
          return item;
        }
        return refineContentFields(sql, item);
      },
      exec: async (sql) => {
        return adapter.exec(sql);
      }
    };
  };
}

const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};

let db$1;
const getBetter3DatabaseAdapter = (opts) => {
  if (!db$1) {
    const filename = !opts || isAbsolute(opts?.filename || "") ? opts?.filename : new URL(opts.filename, globalThis._importMeta_.url).pathname;
    db$1 = new Database(process.platform === "win32" && filename.startsWith("/") ? filename.slice(1) : filename);
  }
  return {
    async all(sql, params) {
      return params ? db$1.prepare(sql).all(params) : db$1.prepare(sql).all();
    },
    async first(sql, params) {
      return params ? db$1.prepare(sql).get(params) : db$1.prepare(sql).get();
    },
    async exec(sql) {
      await db$1.exec(sql);
    }
  };
};

if (!globalThis.CompressionStream) {
  const make = (ctx, handle) => Object.assign(ctx, {
    writable: new WritableStream({
      write: (chunk) => handle.write(chunk),
      close: () => handle.end()
    }),
    readable: new ReadableStream({
      type: "bytes",
      start(ctrl) {
        handle.on("data", (chunk) => ctrl.enqueue(chunk));
        handle.once("end", () => ctrl.close());
      }
    })
  });
  globalThis.CompressionStream = class CompressionStream {
    constructor(format) {
      make(this, format === "deflate" ? zlib.createDeflate() : format === "gzip" ? zlib.createGzip() : zlib.createDeflateRaw());
    }
  };
  globalThis.DecompressionStream = class DecompressionStream {
    constructor(format) {
      make(this, format === "deflate" ? zlib.createInflate() : format === "gzip" ? zlib.createGunzip() : zlib.createInflateRaw());
    }
  };
}
function getBunDatabaseSync() {
  return require("bun:sqlite").Database;
}
let db;
const getBunSqliteDatabaseAdapter = (opts) => {
  const Database = getBunDatabaseSync();
  if (!db) {
    const filename = !opts || isAbsolute(opts?.filename || "") || opts?.filename === ":memory:" ? opts?.filename : new URL(opts.filename, globalThis._importMeta_.url).pathname;
    db = new Database(process.platform === "win32" && filename.startsWith("/") ? filename.slice(1) : filename, { create: true });
  }
  return {
    async all(sql, params) {
      return params ? db.prepare(sql).all(...params) : db.prepare(sql).all();
    },
    async first(sql, params) {
      return params ? db.prepare(sql).get(...params) : db.prepare(sql).get();
    },
    async exec(sql) {
      return db.prepare(sql).run();
    }
  };
};

const adapter = createDatabaseAdapter((opts) => {
  if (process.versions.bun) {
    return getBunSqliteDatabaseAdapter(opts);
  }
  return getBetter3DatabaseAdapter(opts);
});

const sqlite = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: adapter
});

function loadDatabaseAdapter(config) {
  const { database, localDatabase } = config;
  let _adapter;
  async function loadAdapter() {
    if (!_adapter) {
      if (["nitro-prerender", "nitro-dev"].includes("node-server")) {
        _adapter = await loadSqliteAdapter(localDatabase);
      } else {
        _adapter = adapter(database);
      }
    }
    return _adapter;
  }
  return {
    all: async (sql, params) => {
      const db = await loadAdapter();
      return await db.all(sql, params);
    },
    first: async (sql, params) => {
      const db = await loadAdapter();
      return await db.first(sql, params);
    },
    exec: async (sql) => {
      const db = await loadAdapter();
      return db.exec(sql);
    }
  };
}
const checkDatabaseIntegrity = {};
const integrityCheckPromise = {};
async function checkAndImportDatabaseIntegrity(event, collection, config) {
  if (checkDatabaseIntegrity[String(collection)] !== false) {
    checkDatabaseIntegrity[String(collection)] = false;
    integrityCheckPromise[String(collection)] = integrityCheckPromise[String(collection)] || _checkAndImportDatabaseIntegrity(event, collection, checksums[String(collection)], config).then((isValid) => {
      checkDatabaseIntegrity[String(collection)] = !isValid;
    }).catch((error) => {
      console.error("Database integrity check failed", error);
      checkDatabaseIntegrity[String(collection)] = true;
      integrityCheckPromise[String(collection)] = null;
    });
  }
  if (integrityCheckPromise[String(collection)]) {
    await integrityCheckPromise[String(collection)];
  }
}
async function _checkAndImportDatabaseIntegrity(event, collection, integrityVersion, config) {
  const db = await loadDatabaseAdapter(config);
  const before = await db.first(`select * from ${tables.info} where id = 'checksum_${collection}'`).catch(() => ({ version: "" }));
  if (before?.version) {
    if (before?.version === integrityVersion) {
      return true;
    }
    await db.exec(`DELETE FROM ${tables.info} WHERE id = 'checksum_${collection}'`);
  }
  const dump = await loadDatabaseDump(event, collection).then(decompressSQLDump);
  await dump.reduce(async (prev, sql) => {
    await prev;
    await db.exec(sql).catch((err) => {
      const message = err.message || "Unknown error";
      console.error(`Failed to execute SQL ${sql}: ${message}`);
    });
  }, Promise.resolve());
  const after = await db.first(`SELECT * FROM ${tables.info} WHERE id = 'checksum_${collection}'`).catch(() => ({ version: "" }));
  return after?.version === integrityVersion;
}
async function loadDatabaseDump(event, collection) {
  return await fetchDatabase(event, String(collection)).catch((e) => {
    console.error("Failed to fetch compressed dump", e);
    return "";
  });
}
function loadSqliteAdapter(config) {
  return Promise.resolve().then(function () { return sqlite; }).then((m) => m.default(config));
}

const SQL_COMMANDS = /SELECT|INSERT|UPDATE|DELETE|DROP|ALTER/i;
function assertSafeQuery(sql, collection) {
  const match = sql.match(/^SELECT (.*) FROM (\w+)( WHERE .*)? ORDER BY (["\w,\s]+) (ASC|DESC)( LIMIT \d+)?( OFFSET \d+)?$/);
  if (!match) {
    throw new Error("Invalid query");
  }
  const [_, select, from, where, orderBy, order, limit, offset] = match;
  const columns = select.trim().split(", ");
  if (columns.length === 1) {
    if (columns[0] !== "*" && !columns[0].startsWith("COUNT(") && !columns[0].match(/^COUNT\((DISTINCT )?[a-z_]\w+\) as count$/)) {
      throw new Error("Invalid query");
    }
  } else if (!columns.every((column) => column.match(/^"[a-z_]\w+"$/i))) {
    throw new Error("Invalid query");
  }
  if (from !== `_content_${collection}`) {
    throw new Error("Invalid query");
  }
  if (where) {
    if (!where.startsWith(" WHERE (") || !where.endsWith(")")) {
      throw new Error("Invalid query");
    }
    const noString = where?.replace(/(['"`])(?:\\.|[^\\])*?\1/g, "");
    if (noString.match(SQL_COMMANDS)) {
      throw new Error("Invalid query");
    }
  }
  const _order = (orderBy + " " + order).split(", ");
  if (!_order.every((column) => column.match(/^("[a-z_]+"|[a-z_]+) (ASC|DESC)$/))) {
    throw new Error("Invalid query");
  }
  if (limit !== void 0 && !limit.match(/^ LIMIT \d+$/)) {
    throw new Error("Invalid query");
  }
  if (offset !== void 0 && !offset.match(/^ OFFSET \d+$/)) {
    throw new Error("Invalid query");
  }
  return true;
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

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
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "fcec07f3-58f3-4ba7-9eb7-b0b90ae1350c",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "**": {
        "headers": {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin"
        }
      },
      "/api/content/content_ar/database.sql": {
        "prerender": true
      },
      "/api/content/content_de/database.sql": {
        "prerender": true
      },
      "/api/content/content_en/database.sql": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "content": {
      "wsUrl": ""
    },
    "mdc": {
      "components": {
        "prose": true,
        "map": {}
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      }
    },
    "i18n": {
      "baseUrl": "https://karagoz.dev",
      "defaultLocale": "en",
      "defaultDirection": "ltr",
      "strategy": "prefix_and_default",
      "lazy": true,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "locales": [
        {
          "code": "ar",
          "dir": "rtl",
          "iso": "ar-SY",
          "name": "العربية",
          "files": [
            "/Users/mahmoud.aldaas/IdeaProjects/frontendat/karagoz/apps/docs/i18n/locales/ar.ts"
          ]
        },
        {
          "code": "de",
          "dir": "ltr",
          "iso": "de-DE",
          "name": "Deutsch",
          "files": [
            "/Users/mahmoud.aldaas/IdeaProjects/frontendat/karagoz/apps/docs/i18n/locales/de.ts"
          ]
        },
        {
          "code": "en",
          "dir": "ltr",
          "iso": "en-UK",
          "name": "English",
          "files": [
            "/Users/mahmoud.aldaas/IdeaProjects/frontendat/karagoz/apps/docs/i18n/locales/en.ts"
          ]
        }
      ],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "en",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false,
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "generatedLocaleFilePathFormat": "absolute"
      },
      "multiDomainLocales": false
    }
  },
  "content": {
    "version": "3.0.1",
    "database": {
      "type": "sqlite",
      "filename": "./contents.sqlite"
    },
    "localDatabase": {
      "type": "sqlite",
      "filename": "/Users/mahmoud.aldaas/IdeaProjects/frontendat/karagoz/apps/docs/.data/content/contents.sqlite"
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/mahmoud.aldaas/IdeaProjects/frontendat/karagoz/apps/docs/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler$1(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler$1(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler$1((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const _Q3UCx0 = eventHandler(async (event) => {
  const { sql } = await readValidatedBody(event, z.object({ sql: z.string() }).parse);
  const collection = getRouterParam(event, "collection");
  assertSafeQuery(sql, collection);
  const conf = useRuntimeConfig().content;
  await checkAndImportDatabaseIntegrity(event, collection, conf);
  return loadDatabaseAdapter(conf).all(sql);
});

const _lazy_w8GpDy = () => import('../routes/api/snapshot/_snapshot_.get.mjs');
const _lazy_4sXfov = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _UWdAZk, lazy: false, middleware: true, method: undefined },
  { route: '/api/snapshot/:snapshot', handler: _lazy_w8GpDy, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_4sXfov, lazy: true, middleware: false, method: undefined },
  { route: '/api/content/:collection/database.sql', handler: _RUYCEn, lazy: false, middleware: false, method: undefined },
  { route: '/api/content/:collection/query', handler: _Q3UCx0, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_4sXfov, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler$1((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof vt.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { getContext as a, baseURL as b, createError$2 as c, defineEventHandler$1 as d, createHooks as e, getRequestHeaders as f, getRouterParam$1 as g, createRouter$1 as h, getRequestHeader as i, setCookie as j, getCookie as k, deleteCookie as l, defineRenderHandler as m, buildAssetsURL as n, getQuery as o, publicAssetsURL as p, getRouteRules as q, getResponseStatus as r, sanitizeStatusCode$1 as s, toRouteMatcher as t, useRuntimeConfig as u, getResponseStatusText as v, useNitroApp as w, nodeServer as x };
//# sourceMappingURL=nitro.mjs.map
