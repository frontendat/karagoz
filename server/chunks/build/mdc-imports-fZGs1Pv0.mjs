import { g as getDefaultExportFromCjs, f as findAndReplace, v as visit$1, t as toString } from './MDC-9TLOOWuK.mjs';
import './NotFound-DypIAyNL.mjs';
import 'vue';
import 'vue/server-renderer';
import './useLocalisedCollection-DK-aRPq5.mjs';
import './vue-i18n-Ci15wrpe.mjs';
import './server.mjs';
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
import './nuxt-link-C3CduanY.mjs';
import 'node:process';

var dist = { exports: {} };
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist.exports;
  hasRequiredDist = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const typedArrayTypeNames = [
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
    function isTypedArrayName(name) {
      return typedArrayTypeNames.includes(name);
    }
    const objectTypeNames = [
      "Function",
      "Generator",
      "AsyncGenerator",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
      "AsyncFunction",
      "Observable",
      "Array",
      "Buffer",
      "Blob",
      "Object",
      "RegExp",
      "Date",
      "Error",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Promise",
      "URL",
      "FormData",
      "URLSearchParams",
      "HTMLElement",
      ...typedArrayTypeNames
    ];
    function isObjectTypeName(name) {
      return objectTypeNames.includes(name);
    }
    const primitiveTypeNames = [
      "null",
      "undefined",
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol"
    ];
    function isPrimitiveTypeName(name) {
      return primitiveTypeNames.includes(name);
    }
    function isOfType(type) {
      return (value) => typeof value === type;
    }
    const { toString: toString2 } = Object.prototype;
    const getObjectType = (value) => {
      const objectTypeName = toString2.call(value).slice(8, -1);
      if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return "HTMLElement";
      }
      if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
      }
      return void 0;
    };
    const isObjectOfType = (type) => (value) => getObjectType(value) === type;
    function is(value) {
      if (value === null) {
        return "null";
      }
      switch (typeof value) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return "number";
        case "boolean":
          return "boolean";
        case "function":
          return "Function";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
      }
      if (is.observable(value)) {
        return "Observable";
      }
      if (is.array(value)) {
        return "Array";
      }
      if (is.buffer(value)) {
        return "Buffer";
      }
      const tagType = getObjectType(value);
      if (tagType) {
        return tagType;
      }
      if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError("Please don't use object wrappers for primitive types");
      }
      return "Object";
    }
    is.undefined = isOfType("undefined");
    is.string = isOfType("string");
    const isNumberType = isOfType("number");
    is.number = (value) => isNumberType(value) && !is.nan(value);
    is.bigint = isOfType("bigint");
    is.function_ = isOfType("function");
    is.null_ = (value) => value === null;
    is.class_ = (value) => is.function_(value) && value.toString().startsWith("class ");
    is.boolean = (value) => value === true || value === false;
    is.symbol = isOfType("symbol");
    is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
    is.array = (value, assertion) => {
      if (!Array.isArray(value)) {
        return false;
      }
      if (!is.function_(assertion)) {
        return true;
      }
      return value.every(assertion);
    };
    is.buffer = (value) => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false;
    };
    is.blob = (value) => isObjectOfType("Blob")(value);
    is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
    is.object = (value) => !is.null_(value) && (typeof value === "object" || is.function_(value));
    is.iterable = (value) => {
      var _a;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]);
    };
    is.asyncIterable = (value) => {
      var _a;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]);
    };
    is.generator = (value) => {
      var _a, _b;
      return is.iterable(value) && is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.next) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.throw);
    };
    is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
    is.nativePromise = (value) => isObjectOfType("Promise")(value);
    const hasPromiseAPI = (value) => {
      var _a, _b;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
    };
    is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
    is.generatorFunction = isObjectOfType("GeneratorFunction");
    is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
    is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction";
    is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty("prototype");
    is.regExp = isObjectOfType("RegExp");
    is.date = isObjectOfType("Date");
    is.error = isObjectOfType("Error");
    is.map = (value) => isObjectOfType("Map")(value);
    is.set = (value) => isObjectOfType("Set")(value);
    is.weakMap = (value) => isObjectOfType("WeakMap")(value);
    is.weakSet = (value) => isObjectOfType("WeakSet")(value);
    is.int8Array = isObjectOfType("Int8Array");
    is.uint8Array = isObjectOfType("Uint8Array");
    is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray");
    is.int16Array = isObjectOfType("Int16Array");
    is.uint16Array = isObjectOfType("Uint16Array");
    is.int32Array = isObjectOfType("Int32Array");
    is.uint32Array = isObjectOfType("Uint32Array");
    is.float32Array = isObjectOfType("Float32Array");
    is.float64Array = isObjectOfType("Float64Array");
    is.bigInt64Array = isObjectOfType("BigInt64Array");
    is.bigUint64Array = isObjectOfType("BigUint64Array");
    is.arrayBuffer = isObjectOfType("ArrayBuffer");
    is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer");
    is.dataView = isObjectOfType("DataView");
    is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
    is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
    is.urlInstance = (value) => isObjectOfType("URL")(value);
    is.urlString = (value) => {
      if (!is.string(value)) {
        return false;
      }
      try {
        new URL(value);
        return true;
      } catch (_a) {
        return false;
      }
    };
    is.truthy = (value) => Boolean(value);
    is.falsy = (value) => !value;
    is.nan = (value) => Number.isNaN(value);
    is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
    is.integer = (value) => Number.isInteger(value);
    is.safeInteger = (value) => Number.isSafeInteger(value);
    is.plainObject = (value) => {
      if (toString2.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
    };
    is.typedArray = (value) => isTypedArrayName(getObjectType(value));
    const isValidLength = (value) => is.safeInteger(value) && value >= 0;
    is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
    is.inRange = (value, range) => {
      if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
      }
      if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
      }
      throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
    };
    const NODE_TYPE_ELEMENT = 1;
    const DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    is.domElement = (value) => {
      return is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) && !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
    };
    is.observable = (value) => {
      var _a, _b, _c, _d;
      if (!value) {
        return false;
      }
      if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
      }
      if (value === ((_d = (_c = value)["@@observable"]) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
      }
      return false;
    };
    is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
    is.infinite = (value) => value === Infinity || value === -Infinity;
    const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
    is.evenInteger = isAbsoluteMod2(0);
    is.oddInteger = isAbsoluteMod2(1);
    is.emptyArray = (value) => is.array(value) && value.length === 0;
    is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
    is.emptyString = (value) => is.string(value) && value.length === 0;
    const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
    is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
    is.nonEmptyString = (value) => is.string(value) && value.length > 0;
    is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
    is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
    is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
    is.emptySet = (value) => is.set(value) && value.size === 0;
    is.nonEmptySet = (value) => is.set(value) && value.size > 0;
    is.emptyMap = (value) => is.map(value) && value.size === 0;
    is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
    is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
    is.formData = (value) => isObjectOfType("FormData")(value);
    is.urlSearchParams = (value) => isObjectOfType("URLSearchParams")(value);
    const predicateOnArray = (method, predicate, values) => {
      if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
      }
      if (values.length === 0) {
        throw new TypeError("Invalid number of values");
      }
      return method.call(values, predicate);
    };
    is.any = (predicate, ...values) => {
      const predicates = is.array(predicate) ? predicate : [predicate];
      return predicates.some((singlePredicate) => predicateOnArray(Array.prototype.some, singlePredicate, values));
    };
    is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
    const assertType = (condition, description, value, options = {}) => {
      if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues ? `received values of types ${[
          ...new Set(value.map((singleValue) => `\`${is(singleValue)}\``))
        ].join(", ")}` : `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
      }
    };
    exports.assert = {
      // Unknowns.
      undefined: (value) => assertType(is.undefined(value), "undefined", value),
      string: (value) => assertType(is.string(value), "string", value),
      number: (value) => assertType(is.number(value), "number", value),
      bigint: (value) => assertType(is.bigint(value), "bigint", value),
      // eslint-disable-next-line @typescript-eslint/ban-types
      function_: (value) => assertType(is.function_(value), "Function", value),
      null_: (value) => assertType(is.null_(value), "null", value),
      class_: (value) => assertType(is.class_(value), "Class", value),
      boolean: (value) => assertType(is.boolean(value), "boolean", value),
      symbol: (value) => assertType(is.symbol(value), "symbol", value),
      numericString: (value) => assertType(is.numericString(value), "string with a number", value),
      array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), "Array", value);
        if (assertion) {
          value.forEach(assertion);
        }
      },
      buffer: (value) => assertType(is.buffer(value), "Buffer", value),
      blob: (value) => assertType(is.blob(value), "Blob", value),
      nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined", value),
      object: (value) => assertType(is.object(value), "Object", value),
      iterable: (value) => assertType(is.iterable(value), "Iterable", value),
      asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable", value),
      generator: (value) => assertType(is.generator(value), "Generator", value),
      asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator", value),
      nativePromise: (value) => assertType(is.nativePromise(value), "native Promise", value),
      promise: (value) => assertType(is.promise(value), "Promise", value),
      generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction", value),
      asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction", value),
      // eslint-disable-next-line @typescript-eslint/ban-types
      asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction", value),
      // eslint-disable-next-line @typescript-eslint/ban-types
      boundFunction: (value) => assertType(is.boundFunction(value), "Function", value),
      regExp: (value) => assertType(is.regExp(value), "RegExp", value),
      date: (value) => assertType(is.date(value), "Date", value),
      error: (value) => assertType(is.error(value), "Error", value),
      map: (value) => assertType(is.map(value), "Map", value),
      set: (value) => assertType(is.set(value), "Set", value),
      weakMap: (value) => assertType(is.weakMap(value), "WeakMap", value),
      weakSet: (value) => assertType(is.weakSet(value), "WeakSet", value),
      int8Array: (value) => assertType(is.int8Array(value), "Int8Array", value),
      uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array", value),
      uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray", value),
      int16Array: (value) => assertType(is.int16Array(value), "Int16Array", value),
      uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array", value),
      int32Array: (value) => assertType(is.int32Array(value), "Int32Array", value),
      uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array", value),
      float32Array: (value) => assertType(is.float32Array(value), "Float32Array", value),
      float64Array: (value) => assertType(is.float64Array(value), "Float64Array", value),
      bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array", value),
      bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array", value),
      arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer", value),
      sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer", value),
      dataView: (value) => assertType(is.dataView(value), "DataView", value),
      enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), "EnumCase", value),
      urlInstance: (value) => assertType(is.urlInstance(value), "URL", value),
      urlString: (value) => assertType(is.urlString(value), "string with a URL", value),
      truthy: (value) => assertType(is.truthy(value), "truthy", value),
      falsy: (value) => assertType(is.falsy(value), "falsy", value),
      nan: (value) => assertType(is.nan(value), "NaN", value),
      primitive: (value) => assertType(is.primitive(value), "primitive", value),
      integer: (value) => assertType(is.integer(value), "integer", value),
      safeInteger: (value) => assertType(is.safeInteger(value), "integer", value),
      plainObject: (value) => assertType(is.plainObject(value), "plain object", value),
      typedArray: (value) => assertType(is.typedArray(value), "TypedArray", value),
      arrayLike: (value) => assertType(is.arrayLike(value), "array-like", value),
      domElement: (value) => assertType(is.domElement(value), "HTMLElement", value),
      observable: (value) => assertType(is.observable(value), "Observable", value),
      nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream", value),
      infinite: (value) => assertType(is.infinite(value), "infinite number", value),
      emptyArray: (value) => assertType(is.emptyArray(value), "empty array", value),
      nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array", value),
      emptyString: (value) => assertType(is.emptyString(value), "empty string", value),
      emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace", value),
      nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string", value),
      nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace", value),
      emptyObject: (value) => assertType(is.emptyObject(value), "empty object", value),
      nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object", value),
      emptySet: (value) => assertType(is.emptySet(value), "empty set", value),
      nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set", value),
      emptyMap: (value) => assertType(is.emptyMap(value), "empty map", value),
      nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map", value),
      propertyKey: (value) => assertType(is.propertyKey(value), "PropertyKey", value),
      formData: (value) => assertType(is.formData(value), "FormData", value),
      urlSearchParams: (value) => assertType(is.urlSearchParams(value), "URLSearchParams", value),
      // Numbers.
      evenInteger: (value) => assertType(is.evenInteger(value), "even integer", value),
      oddInteger: (value) => assertType(is.oddInteger(value), "odd integer", value),
      // Two arguments.
      directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T", instance),
      inRange: (value, range) => assertType(is.inRange(value, range), "in range", value),
      // Variadic functions.
      any: (predicate, ...values) => {
        return assertType(is.any(predicate, ...values), "predicate returns truthy for any value", values, { multipleValues: true });
      },
      all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values", values, { multipleValues: true })
    };
    Object.defineProperties(is, {
      class: {
        value: is.class_
      },
      function: {
        value: is.function_
      },
      null: {
        value: is.null_
      }
    });
    Object.defineProperties(exports.assert, {
      class: {
        value: exports.assert.class_
      },
      function: {
        value: exports.assert.function_
      },
      null: {
        value: exports.assert.null_
      }
    });
    exports.default = is;
    module.exports = is;
    module.exports.default = is;
    module.exports.assert = exports.assert;
  })(dist, dist.exports);
  return dist.exports;
}
var distExports = /* @__PURE__ */ requireDist();
const grinning = { "keywords": ["face", "smile", "happy", "joy", ":D", "grin"], "char": "\u{1F600}", "fitzpatrick_scale": false, "category": "people" };
const grimacing = { "keywords": ["face", "grimace", "teeth"], "char": "\u{1F62C}", "fitzpatrick_scale": false, "category": "people" };
const grin = { "keywords": ["face", "happy", "smile", "joy", "kawaii"], "char": "\u{1F601}", "fitzpatrick_scale": false, "category": "people" };
const joy = { "keywords": ["face", "cry", "tears", "weep", "happy", "happytears", "haha"], "char": "\u{1F602}", "fitzpatrick_scale": false, "category": "people" };
const rofl = { "keywords": ["face", "rolling", "floor", "laughing", "lol", "haha"], "char": "\u{1F923}", "fitzpatrick_scale": false, "category": "people" };
const partying = { "keywords": ["face", "celebration", "woohoo"], "char": "\u{1F973}", "fitzpatrick_scale": false, "category": "people" };
const smiley = { "keywords": ["face", "happy", "joy", "haha", ":D", ":)", "smile", "funny"], "char": "\u{1F603}", "fitzpatrick_scale": false, "category": "people" };
const smile = { "keywords": ["face", "happy", "joy", "funny", "haha", "laugh", "like", ":D", ":)"], "char": "\u{1F604}", "fitzpatrick_scale": false, "category": "people" };
const sweat_smile = { "keywords": ["face", "hot", "happy", "laugh", "sweat", "smile", "relief"], "char": "\u{1F605}", "fitzpatrick_scale": false, "category": "people" };
const laughing = { "keywords": ["happy", "joy", "lol", "satisfied", "haha", "face", "glad", "XD", "laugh"], "char": "\u{1F606}", "fitzpatrick_scale": false, "category": "people" };
const innocent = { "keywords": ["face", "angel", "heaven", "halo"], "char": "\u{1F607}", "fitzpatrick_scale": false, "category": "people" };
const wink = { "keywords": ["face", "happy", "mischievous", "secret", ";)", "smile", "eye"], "char": "\u{1F609}", "fitzpatrick_scale": false, "category": "people" };
const blush = { "keywords": ["face", "smile", "happy", "flushed", "crush", "embarrassed", "shy", "joy"], "char": "\u{1F60A}", "fitzpatrick_scale": false, "category": "people" };
const slightly_smiling_face = { "keywords": ["face", "smile"], "char": "\u{1F642}", "fitzpatrick_scale": false, "category": "people" };
const upside_down_face = { "keywords": ["face", "flipped", "silly", "smile"], "char": "\u{1F643}", "fitzpatrick_scale": false, "category": "people" };
const relaxed = { "keywords": ["face", "blush", "massage", "happiness"], "char": "\u263A\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const yum = { "keywords": ["happy", "joy", "tongue", "smile", "face", "silly", "yummy", "nom", "delicious", "savouring"], "char": "\u{1F60B}", "fitzpatrick_scale": false, "category": "people" };
const relieved = { "keywords": ["face", "relaxed", "phew", "massage", "happiness"], "char": "\u{1F60C}", "fitzpatrick_scale": false, "category": "people" };
const heart_eyes = { "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "crush", "heart"], "char": "\u{1F60D}", "fitzpatrick_scale": false, "category": "people" };
const smiling_face_with_three_hearts = { "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "crush", "hearts", "adore"], "char": "\u{1F970}", "fitzpatrick_scale": false, "category": "people" };
const kissing_heart = { "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "kiss"], "char": "\u{1F618}", "fitzpatrick_scale": false, "category": "people" };
const kissing = { "keywords": ["love", "like", "face", "3", "valentines", "infatuation", "kiss"], "char": "\u{1F617}", "fitzpatrick_scale": false, "category": "people" };
const kissing_smiling_eyes = { "keywords": ["face", "affection", "valentines", "infatuation", "kiss"], "char": "\u{1F619}", "fitzpatrick_scale": false, "category": "people" };
const kissing_closed_eyes = { "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "kiss"], "char": "\u{1F61A}", "fitzpatrick_scale": false, "category": "people" };
const stuck_out_tongue_winking_eye = { "keywords": ["face", "prank", "childish", "playful", "mischievous", "smile", "wink", "tongue"], "char": "\u{1F61C}", "fitzpatrick_scale": false, "category": "people" };
const zany = { "keywords": ["face", "goofy", "crazy"], "char": "\u{1F92A}", "fitzpatrick_scale": false, "category": "people" };
const raised_eyebrow = { "keywords": ["face", "distrust", "scepticism", "disapproval", "disbelief", "surprise"], "char": "\u{1F928}", "fitzpatrick_scale": false, "category": "people" };
const monocle = { "keywords": ["face", "stuffy", "wealthy"], "char": "\u{1F9D0}", "fitzpatrick_scale": false, "category": "people" };
const stuck_out_tongue_closed_eyes = { "keywords": ["face", "prank", "playful", "mischievous", "smile", "tongue"], "char": "\u{1F61D}", "fitzpatrick_scale": false, "category": "people" };
const stuck_out_tongue = { "keywords": ["face", "prank", "childish", "playful", "mischievous", "smile", "tongue"], "char": "\u{1F61B}", "fitzpatrick_scale": false, "category": "people" };
const money_mouth_face = { "keywords": ["face", "rich", "dollar", "money"], "char": "\u{1F911}", "fitzpatrick_scale": false, "category": "people" };
const nerd_face = { "keywords": ["face", "nerdy", "geek", "dork"], "char": "\u{1F913}", "fitzpatrick_scale": false, "category": "people" };
const sunglasses = { "keywords": ["face", "cool", "smile", "summer", "beach", "sunglass"], "char": "\u{1F60E}", "fitzpatrick_scale": false, "category": "people" };
const star_struck = { "keywords": ["face", "smile", "starry", "eyes", "grinning"], "char": "\u{1F929}", "fitzpatrick_scale": false, "category": "people" };
const clown_face = { "keywords": ["face"], "char": "\u{1F921}", "fitzpatrick_scale": false, "category": "people" };
const cowboy_hat_face = { "keywords": ["face", "cowgirl", "hat"], "char": "\u{1F920}", "fitzpatrick_scale": false, "category": "people" };
const hugs = { "keywords": ["face", "smile", "hug"], "char": "\u{1F917}", "fitzpatrick_scale": false, "category": "people" };
const smirk = { "keywords": ["face", "smile", "mean", "prank", "smug", "sarcasm"], "char": "\u{1F60F}", "fitzpatrick_scale": false, "category": "people" };
const no_mouth = { "keywords": ["face", "hellokitty"], "char": "\u{1F636}", "fitzpatrick_scale": false, "category": "people" };
const neutral_face = { "keywords": ["indifference", "meh", ":|", "neutral"], "char": "\u{1F610}", "fitzpatrick_scale": false, "category": "people" };
const expressionless = { "keywords": ["face", "indifferent", "-_-", "meh", "deadpan"], "char": "\u{1F611}", "fitzpatrick_scale": false, "category": "people" };
const unamused = { "keywords": ["indifference", "bored", "straight face", "serious", "sarcasm", "unimpressed", "skeptical", "dubious", "side_eye"], "char": "\u{1F612}", "fitzpatrick_scale": false, "category": "people" };
const roll_eyes = { "keywords": ["face", "eyeroll", "frustrated"], "char": "\u{1F644}", "fitzpatrick_scale": false, "category": "people" };
const thinking = { "keywords": ["face", "hmmm", "think", "consider"], "char": "\u{1F914}", "fitzpatrick_scale": false, "category": "people" };
const lying_face = { "keywords": ["face", "lie", "pinocchio"], "char": "\u{1F925}", "fitzpatrick_scale": false, "category": "people" };
const hand_over_mouth = { "keywords": ["face", "whoops", "shock", "surprise"], "char": "\u{1F92D}", "fitzpatrick_scale": false, "category": "people" };
const shushing = { "keywords": ["face", "quiet", "shhh"], "char": "\u{1F92B}", "fitzpatrick_scale": false, "category": "people" };
const symbols_over_mouth = { "keywords": ["face", "swearing", "cursing", "cussing", "profanity", "expletive"], "char": "\u{1F92C}", "fitzpatrick_scale": false, "category": "people" };
const exploding_head = { "keywords": ["face", "shocked", "mind", "blown"], "char": "\u{1F92F}", "fitzpatrick_scale": false, "category": "people" };
const flushed = { "keywords": ["face", "blush", "shy", "flattered"], "char": "\u{1F633}", "fitzpatrick_scale": false, "category": "people" };
const disappointed = { "keywords": ["face", "sad", "upset", "depressed", ":("], "char": "\u{1F61E}", "fitzpatrick_scale": false, "category": "people" };
const worried = { "keywords": ["face", "concern", "nervous", ":("], "char": "\u{1F61F}", "fitzpatrick_scale": false, "category": "people" };
const angry = { "keywords": ["mad", "face", "annoyed", "frustrated"], "char": "\u{1F620}", "fitzpatrick_scale": false, "category": "people" };
const rage = { "keywords": ["angry", "mad", "hate", "despise"], "char": "\u{1F621}", "fitzpatrick_scale": false, "category": "people" };
const pensive = { "keywords": ["face", "sad", "depressed", "upset"], "char": "\u{1F614}", "fitzpatrick_scale": false, "category": "people" };
const confused = { "keywords": ["face", "indifference", "huh", "weird", "hmmm", ":/"], "char": "\u{1F615}", "fitzpatrick_scale": false, "category": "people" };
const slightly_frowning_face = { "keywords": ["face", "frowning", "disappointed", "sad", "upset"], "char": "\u{1F641}", "fitzpatrick_scale": false, "category": "people" };
const frowning_face = { "keywords": ["face", "sad", "upset", "frown"], "char": "\u2639", "fitzpatrick_scale": false, "category": "people" };
const persevere = { "keywords": ["face", "sick", "no", "upset", "oops"], "char": "\u{1F623}", "fitzpatrick_scale": false, "category": "people" };
const confounded = { "keywords": ["face", "confused", "sick", "unwell", "oops", ":S"], "char": "\u{1F616}", "fitzpatrick_scale": false, "category": "people" };
const tired_face = { "keywords": ["sick", "whine", "upset", "frustrated"], "char": "\u{1F62B}", "fitzpatrick_scale": false, "category": "people" };
const weary = { "keywords": ["face", "tired", "sleepy", "sad", "frustrated", "upset"], "char": "\u{1F629}", "fitzpatrick_scale": false, "category": "people" };
const pleading = { "keywords": ["face", "begging", "mercy"], "char": "\u{1F97A}", "fitzpatrick_scale": false, "category": "people" };
const triumph = { "keywords": ["face", "gas", "phew", "proud", "pride"], "char": "\u{1F624}", "fitzpatrick_scale": false, "category": "people" };
const open_mouth = { "keywords": ["face", "surprise", "impressed", "wow", "whoa", ":O"], "char": "\u{1F62E}", "fitzpatrick_scale": false, "category": "people" };
const scream = { "keywords": ["face", "munch", "scared", "omg"], "char": "\u{1F631}", "fitzpatrick_scale": false, "category": "people" };
const fearful = { "keywords": ["face", "scared", "terrified", "nervous", "oops", "huh"], "char": "\u{1F628}", "fitzpatrick_scale": false, "category": "people" };
const cold_sweat = { "keywords": ["face", "nervous", "sweat"], "char": "\u{1F630}", "fitzpatrick_scale": false, "category": "people" };
const hushed = { "keywords": ["face", "woo", "shh"], "char": "\u{1F62F}", "fitzpatrick_scale": false, "category": "people" };
const frowning = { "keywords": ["face", "aw", "what"], "char": "\u{1F626}", "fitzpatrick_scale": false, "category": "people" };
const anguished = { "keywords": ["face", "stunned", "nervous"], "char": "\u{1F627}", "fitzpatrick_scale": false, "category": "people" };
const cry = { "keywords": ["face", "tears", "sad", "depressed", "upset", ":'("], "char": "\u{1F622}", "fitzpatrick_scale": false, "category": "people" };
const disappointed_relieved = { "keywords": ["face", "phew", "sweat", "nervous"], "char": "\u{1F625}", "fitzpatrick_scale": false, "category": "people" };
const drooling_face = { "keywords": ["face"], "char": "\u{1F924}", "fitzpatrick_scale": false, "category": "people" };
const sleepy = { "keywords": ["face", "tired", "rest", "nap"], "char": "\u{1F62A}", "fitzpatrick_scale": false, "category": "people" };
const sweat = { "keywords": ["face", "hot", "sad", "tired", "exercise"], "char": "\u{1F613}", "fitzpatrick_scale": false, "category": "people" };
const hot = { "keywords": ["face", "feverish", "heat", "red", "sweating"], "char": "\u{1F975}", "fitzpatrick_scale": false, "category": "people" };
const cold = { "keywords": ["face", "blue", "freezing", "frozen", "frostbite", "icicles"], "char": "\u{1F976}", "fitzpatrick_scale": false, "category": "people" };
const sob = { "keywords": ["face", "cry", "tears", "sad", "upset", "depressed"], "char": "\u{1F62D}", "fitzpatrick_scale": false, "category": "people" };
const dizzy_face = { "keywords": ["spent", "unconscious", "xox", "dizzy"], "char": "\u{1F635}", "fitzpatrick_scale": false, "category": "people" };
const astonished = { "keywords": ["face", "xox", "surprised", "poisoned"], "char": "\u{1F632}", "fitzpatrick_scale": false, "category": "people" };
const zipper_mouth_face = { "keywords": ["face", "sealed", "zipper", "secret"], "char": "\u{1F910}", "fitzpatrick_scale": false, "category": "people" };
const nauseated_face = { "keywords": ["face", "vomit", "gross", "green", "sick", "throw up", "ill"], "char": "\u{1F922}", "fitzpatrick_scale": false, "category": "people" };
const sneezing_face = { "keywords": ["face", "gesundheit", "sneeze", "sick", "allergy"], "char": "\u{1F927}", "fitzpatrick_scale": false, "category": "people" };
const vomiting = { "keywords": ["face", "sick"], "char": "\u{1F92E}", "fitzpatrick_scale": false, "category": "people" };
const mask = { "keywords": ["face", "sick", "ill", "disease"], "char": "\u{1F637}", "fitzpatrick_scale": false, "category": "people" };
const face_with_thermometer = { "keywords": ["sick", "temperature", "thermometer", "cold", "fever"], "char": "\u{1F912}", "fitzpatrick_scale": false, "category": "people" };
const face_with_head_bandage = { "keywords": ["injured", "clumsy", "bandage", "hurt"], "char": "\u{1F915}", "fitzpatrick_scale": false, "category": "people" };
const woozy = { "keywords": ["face", "dizzy", "intoxicated", "tipsy", "wavy"], "char": "\u{1F974}", "fitzpatrick_scale": false, "category": "people" };
const sleeping = { "keywords": ["face", "tired", "sleepy", "night", "zzz"], "char": "\u{1F634}", "fitzpatrick_scale": false, "category": "people" };
const zzz = { "keywords": ["sleepy", "tired", "dream"], "char": "\u{1F4A4}", "fitzpatrick_scale": false, "category": "people" };
const poop = { "keywords": ["hankey", "shitface", "fail", "turd", "shit"], "char": "\u{1F4A9}", "fitzpatrick_scale": false, "category": "people" };
const smiling_imp = { "keywords": ["devil", "horns"], "char": "\u{1F608}", "fitzpatrick_scale": false, "category": "people" };
const imp = { "keywords": ["devil", "angry", "horns"], "char": "\u{1F47F}", "fitzpatrick_scale": false, "category": "people" };
const japanese_ogre = { "keywords": ["monster", "red", "mask", "halloween", "scary", "creepy", "devil", "demon", "japanese", "ogre"], "char": "\u{1F479}", "fitzpatrick_scale": false, "category": "people" };
const japanese_goblin = { "keywords": ["red", "evil", "mask", "monster", "scary", "creepy", "japanese", "goblin"], "char": "\u{1F47A}", "fitzpatrick_scale": false, "category": "people" };
const skull = { "keywords": ["dead", "skeleton", "creepy", "death"], "char": "\u{1F480}", "fitzpatrick_scale": false, "category": "people" };
const ghost = { "keywords": ["halloween", "spooky", "scary"], "char": "\u{1F47B}", "fitzpatrick_scale": false, "category": "people" };
const alien = { "keywords": ["UFO", "paul", "weird", "outer_space"], "char": "\u{1F47D}", "fitzpatrick_scale": false, "category": "people" };
const robot = { "keywords": ["computer", "machine", "bot"], "char": "\u{1F916}", "fitzpatrick_scale": false, "category": "people" };
const smiley_cat = { "keywords": ["animal", "cats", "happy", "smile"], "char": "\u{1F63A}", "fitzpatrick_scale": false, "category": "people" };
const smile_cat = { "keywords": ["animal", "cats", "smile"], "char": "\u{1F638}", "fitzpatrick_scale": false, "category": "people" };
const joy_cat = { "keywords": ["animal", "cats", "haha", "happy", "tears"], "char": "\u{1F639}", "fitzpatrick_scale": false, "category": "people" };
const heart_eyes_cat = { "keywords": ["animal", "love", "like", "affection", "cats", "valentines", "heart"], "char": "\u{1F63B}", "fitzpatrick_scale": false, "category": "people" };
const smirk_cat = { "keywords": ["animal", "cats", "smirk"], "char": "\u{1F63C}", "fitzpatrick_scale": false, "category": "people" };
const kissing_cat = { "keywords": ["animal", "cats", "kiss"], "char": "\u{1F63D}", "fitzpatrick_scale": false, "category": "people" };
const scream_cat = { "keywords": ["animal", "cats", "munch", "scared", "scream"], "char": "\u{1F640}", "fitzpatrick_scale": false, "category": "people" };
const crying_cat_face = { "keywords": ["animal", "tears", "weep", "sad", "cats", "upset", "cry"], "char": "\u{1F63F}", "fitzpatrick_scale": false, "category": "people" };
const pouting_cat = { "keywords": ["animal", "cats"], "char": "\u{1F63E}", "fitzpatrick_scale": false, "category": "people" };
const palms_up = { "keywords": ["hands", "gesture", "cupped", "prayer"], "char": "\u{1F932}", "fitzpatrick_scale": true, "category": "people" };
const raised_hands = { "keywords": ["gesture", "hooray", "yea", "celebration", "hands"], "char": "\u{1F64C}", "fitzpatrick_scale": true, "category": "people" };
const clap = { "keywords": ["hands", "praise", "applause", "congrats", "yay"], "char": "\u{1F44F}", "fitzpatrick_scale": true, "category": "people" };
const wave = { "keywords": ["hands", "gesture", "goodbye", "solong", "farewell", "hello", "hi", "palm"], "char": "\u{1F44B}", "fitzpatrick_scale": true, "category": "people" };
const call_me_hand = { "keywords": ["hands", "gesture"], "char": "\u{1F919}", "fitzpatrick_scale": true, "category": "people" };
const facepunch = { "keywords": ["angry", "violence", "fist", "hit", "attack", "hand"], "char": "\u{1F44A}", "fitzpatrick_scale": true, "category": "people" };
const fist = { "keywords": ["fingers", "hand", "grasp"], "char": "\u270A", "fitzpatrick_scale": true, "category": "people" };
const fist_left = { "keywords": ["hand", "fistbump"], "char": "\u{1F91B}", "fitzpatrick_scale": true, "category": "people" };
const fist_right = { "keywords": ["hand", "fistbump"], "char": "\u{1F91C}", "fitzpatrick_scale": true, "category": "people" };
const v = { "keywords": ["fingers", "ohyeah", "hand", "peace", "victory", "two"], "char": "\u270C", "fitzpatrick_scale": true, "category": "people" };
const ok_hand = { "keywords": ["fingers", "limbs", "perfect", "ok", "okay"], "char": "\u{1F44C}", "fitzpatrick_scale": true, "category": "people" };
const raised_hand = { "keywords": ["fingers", "stop", "highfive", "palm", "ban"], "char": "\u270B", "fitzpatrick_scale": true, "category": "people" };
const raised_back_of_hand = { "keywords": ["fingers", "raised", "backhand"], "char": "\u{1F91A}", "fitzpatrick_scale": true, "category": "people" };
const open_hands = { "keywords": ["fingers", "butterfly", "hands", "open"], "char": "\u{1F450}", "fitzpatrick_scale": true, "category": "people" };
const muscle = { "keywords": ["arm", "flex", "hand", "summer", "strong", "biceps"], "char": "\u{1F4AA}", "fitzpatrick_scale": true, "category": "people" };
const pray = { "keywords": ["please", "hope", "wish", "namaste", "highfive"], "char": "\u{1F64F}", "fitzpatrick_scale": true, "category": "people" };
const foot = { "keywords": ["kick", "stomp"], "char": "\u{1F9B6}", "fitzpatrick_scale": true, "category": "people" };
const leg = { "keywords": ["kick", "limb"], "char": "\u{1F9B5}", "fitzpatrick_scale": true, "category": "people" };
const handshake = { "keywords": ["agreement", "shake"], "char": "\u{1F91D}", "fitzpatrick_scale": false, "category": "people" };
const point_up = { "keywords": ["hand", "fingers", "direction", "up"], "char": "\u261D", "fitzpatrick_scale": true, "category": "people" };
const point_up_2 = { "keywords": ["fingers", "hand", "direction", "up"], "char": "\u{1F446}", "fitzpatrick_scale": true, "category": "people" };
const point_down = { "keywords": ["fingers", "hand", "direction", "down"], "char": "\u{1F447}", "fitzpatrick_scale": true, "category": "people" };
const point_left = { "keywords": ["direction", "fingers", "hand", "left"], "char": "\u{1F448}", "fitzpatrick_scale": true, "category": "people" };
const point_right = { "keywords": ["fingers", "hand", "direction", "right"], "char": "\u{1F449}", "fitzpatrick_scale": true, "category": "people" };
const fu = { "keywords": ["hand", "fingers", "rude", "middle", "flipping"], "char": "\u{1F595}", "fitzpatrick_scale": true, "category": "people" };
const raised_hand_with_fingers_splayed = { "keywords": ["hand", "fingers", "palm"], "char": "\u{1F590}", "fitzpatrick_scale": true, "category": "people" };
const love_you = { "keywords": ["hand", "fingers", "gesture"], "char": "\u{1F91F}", "fitzpatrick_scale": true, "category": "people" };
const metal = { "keywords": ["hand", "fingers", "evil_eye", "sign_of_horns", "rock_on"], "char": "\u{1F918}", "fitzpatrick_scale": true, "category": "people" };
const crossed_fingers = { "keywords": ["good", "lucky"], "char": "\u{1F91E}", "fitzpatrick_scale": true, "category": "people" };
const vulcan_salute = { "keywords": ["hand", "fingers", "spock", "star trek"], "char": "\u{1F596}", "fitzpatrick_scale": true, "category": "people" };
const writing_hand = { "keywords": ["lower_left_ballpoint_pen", "stationery", "write", "compose"], "char": "\u270D", "fitzpatrick_scale": true, "category": "people" };
const selfie = { "keywords": ["camera", "phone"], "char": "\u{1F933}", "fitzpatrick_scale": true, "category": "people" };
const nail_care = { "keywords": ["beauty", "manicure", "finger", "fashion", "nail"], "char": "\u{1F485}", "fitzpatrick_scale": true, "category": "people" };
const lips = { "keywords": ["mouth", "kiss"], "char": "\u{1F444}", "fitzpatrick_scale": false, "category": "people" };
const tooth = { "keywords": ["teeth", "dentist"], "char": "\u{1F9B7}", "fitzpatrick_scale": false, "category": "people" };
const tongue = { "keywords": ["mouth", "playful"], "char": "\u{1F445}", "fitzpatrick_scale": false, "category": "people" };
const ear = { "keywords": ["face", "hear", "sound", "listen"], "char": "\u{1F442}", "fitzpatrick_scale": true, "category": "people" };
const nose = { "keywords": ["smell", "sniff"], "char": "\u{1F443}", "fitzpatrick_scale": true, "category": "people" };
const eye = { "keywords": ["face", "look", "see", "watch", "stare"], "char": "\u{1F441}", "fitzpatrick_scale": false, "category": "people" };
const eyes = { "keywords": ["look", "watch", "stalk", "peek", "see"], "char": "\u{1F440}", "fitzpatrick_scale": false, "category": "people" };
const brain = { "keywords": ["smart", "intelligent"], "char": "\u{1F9E0}", "fitzpatrick_scale": false, "category": "people" };
const bust_in_silhouette = { "keywords": ["user", "person", "human"], "char": "\u{1F464}", "fitzpatrick_scale": false, "category": "people" };
const busts_in_silhouette = { "keywords": ["user", "person", "human", "group", "team"], "char": "\u{1F465}", "fitzpatrick_scale": false, "category": "people" };
const speaking_head = { "keywords": ["user", "person", "human", "sing", "say", "talk"], "char": "\u{1F5E3}", "fitzpatrick_scale": false, "category": "people" };
const baby = { "keywords": ["child", "boy", "girl", "toddler"], "char": "\u{1F476}", "fitzpatrick_scale": true, "category": "people" };
const child = { "keywords": ["gender-neutral", "young"], "char": "\u{1F9D2}", "fitzpatrick_scale": true, "category": "people" };
const boy = { "keywords": ["man", "male", "guy", "teenager"], "char": "\u{1F466}", "fitzpatrick_scale": true, "category": "people" };
const girl = { "keywords": ["female", "woman", "teenager"], "char": "\u{1F467}", "fitzpatrick_scale": true, "category": "people" };
const adult = { "keywords": ["gender-neutral", "person"], "char": "\u{1F9D1}", "fitzpatrick_scale": true, "category": "people" };
const man = { "keywords": ["mustache", "father", "dad", "guy", "classy", "sir", "moustache"], "char": "\u{1F468}", "fitzpatrick_scale": true, "category": "people" };
const woman = { "keywords": ["female", "girls", "lady"], "char": "\u{1F469}", "fitzpatrick_scale": true, "category": "people" };
const blonde_woman = { "keywords": ["woman", "female", "girl", "blonde", "person"], "char": "\u{1F471}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const blonde_man = { "keywords": ["man", "male", "boy", "blonde", "guy", "person"], "char": "\u{1F471}", "fitzpatrick_scale": true, "category": "people" };
const bearded_person = { "keywords": ["person", "bewhiskered"], "char": "\u{1F9D4}", "fitzpatrick_scale": true, "category": "people" };
const older_adult = { "keywords": ["human", "elder", "senior", "gender-neutral"], "char": "\u{1F9D3}", "fitzpatrick_scale": true, "category": "people" };
const older_man = { "keywords": ["human", "male", "men", "old", "elder", "senior"], "char": "\u{1F474}", "fitzpatrick_scale": true, "category": "people" };
const older_woman = { "keywords": ["human", "female", "women", "lady", "old", "elder", "senior"], "char": "\u{1F475}", "fitzpatrick_scale": true, "category": "people" };
const man_with_gua_pi_mao = { "keywords": ["male", "boy", "chinese"], "char": "\u{1F472}", "fitzpatrick_scale": true, "category": "people" };
const woman_with_headscarf = { "keywords": ["female", "hijab", "mantilla", "tichel"], "char": "\u{1F9D5}", "fitzpatrick_scale": true, "category": "people" };
const woman_with_turban = { "keywords": ["female", "indian", "hinduism", "arabs", "woman"], "char": "\u{1F473}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_with_turban = { "keywords": ["male", "indian", "hinduism", "arabs"], "char": "\u{1F473}", "fitzpatrick_scale": true, "category": "people" };
const policewoman = { "keywords": ["woman", "police", "law", "legal", "enforcement", "arrest", "911", "female"], "char": "\u{1F46E}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const policeman = { "keywords": ["man", "police", "law", "legal", "enforcement", "arrest", "911"], "char": "\u{1F46E}", "fitzpatrick_scale": true, "category": "people" };
const construction_worker_woman = { "keywords": ["female", "human", "wip", "build", "construction", "worker", "labor", "woman"], "char": "\u{1F477}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const construction_worker_man = { "keywords": ["male", "human", "wip", "guy", "build", "construction", "worker", "labor"], "char": "\u{1F477}", "fitzpatrick_scale": true, "category": "people" };
const guardswoman = { "keywords": ["uk", "gb", "british", "female", "royal", "woman"], "char": "\u{1F482}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const guardsman = { "keywords": ["uk", "gb", "british", "male", "guy", "royal"], "char": "\u{1F482}", "fitzpatrick_scale": true, "category": "people" };
const female_detective = { "keywords": ["human", "spy", "detective", "female", "woman"], "char": "\u{1F575}\uFE0F\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const male_detective = { "keywords": ["human", "spy", "detective"], "char": "\u{1F575}", "fitzpatrick_scale": true, "category": "people" };
const woman_health_worker = { "keywords": ["doctor", "nurse", "therapist", "healthcare", "woman", "human"], "char": "\u{1F469}\u200D\u2695\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_health_worker = { "keywords": ["doctor", "nurse", "therapist", "healthcare", "man", "human"], "char": "\u{1F468}\u200D\u2695\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_farmer = { "keywords": ["rancher", "gardener", "woman", "human"], "char": "\u{1F469}\u200D\u{1F33E}", "fitzpatrick_scale": true, "category": "people" };
const man_farmer = { "keywords": ["rancher", "gardener", "man", "human"], "char": "\u{1F468}\u200D\u{1F33E}", "fitzpatrick_scale": true, "category": "people" };
const woman_cook = { "keywords": ["chef", "woman", "human"], "char": "\u{1F469}\u200D\u{1F373}", "fitzpatrick_scale": true, "category": "people" };
const man_cook = { "keywords": ["chef", "man", "human"], "char": "\u{1F468}\u200D\u{1F373}", "fitzpatrick_scale": true, "category": "people" };
const woman_student = { "keywords": ["graduate", "woman", "human"], "char": "\u{1F469}\u200D\u{1F393}", "fitzpatrick_scale": true, "category": "people" };
const man_student = { "keywords": ["graduate", "man", "human"], "char": "\u{1F468}\u200D\u{1F393}", "fitzpatrick_scale": true, "category": "people" };
const woman_singer = { "keywords": ["rockstar", "entertainer", "woman", "human"], "char": "\u{1F469}\u200D\u{1F3A4}", "fitzpatrick_scale": true, "category": "people" };
const man_singer = { "keywords": ["rockstar", "entertainer", "man", "human"], "char": "\u{1F468}\u200D\u{1F3A4}", "fitzpatrick_scale": true, "category": "people" };
const woman_teacher = { "keywords": ["instructor", "professor", "woman", "human"], "char": "\u{1F469}\u200D\u{1F3EB}", "fitzpatrick_scale": true, "category": "people" };
const man_teacher = { "keywords": ["instructor", "professor", "man", "human"], "char": "\u{1F468}\u200D\u{1F3EB}", "fitzpatrick_scale": true, "category": "people" };
const woman_factory_worker = { "keywords": ["assembly", "industrial", "woman", "human"], "char": "\u{1F469}\u200D\u{1F3ED}", "fitzpatrick_scale": true, "category": "people" };
const man_factory_worker = { "keywords": ["assembly", "industrial", "man", "human"], "char": "\u{1F468}\u200D\u{1F3ED}", "fitzpatrick_scale": true, "category": "people" };
const woman_technologist = { "keywords": ["coder", "developer", "engineer", "programmer", "software", "woman", "human", "laptop", "computer"], "char": "\u{1F469}\u200D\u{1F4BB}", "fitzpatrick_scale": true, "category": "people" };
const man_technologist = { "keywords": ["coder", "developer", "engineer", "programmer", "software", "man", "human", "laptop", "computer"], "char": "\u{1F468}\u200D\u{1F4BB}", "fitzpatrick_scale": true, "category": "people" };
const woman_office_worker = { "keywords": ["business", "manager", "woman", "human"], "char": "\u{1F469}\u200D\u{1F4BC}", "fitzpatrick_scale": true, "category": "people" };
const man_office_worker = { "keywords": ["business", "manager", "man", "human"], "char": "\u{1F468}\u200D\u{1F4BC}", "fitzpatrick_scale": true, "category": "people" };
const woman_mechanic = { "keywords": ["plumber", "woman", "human", "wrench"], "char": "\u{1F469}\u200D\u{1F527}", "fitzpatrick_scale": true, "category": "people" };
const man_mechanic = { "keywords": ["plumber", "man", "human", "wrench"], "char": "\u{1F468}\u200D\u{1F527}", "fitzpatrick_scale": true, "category": "people" };
const woman_scientist = { "keywords": ["biologist", "chemist", "engineer", "physicist", "woman", "human"], "char": "\u{1F469}\u200D\u{1F52C}", "fitzpatrick_scale": true, "category": "people" };
const man_scientist = { "keywords": ["biologist", "chemist", "engineer", "physicist", "man", "human"], "char": "\u{1F468}\u200D\u{1F52C}", "fitzpatrick_scale": true, "category": "people" };
const woman_artist = { "keywords": ["painter", "woman", "human"], "char": "\u{1F469}\u200D\u{1F3A8}", "fitzpatrick_scale": true, "category": "people" };
const man_artist = { "keywords": ["painter", "man", "human"], "char": "\u{1F468}\u200D\u{1F3A8}", "fitzpatrick_scale": true, "category": "people" };
const woman_firefighter = { "keywords": ["fireman", "woman", "human"], "char": "\u{1F469}\u200D\u{1F692}", "fitzpatrick_scale": true, "category": "people" };
const man_firefighter = { "keywords": ["fireman", "man", "human"], "char": "\u{1F468}\u200D\u{1F692}", "fitzpatrick_scale": true, "category": "people" };
const woman_pilot = { "keywords": ["aviator", "plane", "woman", "human"], "char": "\u{1F469}\u200D\u2708\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_pilot = { "keywords": ["aviator", "plane", "man", "human"], "char": "\u{1F468}\u200D\u2708\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_astronaut = { "keywords": ["space", "rocket", "woman", "human"], "char": "\u{1F469}\u200D\u{1F680}", "fitzpatrick_scale": true, "category": "people" };
const man_astronaut = { "keywords": ["space", "rocket", "man", "human"], "char": "\u{1F468}\u200D\u{1F680}", "fitzpatrick_scale": true, "category": "people" };
const woman_judge = { "keywords": ["justice", "court", "woman", "human"], "char": "\u{1F469}\u200D\u2696\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_judge = { "keywords": ["justice", "court", "man", "human"], "char": "\u{1F468}\u200D\u2696\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_superhero = { "keywords": ["woman", "female", "good", "heroine", "superpowers"], "char": "\u{1F9B8}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_superhero = { "keywords": ["man", "male", "good", "hero", "superpowers"], "char": "\u{1F9B8}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_supervillain = { "keywords": ["woman", "female", "evil", "bad", "criminal", "heroine", "superpowers"], "char": "\u{1F9B9}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_supervillain = { "keywords": ["man", "male", "evil", "bad", "criminal", "hero", "superpowers"], "char": "\u{1F9B9}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const mrs_claus = { "keywords": ["woman", "female", "xmas", "mother christmas"], "char": "\u{1F936}", "fitzpatrick_scale": true, "category": "people" };
const santa = { "keywords": ["festival", "man", "male", "xmas", "father christmas"], "char": "\u{1F385}", "fitzpatrick_scale": true, "category": "people" };
const sorceress = { "keywords": ["woman", "female", "mage", "witch"], "char": "\u{1F9D9}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const wizard = { "keywords": ["man", "male", "mage", "sorcerer"], "char": "\u{1F9D9}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_elf = { "keywords": ["woman", "female"], "char": "\u{1F9DD}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_elf = { "keywords": ["man", "male"], "char": "\u{1F9DD}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_vampire = { "keywords": ["woman", "female"], "char": "\u{1F9DB}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_vampire = { "keywords": ["man", "male", "dracula"], "char": "\u{1F9DB}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_zombie = { "keywords": ["woman", "female", "undead", "walking dead"], "char": "\u{1F9DF}\u200D\u2640\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const man_zombie = { "keywords": ["man", "male", "dracula", "undead", "walking dead"], "char": "\u{1F9DF}\u200D\u2642\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const woman_genie = { "keywords": ["woman", "female"], "char": "\u{1F9DE}\u200D\u2640\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const man_genie = { "keywords": ["man", "male"], "char": "\u{1F9DE}\u200D\u2642\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const mermaid = { "keywords": ["woman", "female", "merwoman", "ariel"], "char": "\u{1F9DC}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const merman = { "keywords": ["man", "male", "triton"], "char": "\u{1F9DC}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_fairy = { "keywords": ["woman", "female"], "char": "\u{1F9DA}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_fairy = { "keywords": ["man", "male"], "char": "\u{1F9DA}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const angel = { "keywords": ["heaven", "wings", "halo"], "char": "\u{1F47C}", "fitzpatrick_scale": true, "category": "people" };
const pregnant_woman = { "keywords": ["baby"], "char": "\u{1F930}", "fitzpatrick_scale": true, "category": "people" };
const breastfeeding = { "keywords": ["nursing", "baby"], "char": "\u{1F931}", "fitzpatrick_scale": true, "category": "people" };
const princess = { "keywords": ["girl", "woman", "female", "blond", "crown", "royal", "queen"], "char": "\u{1F478}", "fitzpatrick_scale": true, "category": "people" };
const prince = { "keywords": ["boy", "man", "male", "crown", "royal", "king"], "char": "\u{1F934}", "fitzpatrick_scale": true, "category": "people" };
const bride_with_veil = { "keywords": ["couple", "marriage", "wedding", "woman", "bride"], "char": "\u{1F470}", "fitzpatrick_scale": true, "category": "people" };
const man_in_tuxedo = { "keywords": ["couple", "marriage", "wedding", "groom"], "char": "\u{1F935}", "fitzpatrick_scale": true, "category": "people" };
const running_woman = { "keywords": ["woman", "walking", "exercise", "race", "running", "female"], "char": "\u{1F3C3}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const running_man = { "keywords": ["man", "walking", "exercise", "race", "running"], "char": "\u{1F3C3}", "fitzpatrick_scale": true, "category": "people" };
const walking_woman = { "keywords": ["human", "feet", "steps", "woman", "female"], "char": "\u{1F6B6}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const walking_man = { "keywords": ["human", "feet", "steps"], "char": "\u{1F6B6}", "fitzpatrick_scale": true, "category": "people" };
const dancer = { "keywords": ["female", "girl", "woman", "fun"], "char": "\u{1F483}", "fitzpatrick_scale": true, "category": "people" };
const man_dancing = { "keywords": ["male", "boy", "fun", "dancer"], "char": "\u{1F57A}", "fitzpatrick_scale": true, "category": "people" };
const dancing_women = { "keywords": ["female", "bunny", "women", "girls"], "char": "\u{1F46F}", "fitzpatrick_scale": false, "category": "people" };
const dancing_men = { "keywords": ["male", "bunny", "men", "boys"], "char": "\u{1F46F}\u200D\u2642\uFE0F", "fitzpatrick_scale": false, "category": "people" };
const couple = { "keywords": ["pair", "people", "human", "love", "date", "dating", "like", "affection", "valentines", "marriage"], "char": "\u{1F46B}", "fitzpatrick_scale": false, "category": "people" };
const two_men_holding_hands = { "keywords": ["pair", "couple", "love", "like", "bromance", "friendship", "people", "human"], "char": "\u{1F46C}", "fitzpatrick_scale": false, "category": "people" };
const two_women_holding_hands = { "keywords": ["pair", "friendship", "couple", "love", "like", "female", "people", "human"], "char": "\u{1F46D}", "fitzpatrick_scale": false, "category": "people" };
const bowing_woman = { "keywords": ["woman", "female", "girl"], "char": "\u{1F647}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const bowing_man = { "keywords": ["man", "male", "boy"], "char": "\u{1F647}", "fitzpatrick_scale": true, "category": "people" };
const man_facepalming = { "keywords": ["man", "male", "boy", "disbelief"], "char": "\u{1F926}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_facepalming = { "keywords": ["woman", "female", "girl", "disbelief"], "char": "\u{1F926}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_shrugging = { "keywords": ["woman", "female", "girl", "confused", "indifferent", "doubt"], "char": "\u{1F937}", "fitzpatrick_scale": true, "category": "people" };
const man_shrugging = { "keywords": ["man", "male", "boy", "confused", "indifferent", "doubt"], "char": "\u{1F937}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const tipping_hand_woman = { "keywords": ["female", "girl", "woman", "human", "information"], "char": "\u{1F481}", "fitzpatrick_scale": true, "category": "people" };
const tipping_hand_man = { "keywords": ["male", "boy", "man", "human", "information"], "char": "\u{1F481}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const no_good_woman = { "keywords": ["female", "girl", "woman", "nope"], "char": "\u{1F645}", "fitzpatrick_scale": true, "category": "people" };
const no_good_man = { "keywords": ["male", "boy", "man", "nope"], "char": "\u{1F645}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const ok_woman = { "keywords": ["women", "girl", "female", "pink", "human", "woman"], "char": "\u{1F646}", "fitzpatrick_scale": true, "category": "people" };
const ok_man = { "keywords": ["men", "boy", "male", "blue", "human", "man"], "char": "\u{1F646}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const raising_hand_woman = { "keywords": ["female", "girl", "woman"], "char": "\u{1F64B}", "fitzpatrick_scale": true, "category": "people" };
const raising_hand_man = { "keywords": ["male", "boy", "man"], "char": "\u{1F64B}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const pouting_woman = { "keywords": ["female", "girl", "woman"], "char": "\u{1F64E}", "fitzpatrick_scale": true, "category": "people" };
const pouting_man = { "keywords": ["male", "boy", "man"], "char": "\u{1F64E}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const frowning_woman = { "keywords": ["female", "girl", "woman", "sad", "depressed", "discouraged", "unhappy"], "char": "\u{1F64D}", "fitzpatrick_scale": true, "category": "people" };
const frowning_man = { "keywords": ["male", "boy", "man", "sad", "depressed", "discouraged", "unhappy"], "char": "\u{1F64D}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const haircut_woman = { "keywords": ["female", "girl", "woman"], "char": "\u{1F487}", "fitzpatrick_scale": true, "category": "people" };
const haircut_man = { "keywords": ["male", "boy", "man"], "char": "\u{1F487}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const massage_woman = { "keywords": ["female", "girl", "woman", "head"], "char": "\u{1F486}", "fitzpatrick_scale": true, "category": "people" };
const massage_man = { "keywords": ["male", "boy", "man", "head"], "char": "\u{1F486}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const woman_in_steamy_room = { "keywords": ["female", "woman", "spa", "steamroom", "sauna"], "char": "\u{1F9D6}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const man_in_steamy_room = { "keywords": ["male", "man", "spa", "steamroom", "sauna"], "char": "\u{1F9D6}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "people" };
const couple_with_heart_woman_man = { "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"], "char": "\u{1F491}", "fitzpatrick_scale": false, "category": "people" };
const couple_with_heart_woman_woman = { "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"], "char": "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}", "fitzpatrick_scale": false, "category": "people" };
const couple_with_heart_man_man = { "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"], "char": "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}", "fitzpatrick_scale": false, "category": "people" };
const couplekiss_man_woman = { "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"], "char": "\u{1F48F}", "fitzpatrick_scale": false, "category": "people" };
const couplekiss_woman_woman = { "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"], "char": "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}", "fitzpatrick_scale": false, "category": "people" };
const couplekiss_man_man = { "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"], "char": "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}", "fitzpatrick_scale": false, "category": "people" };
const family_man_woman_boy = { "keywords": ["home", "parents", "child", "mom", "dad", "father", "mother", "people", "human"], "char": "\u{1F46A}", "fitzpatrick_scale": false, "category": "people" };
const family_man_woman_girl = { "keywords": ["home", "parents", "people", "human", "child"], "char": "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_man_woman_girl_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_woman_boy_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_woman_girl_girl = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_woman_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_woman_girl = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_woman_girl_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_woman_boy_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_woman_girl_girl = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_man_man_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_man_girl = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_man_man_girl_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_man_boy_boy = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_man_girl_girl = { "keywords": ["home", "parents", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_boy = { "keywords": ["home", "parent", "people", "human", "child"], "char": "\u{1F469}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_girl = { "keywords": ["home", "parent", "people", "human", "child"], "char": "\u{1F469}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_girl_boy = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_boy_boy = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_woman_girl_girl = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_man_boy = { "keywords": ["home", "parent", "people", "human", "child"], "char": "\u{1F468}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_girl = { "keywords": ["home", "parent", "people", "human", "child"], "char": "\u{1F468}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const family_man_girl_boy = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_boy_boy = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}", "fitzpatrick_scale": false, "category": "people" };
const family_man_girl_girl = { "keywords": ["home", "parent", "people", "human", "children"], "char": "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}", "fitzpatrick_scale": false, "category": "people" };
const yarn = { "keywords": ["ball", "crochet", "knit"], "char": "\u{1F9F6}", "fitzpatrick_scale": false, "category": "people" };
const thread = { "keywords": ["needle", "sewing", "spool", "string"], "char": "\u{1F9F5}", "fitzpatrick_scale": false, "category": "people" };
const coat = { "keywords": ["jacket"], "char": "\u{1F9E5}", "fitzpatrick_scale": false, "category": "people" };
const labcoat = { "keywords": ["doctor", "experiment", "scientist", "chemist"], "char": "\u{1F97C}", "fitzpatrick_scale": false, "category": "people" };
const womans_clothes = { "keywords": ["fashion", "shopping_bags", "female"], "char": "\u{1F45A}", "fitzpatrick_scale": false, "category": "people" };
const tshirt = { "keywords": ["fashion", "cloth", "casual", "shirt", "tee"], "char": "\u{1F455}", "fitzpatrick_scale": false, "category": "people" };
const jeans = { "keywords": ["fashion", "shopping"], "char": "\u{1F456}", "fitzpatrick_scale": false, "category": "people" };
const necktie = { "keywords": ["shirt", "suitup", "formal", "fashion", "cloth", "business"], "char": "\u{1F454}", "fitzpatrick_scale": false, "category": "people" };
const dress = { "keywords": ["clothes", "fashion", "shopping"], "char": "\u{1F457}", "fitzpatrick_scale": false, "category": "people" };
const bikini = { "keywords": ["swimming", "female", "woman", "girl", "fashion", "beach", "summer"], "char": "\u{1F459}", "fitzpatrick_scale": false, "category": "people" };
const kimono = { "keywords": ["dress", "fashion", "women", "female", "japanese"], "char": "\u{1F458}", "fitzpatrick_scale": false, "category": "people" };
const lipstick = { "keywords": ["female", "girl", "fashion", "woman"], "char": "\u{1F484}", "fitzpatrick_scale": false, "category": "people" };
const kiss = { "keywords": ["face", "lips", "love", "like", "affection", "valentines"], "char": "\u{1F48B}", "fitzpatrick_scale": false, "category": "people" };
const footprints = { "keywords": ["feet", "tracking", "walking", "beach"], "char": "\u{1F463}", "fitzpatrick_scale": false, "category": "people" };
const flat_shoe = { "keywords": ["ballet", "slip-on", "slipper"], "char": "\u{1F97F}", "fitzpatrick_scale": false, "category": "people" };
const high_heel = { "keywords": ["fashion", "shoes", "female", "pumps", "stiletto"], "char": "\u{1F460}", "fitzpatrick_scale": false, "category": "people" };
const sandal = { "keywords": ["shoes", "fashion", "flip flops"], "char": "\u{1F461}", "fitzpatrick_scale": false, "category": "people" };
const boot = { "keywords": ["shoes", "fashion"], "char": "\u{1F462}", "fitzpatrick_scale": false, "category": "people" };
const mans_shoe = { "keywords": ["fashion", "male"], "char": "\u{1F45E}", "fitzpatrick_scale": false, "category": "people" };
const athletic_shoe = { "keywords": ["shoes", "sports", "sneakers"], "char": "\u{1F45F}", "fitzpatrick_scale": false, "category": "people" };
const hiking_boot = { "keywords": ["backpacking", "camping", "hiking"], "char": "\u{1F97E}", "fitzpatrick_scale": false, "category": "people" };
const socks = { "keywords": ["stockings", "clothes"], "char": "\u{1F9E6}", "fitzpatrick_scale": false, "category": "people" };
const gloves = { "keywords": ["hands", "winter", "clothes"], "char": "\u{1F9E4}", "fitzpatrick_scale": false, "category": "people" };
const scarf = { "keywords": ["neck", "winter", "clothes"], "char": "\u{1F9E3}", "fitzpatrick_scale": false, "category": "people" };
const womans_hat = { "keywords": ["fashion", "accessories", "female", "lady", "spring"], "char": "\u{1F452}", "fitzpatrick_scale": false, "category": "people" };
const tophat = { "keywords": ["magic", "gentleman", "classy", "circus"], "char": "\u{1F3A9}", "fitzpatrick_scale": false, "category": "people" };
const billed_hat = { "keywords": ["cap", "baseball"], "char": "\u{1F9E2}", "fitzpatrick_scale": false, "category": "people" };
const rescue_worker_helmet = { "keywords": ["construction", "build"], "char": "\u26D1", "fitzpatrick_scale": false, "category": "people" };
const mortar_board = { "keywords": ["school", "college", "degree", "university", "graduation", "cap", "hat", "legal", "learn", "education"], "char": "\u{1F393}", "fitzpatrick_scale": false, "category": "people" };
const crown = { "keywords": ["king", "kod", "leader", "royalty", "lord"], "char": "\u{1F451}", "fitzpatrick_scale": false, "category": "people" };
const school_satchel = { "keywords": ["student", "education", "bag", "backpack"], "char": "\u{1F392}", "fitzpatrick_scale": false, "category": "people" };
const luggage = { "keywords": ["packing", "travel"], "char": "\u{1F9F3}", "fitzpatrick_scale": false, "category": "people" };
const pouch = { "keywords": ["bag", "accessories", "shopping"], "char": "\u{1F45D}", "fitzpatrick_scale": false, "category": "people" };
const purse = { "keywords": ["fashion", "accessories", "money", "sales", "shopping"], "char": "\u{1F45B}", "fitzpatrick_scale": false, "category": "people" };
const handbag = { "keywords": ["fashion", "accessory", "accessories", "shopping"], "char": "\u{1F45C}", "fitzpatrick_scale": false, "category": "people" };
const briefcase = { "keywords": ["business", "documents", "work", "law", "legal", "job", "career"], "char": "\u{1F4BC}", "fitzpatrick_scale": false, "category": "people" };
const eyeglasses = { "keywords": ["fashion", "accessories", "eyesight", "nerdy", "dork", "geek"], "char": "\u{1F453}", "fitzpatrick_scale": false, "category": "people" };
const dark_sunglasses = { "keywords": ["face", "cool", "accessories"], "char": "\u{1F576}", "fitzpatrick_scale": false, "category": "people" };
const goggles = { "keywords": ["eyes", "protection", "safety"], "char": "\u{1F97D}", "fitzpatrick_scale": false, "category": "people" };
const ring = { "keywords": ["wedding", "propose", "marriage", "valentines", "diamond", "fashion", "jewelry", "gem", "engagement"], "char": "\u{1F48D}", "fitzpatrick_scale": false, "category": "people" };
const closed_umbrella = { "keywords": ["weather", "rain", "drizzle"], "char": "\u{1F302}", "fitzpatrick_scale": false, "category": "people" };
const dog = { "keywords": ["animal", "friend", "nature", "woof", "puppy", "pet", "faithful"], "char": "\u{1F436}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cat = { "keywords": ["animal", "meow", "nature", "pet", "kitten"], "char": "\u{1F431}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const mouse = { "keywords": ["animal", "nature", "cheese_wedge", "rodent"], "char": "\u{1F42D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hamster = { "keywords": ["animal", "nature"], "char": "\u{1F439}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rabbit = { "keywords": ["animal", "nature", "pet", "spring", "magic", "bunny"], "char": "\u{1F430}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const fox_face = { "keywords": ["animal", "nature", "face"], "char": "\u{1F98A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bear = { "keywords": ["animal", "nature", "wild"], "char": "\u{1F43B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const panda_face = { "keywords": ["animal", "nature", "panda"], "char": "\u{1F43C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const koala = { "keywords": ["animal", "nature"], "char": "\u{1F428}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tiger = { "keywords": ["animal", "cat", "danger", "wild", "nature", "roar"], "char": "\u{1F42F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const lion = { "keywords": ["animal", "nature"], "char": "\u{1F981}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cow = { "keywords": ["beef", "ox", "animal", "nature", "moo", "milk"], "char": "\u{1F42E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const pig = { "keywords": ["animal", "oink", "nature"], "char": "\u{1F437}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const pig_nose = { "keywords": ["animal", "oink"], "char": "\u{1F43D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const frog = { "keywords": ["animal", "nature", "croak", "toad"], "char": "\u{1F438}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const squid = { "keywords": ["animal", "nature", "ocean", "sea"], "char": "\u{1F991}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const octopus = { "keywords": ["animal", "creature", "ocean", "sea", "nature", "beach"], "char": "\u{1F419}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const shrimp = { "keywords": ["animal", "ocean", "nature", "seafood"], "char": "\u{1F990}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const monkey_face = { "keywords": ["animal", "nature", "circus"], "char": "\u{1F435}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const gorilla = { "keywords": ["animal", "nature", "circus"], "char": "\u{1F98D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const see_no_evil = { "keywords": ["monkey", "animal", "nature", "haha"], "char": "\u{1F648}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hear_no_evil = { "keywords": ["animal", "monkey", "nature"], "char": "\u{1F649}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const speak_no_evil = { "keywords": ["monkey", "animal", "nature", "omg"], "char": "\u{1F64A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const monkey = { "keywords": ["animal", "nature", "banana", "circus"], "char": "\u{1F412}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const chicken = { "keywords": ["animal", "cluck", "nature", "bird"], "char": "\u{1F414}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const penguin = { "keywords": ["animal", "nature"], "char": "\u{1F427}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bird = { "keywords": ["animal", "nature", "fly", "tweet", "spring"], "char": "\u{1F426}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const baby_chick = { "keywords": ["animal", "chicken", "bird"], "char": "\u{1F424}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hatching_chick = { "keywords": ["animal", "chicken", "egg", "born", "baby", "bird"], "char": "\u{1F423}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hatched_chick = { "keywords": ["animal", "chicken", "baby", "bird"], "char": "\u{1F425}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const duck = { "keywords": ["animal", "nature", "bird", "mallard"], "char": "\u{1F986}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const eagle = { "keywords": ["animal", "nature", "bird"], "char": "\u{1F985}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const owl = { "keywords": ["animal", "nature", "bird", "hoot"], "char": "\u{1F989}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bat = { "keywords": ["animal", "nature", "blind", "vampire"], "char": "\u{1F987}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const wolf = { "keywords": ["animal", "nature", "wild"], "char": "\u{1F43A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const boar = { "keywords": ["animal", "nature"], "char": "\u{1F417}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const horse = { "keywords": ["animal", "brown", "nature"], "char": "\u{1F434}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const unicorn = { "keywords": ["animal", "nature", "mystical"], "char": "\u{1F984}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const honeybee = { "keywords": ["animal", "insect", "nature", "bug", "spring", "honey"], "char": "\u{1F41D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bug = { "keywords": ["animal", "insect", "nature", "worm"], "char": "\u{1F41B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const butterfly = { "keywords": ["animal", "insect", "nature", "caterpillar"], "char": "\u{1F98B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const snail = { "keywords": ["slow", "animal", "shell"], "char": "\u{1F40C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const beetle = { "keywords": ["animal", "insect", "nature", "ladybug"], "char": "\u{1F41E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const ant = { "keywords": ["animal", "insect", "nature", "bug"], "char": "\u{1F41C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const grasshopper = { "keywords": ["animal", "cricket", "chirp"], "char": "\u{1F997}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const spider = { "keywords": ["animal", "arachnid"], "char": "\u{1F577}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const scorpion = { "keywords": ["animal", "arachnid"], "char": "\u{1F982}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const crab = { "keywords": ["animal", "crustacean"], "char": "\u{1F980}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const snake = { "keywords": ["animal", "evil", "nature", "hiss", "python"], "char": "\u{1F40D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const lizard = { "keywords": ["animal", "nature", "reptile"], "char": "\u{1F98E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sauropod = { "keywords": ["animal", "nature", "dinosaur", "brachiosaurus", "brontosaurus", "diplodocus", "extinct"], "char": "\u{1F995}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const turtle = { "keywords": ["animal", "slow", "nature", "tortoise"], "char": "\u{1F422}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tropical_fish = { "keywords": ["animal", "swim", "ocean", "beach", "nemo"], "char": "\u{1F420}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const fish = { "keywords": ["animal", "food", "nature"], "char": "\u{1F41F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const blowfish = { "keywords": ["animal", "nature", "food", "sea", "ocean"], "char": "\u{1F421}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dolphin = { "keywords": ["animal", "nature", "fish", "sea", "ocean", "flipper", "fins", "beach"], "char": "\u{1F42C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const shark = { "keywords": ["animal", "nature", "fish", "sea", "ocean", "jaws", "fins", "beach"], "char": "\u{1F988}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const whale = { "keywords": ["animal", "nature", "sea", "ocean"], "char": "\u{1F433}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const whale2 = { "keywords": ["animal", "nature", "sea", "ocean"], "char": "\u{1F40B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const crocodile = { "keywords": ["animal", "nature", "reptile", "lizard", "alligator"], "char": "\u{1F40A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const leopard = { "keywords": ["animal", "nature"], "char": "\u{1F406}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const zebra = { "keywords": ["animal", "nature", "stripes", "safari"], "char": "\u{1F993}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tiger2 = { "keywords": ["animal", "nature", "roar"], "char": "\u{1F405}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const water_buffalo = { "keywords": ["animal", "nature", "ox", "cow"], "char": "\u{1F403}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const ox = { "keywords": ["animal", "cow", "beef"], "char": "\u{1F402}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cow2 = { "keywords": ["beef", "ox", "animal", "nature", "moo", "milk"], "char": "\u{1F404}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const deer = { "keywords": ["animal", "nature", "horns", "venison"], "char": "\u{1F98C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dromedary_camel = { "keywords": ["animal", "hot", "desert", "hump"], "char": "\u{1F42A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const camel = { "keywords": ["animal", "nature", "hot", "desert", "hump"], "char": "\u{1F42B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const giraffe = { "keywords": ["animal", "nature", "spots", "safari"], "char": "\u{1F992}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const elephant = { "keywords": ["animal", "nature", "nose", "th", "circus"], "char": "\u{1F418}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rhinoceros = { "keywords": ["animal", "nature", "horn"], "char": "\u{1F98F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const goat = { "keywords": ["animal", "nature"], "char": "\u{1F410}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const ram = { "keywords": ["animal", "sheep", "nature"], "char": "\u{1F40F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sheep = { "keywords": ["animal", "nature", "wool", "shipit"], "char": "\u{1F411}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const racehorse = { "keywords": ["animal", "gamble", "luck"], "char": "\u{1F40E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const pig2 = { "keywords": ["animal", "nature"], "char": "\u{1F416}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rat = { "keywords": ["animal", "mouse", "rodent"], "char": "\u{1F400}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const mouse2 = { "keywords": ["animal", "nature", "rodent"], "char": "\u{1F401}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rooster = { "keywords": ["animal", "nature", "chicken"], "char": "\u{1F413}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const turkey = { "keywords": ["animal", "bird"], "char": "\u{1F983}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dove = { "keywords": ["animal", "bird"], "char": "\u{1F54A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dog2 = { "keywords": ["animal", "nature", "friend", "doge", "pet", "faithful"], "char": "\u{1F415}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const poodle = { "keywords": ["dog", "animal", "101", "nature", "pet"], "char": "\u{1F429}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cat2 = { "keywords": ["animal", "meow", "pet", "cats"], "char": "\u{1F408}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rabbit2 = { "keywords": ["animal", "nature", "pet", "magic", "spring"], "char": "\u{1F407}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const chipmunk = { "keywords": ["animal", "nature", "rodent", "squirrel"], "char": "\u{1F43F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hedgehog = { "keywords": ["animal", "nature", "spiny"], "char": "\u{1F994}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const raccoon = { "keywords": ["animal", "nature"], "char": "\u{1F99D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const llama = { "keywords": ["animal", "nature", "alpaca"], "char": "\u{1F999}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hippopotamus = { "keywords": ["animal", "nature"], "char": "\u{1F99B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const kangaroo = { "keywords": ["animal", "nature", "australia", "joey", "hop", "marsupial"], "char": "\u{1F998}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const badger = { "keywords": ["animal", "nature", "honey"], "char": "\u{1F9A1}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const swan = { "keywords": ["animal", "nature", "bird"], "char": "\u{1F9A2}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const peacock = { "keywords": ["animal", "nature", "peahen", "bird"], "char": "\u{1F99A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const parrot = { "keywords": ["animal", "nature", "bird", "pirate", "talk"], "char": "\u{1F99C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const lobster = { "keywords": ["animal", "nature", "bisque", "claws", "seafood"], "char": "\u{1F99E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const mosquito = { "keywords": ["animal", "nature", "insect", "malaria"], "char": "\u{1F99F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const paw_prints = { "keywords": ["animal", "tracking", "footprints", "dog", "cat", "pet", "feet"], "char": "\u{1F43E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dragon = { "keywords": ["animal", "myth", "nature", "chinese", "green"], "char": "\u{1F409}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dragon_face = { "keywords": ["animal", "myth", "nature", "chinese", "green"], "char": "\u{1F432}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cactus = { "keywords": ["vegetable", "plant", "nature"], "char": "\u{1F335}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const christmas_tree = { "keywords": ["festival", "vacation", "december", "xmas", "celebration"], "char": "\u{1F384}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const evergreen_tree = { "keywords": ["plant", "nature"], "char": "\u{1F332}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const deciduous_tree = { "keywords": ["plant", "nature"], "char": "\u{1F333}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const palm_tree = { "keywords": ["plant", "vegetable", "nature", "summer", "beach", "mojito", "tropical"], "char": "\u{1F334}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const seedling = { "keywords": ["plant", "nature", "grass", "lawn", "spring"], "char": "\u{1F331}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const herb = { "keywords": ["vegetable", "plant", "medicine", "weed", "grass", "lawn"], "char": "\u{1F33F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const shamrock = { "keywords": ["vegetable", "plant", "nature", "irish", "clover"], "char": "\u2618", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const four_leaf_clover = { "keywords": ["vegetable", "plant", "nature", "lucky", "irish"], "char": "\u{1F340}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bamboo = { "keywords": ["plant", "nature", "vegetable", "panda", "pine_decoration"], "char": "\u{1F38D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tanabata_tree = { "keywords": ["plant", "nature", "branch", "summer"], "char": "\u{1F38B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const leaves = { "keywords": ["nature", "plant", "tree", "vegetable", "grass", "lawn", "spring"], "char": "\u{1F343}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const fallen_leaf = { "keywords": ["nature", "plant", "vegetable", "leaves"], "char": "\u{1F342}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const maple_leaf = { "keywords": ["nature", "plant", "vegetable", "ca", "fall"], "char": "\u{1F341}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const ear_of_rice = { "keywords": ["nature", "plant"], "char": "\u{1F33E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const hibiscus = { "keywords": ["plant", "vegetable", "flowers", "beach"], "char": "\u{1F33A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sunflower = { "keywords": ["nature", "plant", "fall"], "char": "\u{1F33B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const rose = { "keywords": ["flowers", "valentines", "love", "spring"], "char": "\u{1F339}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const wilted_flower = { "keywords": ["plant", "nature", "flower"], "char": "\u{1F940}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tulip = { "keywords": ["flowers", "plant", "nature", "summer", "spring"], "char": "\u{1F337}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const blossom = { "keywords": ["nature", "flowers", "yellow"], "char": "\u{1F33C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cherry_blossom = { "keywords": ["nature", "plant", "spring", "flower"], "char": "\u{1F338}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const bouquet = { "keywords": ["flowers", "nature", "spring"], "char": "\u{1F490}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const mushroom = { "keywords": ["plant", "vegetable"], "char": "\u{1F344}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const chestnut = { "keywords": ["food", "squirrel"], "char": "\u{1F330}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const jack_o_lantern = { "keywords": ["halloween", "light", "pumpkin", "creepy", "fall"], "char": "\u{1F383}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const shell = { "keywords": ["nature", "sea", "beach"], "char": "\u{1F41A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const spider_web = { "keywords": ["animal", "insect", "arachnid", "silk"], "char": "\u{1F578}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const earth_americas = { "keywords": ["globe", "world", "USA", "international"], "char": "\u{1F30E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const earth_africa = { "keywords": ["globe", "world", "international"], "char": "\u{1F30D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const earth_asia = { "keywords": ["globe", "world", "east", "international"], "char": "\u{1F30F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const full_moon = { "keywords": ["nature", "yellow", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F315}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const waning_gibbous_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep", "waxing_gibbous_moon"], "char": "\u{1F316}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const last_quarter_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F317}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const waning_crescent_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F318}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const new_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F311}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const waxing_crescent_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F312}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const first_quarter_moon = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F313}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const waxing_gibbous_moon = { "keywords": ["nature", "night", "sky", "gray", "twilight", "planet", "space", "evening", "sleep"], "char": "\u{1F314}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const new_moon_with_face = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F31A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const full_moon_with_face = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F31D}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const first_quarter_moon_with_face = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F31B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const last_quarter_moon_with_face = { "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"], "char": "\u{1F31C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sun_with_face = { "keywords": ["nature", "morning", "sky"], "char": "\u{1F31E}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const crescent_moon = { "keywords": ["night", "sleep", "sky", "evening", "magic"], "char": "\u{1F319}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const star = { "keywords": ["night", "yellow"], "char": "\u2B50", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const star2 = { "keywords": ["night", "sparkle", "awesome", "good", "magic"], "char": "\u{1F31F}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dizzy = { "keywords": ["star", "sparkle", "shoot", "magic"], "char": "\u{1F4AB}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sparkles = { "keywords": ["stars", "shine", "shiny", "cool", "awesome", "good", "magic"], "char": "\u2728", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const comet = { "keywords": ["space"], "char": "\u2604", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sunny = { "keywords": ["weather", "nature", "brightness", "summer", "beach", "spring"], "char": "\u2600\uFE0F", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sun_behind_small_cloud = { "keywords": ["weather"], "char": "\u{1F324}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const partly_sunny = { "keywords": ["weather", "nature", "cloudy", "morning", "fall", "spring"], "char": "\u26C5", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sun_behind_large_cloud = { "keywords": ["weather"], "char": "\u{1F325}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sun_behind_rain_cloud = { "keywords": ["weather"], "char": "\u{1F326}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cloud = { "keywords": ["weather", "sky"], "char": "\u2601\uFE0F", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cloud_with_rain = { "keywords": ["weather"], "char": "\u{1F327}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cloud_with_lightning_and_rain = { "keywords": ["weather", "lightning"], "char": "\u26C8", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cloud_with_lightning = { "keywords": ["weather", "thunder"], "char": "\u{1F329}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const zap = { "keywords": ["thunder", "weather", "lightning bolt", "fast"], "char": "\u26A1", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const fire = { "keywords": ["hot", "cook", "flame"], "char": "\u{1F525}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const boom = { "keywords": ["bomb", "explode", "explosion", "collision", "blown"], "char": "\u{1F4A5}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const snowflake = { "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas"], "char": "\u2744\uFE0F", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const cloud_with_snow = { "keywords": ["weather"], "char": "\u{1F328}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const snowman = { "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas", "frozen", "without_snow"], "char": "\u26C4", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const snowman_with_snow = { "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas", "frozen"], "char": "\u2603", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const wind_face = { "keywords": ["gust", "air"], "char": "\u{1F32C}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const dash = { "keywords": ["wind", "air", "fast", "shoo", "fart", "smoke", "puff"], "char": "\u{1F4A8}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const tornado = { "keywords": ["weather", "cyclone", "twister"], "char": "\u{1F32A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const fog = { "keywords": ["weather"], "char": "\u{1F32B}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const open_umbrella = { "keywords": ["weather", "spring"], "char": "\u2602", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const umbrella = { "keywords": ["rainy", "weather", "spring"], "char": "\u2614", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const droplet = { "keywords": ["water", "drip", "faucet", "spring"], "char": "\u{1F4A7}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const sweat_drops = { "keywords": ["water", "drip", "oops"], "char": "\u{1F4A6}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const ocean = { "keywords": ["sea", "water", "wave", "nature", "tsunami", "disaster"], "char": "\u{1F30A}", "fitzpatrick_scale": false, "category": "animals_and_nature" };
const green_apple = { "keywords": ["fruit", "nature"], "char": "\u{1F34F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const apple = { "keywords": ["fruit", "mac", "school"], "char": "\u{1F34E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pear = { "keywords": ["fruit", "nature", "food"], "char": "\u{1F350}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const tangerine = { "keywords": ["food", "fruit", "nature", "orange"], "char": "\u{1F34A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const lemon = { "keywords": ["fruit", "nature"], "char": "\u{1F34B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const banana = { "keywords": ["fruit", "food", "monkey"], "char": "\u{1F34C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const watermelon = { "keywords": ["fruit", "food", "picnic", "summer"], "char": "\u{1F349}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const grapes = { "keywords": ["fruit", "food", "wine"], "char": "\u{1F347}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const strawberry = { "keywords": ["fruit", "food", "nature"], "char": "\u{1F353}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const melon = { "keywords": ["fruit", "nature", "food"], "char": "\u{1F348}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cherries = { "keywords": ["food", "fruit"], "char": "\u{1F352}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const peach = { "keywords": ["fruit", "nature", "food"], "char": "\u{1F351}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pineapple = { "keywords": ["fruit", "nature", "food"], "char": "\u{1F34D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const coconut = { "keywords": ["fruit", "nature", "food", "palm"], "char": "\u{1F965}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const kiwi_fruit = { "keywords": ["fruit", "food"], "char": "\u{1F95D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const mango = { "keywords": ["fruit", "food", "tropical"], "char": "\u{1F96D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const avocado = { "keywords": ["fruit", "food"], "char": "\u{1F951}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const broccoli = { "keywords": ["fruit", "food", "vegetable"], "char": "\u{1F966}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const tomato = { "keywords": ["fruit", "vegetable", "nature", "food"], "char": "\u{1F345}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const eggplant = { "keywords": ["vegetable", "nature", "food", "aubergine"], "char": "\u{1F346}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cucumber = { "keywords": ["fruit", "food", "pickle"], "char": "\u{1F952}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const carrot = { "keywords": ["vegetable", "food", "orange"], "char": "\u{1F955}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const hot_pepper = { "keywords": ["food", "spicy", "chilli", "chili"], "char": "\u{1F336}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const potato = { "keywords": ["food", "tuber", "vegatable", "starch"], "char": "\u{1F954}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const corn = { "keywords": ["food", "vegetable", "plant"], "char": "\u{1F33D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const leafy_greens = { "keywords": ["food", "vegetable", "plant", "bok choy", "cabbage", "kale", "lettuce"], "char": "\u{1F96C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const sweet_potato = { "keywords": ["food", "nature"], "char": "\u{1F360}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const peanuts = { "keywords": ["food", "nut"], "char": "\u{1F95C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const honey_pot = { "keywords": ["bees", "sweet", "kitchen"], "char": "\u{1F36F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const croissant = { "keywords": ["food", "bread", "french"], "char": "\u{1F950}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bread = { "keywords": ["food", "wheat", "breakfast", "toast"], "char": "\u{1F35E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const baguette_bread = { "keywords": ["food", "bread", "french"], "char": "\u{1F956}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bagel = { "keywords": ["food", "bread", "bakery", "schmear"], "char": "\u{1F96F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pretzel = { "keywords": ["food", "bread", "twisted"], "char": "\u{1F968}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cheese = { "keywords": ["food", "chadder"], "char": "\u{1F9C0}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const egg = { "keywords": ["food", "chicken", "breakfast"], "char": "\u{1F95A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bacon = { "keywords": ["food", "breakfast", "pork", "pig", "meat"], "char": "\u{1F953}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const steak = { "keywords": ["food", "cow", "meat", "cut", "chop", "lambchop", "porkchop"], "char": "\u{1F969}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pancakes = { "keywords": ["food", "breakfast", "flapjacks", "hotcakes"], "char": "\u{1F95E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const poultry_leg = { "keywords": ["food", "meat", "drumstick", "bird", "chicken", "turkey"], "char": "\u{1F357}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const meat_on_bone = { "keywords": ["good", "food", "drumstick"], "char": "\u{1F356}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bone = { "keywords": ["skeleton"], "char": "\u{1F9B4}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fried_shrimp = { "keywords": ["food", "animal", "appetizer", "summer"], "char": "\u{1F364}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fried_egg = { "keywords": ["food", "breakfast", "kitchen", "egg"], "char": "\u{1F373}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const hamburger = { "keywords": ["meat", "fast food", "beef", "cheeseburger", "mcdonalds", "burger king"], "char": "\u{1F354}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fries = { "keywords": ["chips", "snack", "fast food"], "char": "\u{1F35F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const stuffed_flatbread = { "keywords": ["food", "flatbread", "stuffed", "gyro"], "char": "\u{1F959}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const hotdog = { "keywords": ["food", "frankfurter"], "char": "\u{1F32D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pizza = { "keywords": ["food", "party"], "char": "\u{1F355}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const sandwich = { "keywords": ["food", "lunch", "bread"], "char": "\u{1F96A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const canned_food = { "keywords": ["food", "soup"], "char": "\u{1F96B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const spaghetti = { "keywords": ["food", "italian", "noodle"], "char": "\u{1F35D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const taco = { "keywords": ["food", "mexican"], "char": "\u{1F32E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const burrito = { "keywords": ["food", "mexican"], "char": "\u{1F32F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const green_salad = { "keywords": ["food", "healthy", "lettuce"], "char": "\u{1F957}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const shallow_pan_of_food = { "keywords": ["food", "cooking", "casserole", "paella"], "char": "\u{1F958}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const ramen = { "keywords": ["food", "japanese", "noodle", "chopsticks"], "char": "\u{1F35C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const stew = { "keywords": ["food", "meat", "soup"], "char": "\u{1F372}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fish_cake = { "keywords": ["food", "japan", "sea", "beach", "narutomaki", "pink", "swirl", "kamaboko", "surimi", "ramen"], "char": "\u{1F365}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fortune_cookie = { "keywords": ["food", "prophecy"], "char": "\u{1F960}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const sushi = { "keywords": ["food", "fish", "japanese", "rice"], "char": "\u{1F363}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bento = { "keywords": ["food", "japanese", "box"], "char": "\u{1F371}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const curry = { "keywords": ["food", "spicy", "hot", "indian"], "char": "\u{1F35B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const rice_ball = { "keywords": ["food", "japanese"], "char": "\u{1F359}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const rice = { "keywords": ["food", "china", "asian"], "char": "\u{1F35A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const rice_cracker = { "keywords": ["food", "japanese"], "char": "\u{1F358}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const oden = { "keywords": ["food", "japanese"], "char": "\u{1F362}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const dango = { "keywords": ["food", "dessert", "sweet", "japanese", "barbecue", "meat"], "char": "\u{1F361}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const shaved_ice = { "keywords": ["hot", "dessert", "summer"], "char": "\u{1F367}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const ice_cream = { "keywords": ["food", "hot", "dessert"], "char": "\u{1F368}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const icecream = { "keywords": ["food", "hot", "dessert", "summer"], "char": "\u{1F366}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const pie = { "keywords": ["food", "dessert", "pastry"], "char": "\u{1F967}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cake = { "keywords": ["food", "dessert"], "char": "\u{1F370}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cupcake = { "keywords": ["food", "dessert", "bakery", "sweet"], "char": "\u{1F9C1}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const moon_cake = { "keywords": ["food", "autumn"], "char": "\u{1F96E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const birthday = { "keywords": ["food", "dessert", "cake"], "char": "\u{1F382}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const custard = { "keywords": ["dessert", "food"], "char": "\u{1F36E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const candy = { "keywords": ["snack", "dessert", "sweet", "lolly"], "char": "\u{1F36C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const lollipop = { "keywords": ["food", "snack", "candy", "sweet"], "char": "\u{1F36D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const chocolate_bar = { "keywords": ["food", "snack", "dessert", "sweet"], "char": "\u{1F36B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const popcorn = { "keywords": ["food", "movie theater", "films", "snack"], "char": "\u{1F37F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const dumpling = { "keywords": ["food", "empanada", "pierogi", "potsticker"], "char": "\u{1F95F}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const doughnut = { "keywords": ["food", "dessert", "snack", "sweet", "donut"], "char": "\u{1F369}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cookie = { "keywords": ["food", "snack", "oreo", "chocolate", "sweet", "dessert"], "char": "\u{1F36A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const milk_glass = { "keywords": ["beverage", "drink", "cow"], "char": "\u{1F95B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const beer = { "keywords": ["relax", "beverage", "drink", "drunk", "party", "pub", "summer", "alcohol", "booze"], "char": "\u{1F37A}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const beers = { "keywords": ["relax", "beverage", "drink", "drunk", "party", "pub", "summer", "alcohol", "booze"], "char": "\u{1F37B}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const clinking_glasses = { "keywords": ["beverage", "drink", "party", "alcohol", "celebrate", "cheers", "wine", "champagne", "toast"], "char": "\u{1F942}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const wine_glass = { "keywords": ["drink", "beverage", "drunk", "alcohol", "booze"], "char": "\u{1F377}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const tumbler_glass = { "keywords": ["drink", "beverage", "drunk", "alcohol", "liquor", "booze", "bourbon", "scotch", "whisky", "glass", "shot"], "char": "\u{1F943}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cocktail = { "keywords": ["drink", "drunk", "alcohol", "beverage", "booze", "mojito"], "char": "\u{1F378}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const tropical_drink = { "keywords": ["beverage", "cocktail", "summer", "beach", "alcohol", "booze", "mojito"], "char": "\u{1F379}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const champagne = { "keywords": ["drink", "wine", "bottle", "celebration"], "char": "\u{1F37E}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const sake = { "keywords": ["wine", "drink", "drunk", "beverage", "japanese", "alcohol", "booze"], "char": "\u{1F376}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const tea = { "keywords": ["drink", "bowl", "breakfast", "green", "british"], "char": "\u{1F375}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const cup_with_straw = { "keywords": ["drink", "soda"], "char": "\u{1F964}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const coffee = { "keywords": ["beverage", "caffeine", "latte", "espresso"], "char": "\u2615", "fitzpatrick_scale": false, "category": "food_and_drink" };
const baby_bottle = { "keywords": ["food", "container", "milk"], "char": "\u{1F37C}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const salt = { "keywords": ["condiment", "shaker"], "char": "\u{1F9C2}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const spoon = { "keywords": ["cutlery", "kitchen", "tableware"], "char": "\u{1F944}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const fork_and_knife = { "keywords": ["cutlery", "kitchen"], "char": "\u{1F374}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const plate_with_cutlery = { "keywords": ["food", "eat", "meal", "lunch", "dinner", "restaurant"], "char": "\u{1F37D}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const bowl_with_spoon = { "keywords": ["food", "breakfast", "cereal", "oatmeal", "porridge"], "char": "\u{1F963}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const takeout_box = { "keywords": ["food", "leftovers"], "char": "\u{1F961}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const chopsticks = { "keywords": ["food"], "char": "\u{1F962}", "fitzpatrick_scale": false, "category": "food_and_drink" };
const soccer = { "keywords": ["sports", "football"], "char": "\u26BD", "fitzpatrick_scale": false, "category": "activity" };
const basketball = { "keywords": ["sports", "balls", "NBA"], "char": "\u{1F3C0}", "fitzpatrick_scale": false, "category": "activity" };
const football = { "keywords": ["sports", "balls", "NFL"], "char": "\u{1F3C8}", "fitzpatrick_scale": false, "category": "activity" };
const baseball = { "keywords": ["sports", "balls"], "char": "\u26BE", "fitzpatrick_scale": false, "category": "activity" };
const softball = { "keywords": ["sports", "balls"], "char": "\u{1F94E}", "fitzpatrick_scale": false, "category": "activity" };
const tennis = { "keywords": ["sports", "balls", "green"], "char": "\u{1F3BE}", "fitzpatrick_scale": false, "category": "activity" };
const volleyball = { "keywords": ["sports", "balls"], "char": "\u{1F3D0}", "fitzpatrick_scale": false, "category": "activity" };
const rugby_football = { "keywords": ["sports", "team"], "char": "\u{1F3C9}", "fitzpatrick_scale": false, "category": "activity" };
const flying_disc = { "keywords": ["sports", "frisbee", "ultimate"], "char": "\u{1F94F}", "fitzpatrick_scale": false, "category": "activity" };
const golf = { "keywords": ["sports", "business", "flag", "hole", "summer"], "char": "\u26F3", "fitzpatrick_scale": false, "category": "activity" };
const golfing_woman = { "keywords": ["sports", "business", "woman", "female"], "char": "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F", "fitzpatrick_scale": false, "category": "activity" };
const golfing_man = { "keywords": ["sports", "business"], "char": "\u{1F3CC}", "fitzpatrick_scale": true, "category": "activity" };
const ping_pong = { "keywords": ["sports", "pingpong"], "char": "\u{1F3D3}", "fitzpatrick_scale": false, "category": "activity" };
const badminton = { "keywords": ["sports"], "char": "\u{1F3F8}", "fitzpatrick_scale": false, "category": "activity" };
const goal_net = { "keywords": ["sports"], "char": "\u{1F945}", "fitzpatrick_scale": false, "category": "activity" };
const ice_hockey = { "keywords": ["sports"], "char": "\u{1F3D2}", "fitzpatrick_scale": false, "category": "activity" };
const field_hockey = { "keywords": ["sports"], "char": "\u{1F3D1}", "fitzpatrick_scale": false, "category": "activity" };
const lacrosse = { "keywords": ["sports", "ball", "stick"], "char": "\u{1F94D}", "fitzpatrick_scale": false, "category": "activity" };
const cricket = { "keywords": ["sports"], "char": "\u{1F3CF}", "fitzpatrick_scale": false, "category": "activity" };
const ski = { "keywords": ["sports", "winter", "cold", "snow"], "char": "\u{1F3BF}", "fitzpatrick_scale": false, "category": "activity" };
const skier = { "keywords": ["sports", "winter", "snow"], "char": "\u26F7", "fitzpatrick_scale": false, "category": "activity" };
const snowboarder = { "keywords": ["sports", "winter"], "char": "\u{1F3C2}", "fitzpatrick_scale": true, "category": "activity" };
const person_fencing = { "keywords": ["sports", "fencing", "sword"], "char": "\u{1F93A}", "fitzpatrick_scale": false, "category": "activity" };
const women_wrestling = { "keywords": ["sports", "wrestlers"], "char": "\u{1F93C}\u200D\u2640\uFE0F", "fitzpatrick_scale": false, "category": "activity" };
const men_wrestling = { "keywords": ["sports", "wrestlers"], "char": "\u{1F93C}\u200D\u2642\uFE0F", "fitzpatrick_scale": false, "category": "activity" };
const woman_cartwheeling = { "keywords": ["gymnastics"], "char": "\u{1F938}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const man_cartwheeling = { "keywords": ["gymnastics"], "char": "\u{1F938}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const woman_playing_handball = { "keywords": ["sports"], "char": "\u{1F93E}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const man_playing_handball = { "keywords": ["sports"], "char": "\u{1F93E}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const ice_skate = { "keywords": ["sports"], "char": "\u26F8", "fitzpatrick_scale": false, "category": "activity" };
const curling_stone = { "keywords": ["sports"], "char": "\u{1F94C}", "fitzpatrick_scale": false, "category": "activity" };
const skateboard = { "keywords": ["board"], "char": "\u{1F6F9}", "fitzpatrick_scale": false, "category": "activity" };
const sled = { "keywords": ["sleigh", "luge", "toboggan"], "char": "\u{1F6F7}", "fitzpatrick_scale": false, "category": "activity" };
const bow_and_arrow = { "keywords": ["sports"], "char": "\u{1F3F9}", "fitzpatrick_scale": false, "category": "activity" };
const fishing_pole_and_fish = { "keywords": ["food", "hobby", "summer"], "char": "\u{1F3A3}", "fitzpatrick_scale": false, "category": "activity" };
const boxing_glove = { "keywords": ["sports", "fighting"], "char": "\u{1F94A}", "fitzpatrick_scale": false, "category": "activity" };
const martial_arts_uniform = { "keywords": ["judo", "karate", "taekwondo"], "char": "\u{1F94B}", "fitzpatrick_scale": false, "category": "activity" };
const rowing_woman = { "keywords": ["sports", "hobby", "water", "ship", "woman", "female"], "char": "\u{1F6A3}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const rowing_man = { "keywords": ["sports", "hobby", "water", "ship"], "char": "\u{1F6A3}", "fitzpatrick_scale": true, "category": "activity" };
const climbing_woman = { "keywords": ["sports", "hobby", "woman", "female", "rock"], "char": "\u{1F9D7}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const climbing_man = { "keywords": ["sports", "hobby", "man", "male", "rock"], "char": "\u{1F9D7}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const swimming_woman = { "keywords": ["sports", "exercise", "human", "athlete", "water", "summer", "woman", "female"], "char": "\u{1F3CA}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const swimming_man = { "keywords": ["sports", "exercise", "human", "athlete", "water", "summer"], "char": "\u{1F3CA}", "fitzpatrick_scale": true, "category": "activity" };
const woman_playing_water_polo = { "keywords": ["sports", "pool"], "char": "\u{1F93D}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const man_playing_water_polo = { "keywords": ["sports", "pool"], "char": "\u{1F93D}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const woman_in_lotus_position = { "keywords": ["woman", "female", "meditation", "yoga", "serenity", "zen", "mindfulness"], "char": "\u{1F9D8}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const man_in_lotus_position = { "keywords": ["man", "male", "meditation", "yoga", "serenity", "zen", "mindfulness"], "char": "\u{1F9D8}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const surfing_woman = { "keywords": ["sports", "ocean", "sea", "summer", "beach", "woman", "female"], "char": "\u{1F3C4}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const surfing_man = { "keywords": ["sports", "ocean", "sea", "summer", "beach"], "char": "\u{1F3C4}", "fitzpatrick_scale": true, "category": "activity" };
const bath = { "keywords": ["clean", "shower", "bathroom"], "char": "\u{1F6C0}", "fitzpatrick_scale": true, "category": "activity" };
const basketball_woman = { "keywords": ["sports", "human", "woman", "female"], "char": "\u26F9\uFE0F\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const basketball_man = { "keywords": ["sports", "human"], "char": "\u26F9", "fitzpatrick_scale": true, "category": "activity" };
const weight_lifting_woman = { "keywords": ["sports", "training", "exercise", "woman", "female"], "char": "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const weight_lifting_man = { "keywords": ["sports", "training", "exercise"], "char": "\u{1F3CB}", "fitzpatrick_scale": true, "category": "activity" };
const biking_woman = { "keywords": ["sports", "bike", "exercise", "hipster", "woman", "female"], "char": "\u{1F6B4}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const biking_man = { "keywords": ["sports", "bike", "exercise", "hipster"], "char": "\u{1F6B4}", "fitzpatrick_scale": true, "category": "activity" };
const mountain_biking_woman = { "keywords": ["transportation", "sports", "human", "race", "bike", "woman", "female"], "char": "\u{1F6B5}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const mountain_biking_man = { "keywords": ["transportation", "sports", "human", "race", "bike"], "char": "\u{1F6B5}", "fitzpatrick_scale": true, "category": "activity" };
const horse_racing = { "keywords": ["animal", "betting", "competition", "gambling", "luck"], "char": "\u{1F3C7}", "fitzpatrick_scale": true, "category": "activity" };
const business_suit_levitating = { "keywords": ["suit", "business", "levitate", "hover", "jump"], "char": "\u{1F574}", "fitzpatrick_scale": true, "category": "activity" };
const trophy = { "keywords": ["win", "award", "contest", "place", "ftw", "ceremony"], "char": "\u{1F3C6}", "fitzpatrick_scale": false, "category": "activity" };
const running_shirt_with_sash = { "keywords": ["play", "pageant"], "char": "\u{1F3BD}", "fitzpatrick_scale": false, "category": "activity" };
const medal_sports = { "keywords": ["award", "winning"], "char": "\u{1F3C5}", "fitzpatrick_scale": false, "category": "activity" };
const medal_military = { "keywords": ["award", "winning", "army"], "char": "\u{1F396}", "fitzpatrick_scale": false, "category": "activity" };
const reminder_ribbon = { "keywords": ["sports", "cause", "support", "awareness"], "char": "\u{1F397}", "fitzpatrick_scale": false, "category": "activity" };
const rosette = { "keywords": ["flower", "decoration", "military"], "char": "\u{1F3F5}", "fitzpatrick_scale": false, "category": "activity" };
const ticket = { "keywords": ["event", "concert", "pass"], "char": "\u{1F3AB}", "fitzpatrick_scale": false, "category": "activity" };
const tickets = { "keywords": ["sports", "concert", "entrance"], "char": "\u{1F39F}", "fitzpatrick_scale": false, "category": "activity" };
const performing_arts = { "keywords": ["acting", "theater", "drama"], "char": "\u{1F3AD}", "fitzpatrick_scale": false, "category": "activity" };
const art = { "keywords": ["design", "paint", "draw", "colors"], "char": "\u{1F3A8}", "fitzpatrick_scale": false, "category": "activity" };
const circus_tent = { "keywords": ["festival", "carnival", "party"], "char": "\u{1F3AA}", "fitzpatrick_scale": false, "category": "activity" };
const woman_juggling = { "keywords": ["juggle", "balance", "skill", "multitask"], "char": "\u{1F939}\u200D\u2640\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const man_juggling = { "keywords": ["juggle", "balance", "skill", "multitask"], "char": "\u{1F939}\u200D\u2642\uFE0F", "fitzpatrick_scale": true, "category": "activity" };
const microphone = { "keywords": ["sound", "music", "PA", "sing", "talkshow"], "char": "\u{1F3A4}", "fitzpatrick_scale": false, "category": "activity" };
const headphones = { "keywords": ["music", "score", "gadgets"], "char": "\u{1F3A7}", "fitzpatrick_scale": false, "category": "activity" };
const musical_score = { "keywords": ["treble", "clef", "compose"], "char": "\u{1F3BC}", "fitzpatrick_scale": false, "category": "activity" };
const musical_keyboard = { "keywords": ["piano", "instrument", "compose"], "char": "\u{1F3B9}", "fitzpatrick_scale": false, "category": "activity" };
const drum = { "keywords": ["music", "instrument", "drumsticks", "snare"], "char": "\u{1F941}", "fitzpatrick_scale": false, "category": "activity" };
const saxophone = { "keywords": ["music", "instrument", "jazz", "blues"], "char": "\u{1F3B7}", "fitzpatrick_scale": false, "category": "activity" };
const trumpet = { "keywords": ["music", "brass"], "char": "\u{1F3BA}", "fitzpatrick_scale": false, "category": "activity" };
const guitar = { "keywords": ["music", "instrument"], "char": "\u{1F3B8}", "fitzpatrick_scale": false, "category": "activity" };
const violin = { "keywords": ["music", "instrument", "orchestra", "symphony"], "char": "\u{1F3BB}", "fitzpatrick_scale": false, "category": "activity" };
const clapper = { "keywords": ["movie", "film", "record"], "char": "\u{1F3AC}", "fitzpatrick_scale": false, "category": "activity" };
const video_game = { "keywords": ["play", "console", "PS4", "controller"], "char": "\u{1F3AE}", "fitzpatrick_scale": false, "category": "activity" };
const space_invader = { "keywords": ["game", "arcade", "play"], "char": "\u{1F47E}", "fitzpatrick_scale": false, "category": "activity" };
const dart = { "keywords": ["game", "play", "bar", "target", "bullseye"], "char": "\u{1F3AF}", "fitzpatrick_scale": false, "category": "activity" };
const game_die = { "keywords": ["dice", "random", "tabletop", "play", "luck"], "char": "\u{1F3B2}", "fitzpatrick_scale": false, "category": "activity" };
const chess_pawn = { "keywords": ["expendable"], "char": "\u265F", "fitzpatrick_scale": false, "category": "activity" };
const slot_machine = { "keywords": ["bet", "gamble", "vegas", "fruit machine", "luck", "casino"], "char": "\u{1F3B0}", "fitzpatrick_scale": false, "category": "activity" };
const jigsaw = { "keywords": ["interlocking", "puzzle", "piece"], "char": "\u{1F9E9}", "fitzpatrick_scale": false, "category": "activity" };
const bowling = { "keywords": ["sports", "fun", "play"], "char": "\u{1F3B3}", "fitzpatrick_scale": false, "category": "activity" };
const red_car = { "keywords": ["red", "transportation", "vehicle"], "char": "\u{1F697}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const taxi = { "keywords": ["uber", "vehicle", "cars", "transportation"], "char": "\u{1F695}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const blue_car = { "keywords": ["transportation", "vehicle"], "char": "\u{1F699}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bus = { "keywords": ["car", "vehicle", "transportation"], "char": "\u{1F68C}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const trolleybus = { "keywords": ["bart", "transportation", "vehicle"], "char": "\u{1F68E}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const racing_car = { "keywords": ["sports", "race", "fast", "formula", "f1"], "char": "\u{1F3CE}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const police_car = { "keywords": ["vehicle", "cars", "transportation", "law", "legal", "enforcement"], "char": "\u{1F693}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const ambulance = { "keywords": ["health", "911", "hospital"], "char": "\u{1F691}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const fire_engine = { "keywords": ["transportation", "cars", "vehicle"], "char": "\u{1F692}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const minibus = { "keywords": ["vehicle", "car", "transportation"], "char": "\u{1F690}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const truck = { "keywords": ["cars", "transportation"], "char": "\u{1F69A}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const articulated_lorry = { "keywords": ["vehicle", "cars", "transportation", "express"], "char": "\u{1F69B}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const tractor = { "keywords": ["vehicle", "car", "farming", "agriculture"], "char": "\u{1F69C}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const kick_scooter = { "keywords": ["vehicle", "kick", "razor"], "char": "\u{1F6F4}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const motorcycle = { "keywords": ["race", "sports", "fast"], "char": "\u{1F3CD}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bike = { "keywords": ["sports", "bicycle", "exercise", "hipster"], "char": "\u{1F6B2}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const motor_scooter = { "keywords": ["vehicle", "vespa", "sasha"], "char": "\u{1F6F5}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const rotating_light = { "keywords": ["police", "ambulance", "911", "emergency", "alert", "error", "pinged", "law", "legal"], "char": "\u{1F6A8}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const oncoming_police_car = { "keywords": ["vehicle", "law", "legal", "enforcement", "911"], "char": "\u{1F694}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const oncoming_bus = { "keywords": ["vehicle", "transportation"], "char": "\u{1F68D}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const oncoming_automobile = { "keywords": ["car", "vehicle", "transportation"], "char": "\u{1F698}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const oncoming_taxi = { "keywords": ["vehicle", "cars", "uber"], "char": "\u{1F696}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const aerial_tramway = { "keywords": ["transportation", "vehicle", "ski"], "char": "\u{1F6A1}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mountain_cableway = { "keywords": ["transportation", "vehicle", "ski"], "char": "\u{1F6A0}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const suspension_railway = { "keywords": ["vehicle", "transportation"], "char": "\u{1F69F}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const railway_car = { "keywords": ["transportation", "vehicle"], "char": "\u{1F683}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const train = { "keywords": ["transportation", "vehicle", "carriage", "public", "travel"], "char": "\u{1F68B}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const monorail = { "keywords": ["transportation", "vehicle"], "char": "\u{1F69D}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bullettrain_side = { "keywords": ["transportation", "vehicle"], "char": "\u{1F684}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bullettrain_front = { "keywords": ["transportation", "vehicle", "speed", "fast", "public", "travel"], "char": "\u{1F685}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const light_rail = { "keywords": ["transportation", "vehicle"], "char": "\u{1F688}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mountain_railway = { "keywords": ["transportation", "vehicle"], "char": "\u{1F69E}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const steam_locomotive = { "keywords": ["transportation", "vehicle", "train"], "char": "\u{1F682}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const train2 = { "keywords": ["transportation", "vehicle"], "char": "\u{1F686}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const metro = { "keywords": ["transportation", "blue-square", "mrt", "underground", "tube"], "char": "\u{1F687}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const tram = { "keywords": ["transportation", "vehicle"], "char": "\u{1F68A}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const station = { "keywords": ["transportation", "vehicle", "public"], "char": "\u{1F689}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const flying_saucer = { "keywords": ["transportation", "vehicle", "ufo"], "char": "\u{1F6F8}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const helicopter = { "keywords": ["transportation", "vehicle", "fly"], "char": "\u{1F681}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const small_airplane = { "keywords": ["flight", "transportation", "fly", "vehicle"], "char": "\u{1F6E9}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const airplane = { "keywords": ["vehicle", "transportation", "flight", "fly"], "char": "\u2708\uFE0F", "fitzpatrick_scale": false, "category": "travel_and_places" };
const flight_departure = { "keywords": ["airport", "flight", "landing"], "char": "\u{1F6EB}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const flight_arrival = { "keywords": ["airport", "flight", "boarding"], "char": "\u{1F6EC}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const sailboat = { "keywords": ["ship", "summer", "transportation", "water", "sailing"], "char": "\u26F5", "fitzpatrick_scale": false, "category": "travel_and_places" };
const motor_boat = { "keywords": ["ship"], "char": "\u{1F6E5}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const speedboat = { "keywords": ["ship", "transportation", "vehicle", "summer"], "char": "\u{1F6A4}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const ferry = { "keywords": ["boat", "ship", "yacht"], "char": "\u26F4", "fitzpatrick_scale": false, "category": "travel_and_places" };
const passenger_ship = { "keywords": ["yacht", "cruise", "ferry"], "char": "\u{1F6F3}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const rocket = { "keywords": ["launch", "ship", "staffmode", "NASA", "outer space", "outer_space", "fly"], "char": "\u{1F680}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const artificial_satellite = { "keywords": ["communication", "gps", "orbit", "spaceflight", "NASA", "ISS"], "char": "\u{1F6F0}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const seat = { "keywords": ["sit", "airplane", "transport", "bus", "flight", "fly"], "char": "\u{1F4BA}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const canoe = { "keywords": ["boat", "paddle", "water", "ship"], "char": "\u{1F6F6}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const anchor = { "keywords": ["ship", "ferry", "sea", "boat"], "char": "\u2693", "fitzpatrick_scale": false, "category": "travel_and_places" };
const construction = { "keywords": ["wip", "progress", "caution", "warning"], "char": "\u{1F6A7}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const fuelpump = { "keywords": ["gas station", "petroleum"], "char": "\u26FD", "fitzpatrick_scale": false, "category": "travel_and_places" };
const busstop = { "keywords": ["transportation", "wait"], "char": "\u{1F68F}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const vertical_traffic_light = { "keywords": ["transportation", "driving"], "char": "\u{1F6A6}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const traffic_light = { "keywords": ["transportation", "signal"], "char": "\u{1F6A5}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const checkered_flag = { "keywords": ["contest", "finishline", "race", "gokart"], "char": "\u{1F3C1}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const ship = { "keywords": ["transportation", "titanic", "deploy"], "char": "\u{1F6A2}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const ferris_wheel = { "keywords": ["photo", "carnival", "londoneye"], "char": "\u{1F3A1}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const roller_coaster = { "keywords": ["carnival", "playground", "photo", "fun"], "char": "\u{1F3A2}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const carousel_horse = { "keywords": ["photo", "carnival"], "char": "\u{1F3A0}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const building_construction = { "keywords": ["wip", "working", "progress"], "char": "\u{1F3D7}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const foggy = { "keywords": ["photo", "mountain"], "char": "\u{1F301}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const tokyo_tower = { "keywords": ["photo", "japanese"], "char": "\u{1F5FC}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const factory = { "keywords": ["building", "industry", "pollution", "smoke"], "char": "\u{1F3ED}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const fountain = { "keywords": ["photo", "summer", "water", "fresh"], "char": "\u26F2", "fitzpatrick_scale": false, "category": "travel_and_places" };
const rice_scene = { "keywords": ["photo", "japan", "asia", "tsukimi"], "char": "\u{1F391}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mountain = { "keywords": ["photo", "nature", "environment"], "char": "\u26F0", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mountain_snow = { "keywords": ["photo", "nature", "environment", "winter", "cold"], "char": "\u{1F3D4}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mount_fuji = { "keywords": ["photo", "mountain", "nature", "japanese"], "char": "\u{1F5FB}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const volcano = { "keywords": ["photo", "nature", "disaster"], "char": "\u{1F30B}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const japan = { "keywords": ["nation", "country", "japanese", "asia"], "char": "\u{1F5FE}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const camping = { "keywords": ["photo", "outdoors", "tent"], "char": "\u{1F3D5}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const tent = { "keywords": ["photo", "camping", "outdoors"], "char": "\u26FA", "fitzpatrick_scale": false, "category": "travel_and_places" };
const national_park = { "keywords": ["photo", "environment", "nature"], "char": "\u{1F3DE}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const motorway = { "keywords": ["road", "cupertino", "interstate", "highway"], "char": "\u{1F6E3}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const railway_track = { "keywords": ["train", "transportation"], "char": "\u{1F6E4}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const sunrise = { "keywords": ["morning", "view", "vacation", "photo"], "char": "\u{1F305}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const sunrise_over_mountains = { "keywords": ["view", "vacation", "photo"], "char": "\u{1F304}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const desert = { "keywords": ["photo", "warm", "saharah"], "char": "\u{1F3DC}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const beach_umbrella = { "keywords": ["weather", "summer", "sunny", "sand", "mojito"], "char": "\u{1F3D6}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const desert_island = { "keywords": ["photo", "tropical", "mojito"], "char": "\u{1F3DD}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const city_sunrise = { "keywords": ["photo", "good morning", "dawn"], "char": "\u{1F307}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const city_sunset = { "keywords": ["photo", "evening", "sky", "buildings"], "char": "\u{1F306}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const cityscape = { "keywords": ["photo", "night life", "urban"], "char": "\u{1F3D9}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const night_with_stars = { "keywords": ["evening", "city", "downtown"], "char": "\u{1F303}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bridge_at_night = { "keywords": ["photo", "sanfrancisco"], "char": "\u{1F309}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const milky_way = { "keywords": ["photo", "space", "stars"], "char": "\u{1F30C}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const stars = { "keywords": ["night", "photo"], "char": "\u{1F320}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const sparkler = { "keywords": ["stars", "night", "shine"], "char": "\u{1F387}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const fireworks = { "keywords": ["photo", "festival", "carnival", "congratulations"], "char": "\u{1F386}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const rainbow = { "keywords": ["nature", "happy", "unicorn_face", "photo", "sky", "spring"], "char": "\u{1F308}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const houses = { "keywords": ["buildings", "photo"], "char": "\u{1F3D8}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const european_castle = { "keywords": ["building", "royalty", "history"], "char": "\u{1F3F0}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const japanese_castle = { "keywords": ["photo", "building"], "char": "\u{1F3EF}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const stadium = { "keywords": ["photo", "place", "sports", "concert", "venue"], "char": "\u{1F3DF}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const statue_of_liberty = { "keywords": ["american", "newyork"], "char": "\u{1F5FD}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const house = { "keywords": ["building", "home"], "char": "\u{1F3E0}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const house_with_garden = { "keywords": ["home", "plant", "nature"], "char": "\u{1F3E1}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const derelict_house = { "keywords": ["abandon", "evict", "broken", "building"], "char": "\u{1F3DA}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const office = { "keywords": ["building", "bureau", "work"], "char": "\u{1F3E2}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const department_store = { "keywords": ["building", "shopping", "mall"], "char": "\u{1F3EC}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const post_office = { "keywords": ["building", "envelope", "communication"], "char": "\u{1F3E3}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const european_post_office = { "keywords": ["building", "email"], "char": "\u{1F3E4}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const hospital = { "keywords": ["building", "health", "surgery", "doctor"], "char": "\u{1F3E5}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const bank = { "keywords": ["building", "money", "sales", "cash", "business", "enterprise"], "char": "\u{1F3E6}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const hotel = { "keywords": ["building", "accomodation", "checkin"], "char": "\u{1F3E8}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const convenience_store = { "keywords": ["building", "shopping", "groceries"], "char": "\u{1F3EA}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const school = { "keywords": ["building", "student", "education", "learn", "teach"], "char": "\u{1F3EB}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const love_hotel = { "keywords": ["like", "affection", "dating"], "char": "\u{1F3E9}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const wedding = { "keywords": ["love", "like", "affection", "couple", "marriage", "bride", "groom"], "char": "\u{1F492}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const classical_building = { "keywords": ["art", "culture", "history"], "char": "\u{1F3DB}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const church = { "keywords": ["building", "religion", "christ"], "char": "\u26EA", "fitzpatrick_scale": false, "category": "travel_and_places" };
const mosque = { "keywords": ["islam", "worship", "minaret"], "char": "\u{1F54C}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const synagogue = { "keywords": ["judaism", "worship", "temple", "jewish"], "char": "\u{1F54D}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const kaaba = { "keywords": ["mecca", "mosque", "islam"], "char": "\u{1F54B}", "fitzpatrick_scale": false, "category": "travel_and_places" };
const shinto_shrine = { "keywords": ["temple", "japan", "kyoto"], "char": "\u26E9", "fitzpatrick_scale": false, "category": "travel_and_places" };
const watch = { "keywords": ["time", "accessories"], "char": "\u231A", "fitzpatrick_scale": false, "category": "objects" };
const iphone = { "keywords": ["technology", "apple", "gadgets", "dial"], "char": "\u{1F4F1}", "fitzpatrick_scale": false, "category": "objects" };
const calling = { "keywords": ["iphone", "incoming"], "char": "\u{1F4F2}", "fitzpatrick_scale": false, "category": "objects" };
const computer = { "keywords": ["technology", "laptop", "screen", "display", "monitor"], "char": "\u{1F4BB}", "fitzpatrick_scale": false, "category": "objects" };
const keyboard = { "keywords": ["technology", "computer", "type", "input", "text"], "char": "\u2328", "fitzpatrick_scale": false, "category": "objects" };
const desktop_computer = { "keywords": ["technology", "computing", "screen"], "char": "\u{1F5A5}", "fitzpatrick_scale": false, "category": "objects" };
const printer = { "keywords": ["paper", "ink"], "char": "\u{1F5A8}", "fitzpatrick_scale": false, "category": "objects" };
const computer_mouse = { "keywords": ["click"], "char": "\u{1F5B1}", "fitzpatrick_scale": false, "category": "objects" };
const trackball = { "keywords": ["technology", "trackpad"], "char": "\u{1F5B2}", "fitzpatrick_scale": false, "category": "objects" };
const joystick = { "keywords": ["game", "play"], "char": "\u{1F579}", "fitzpatrick_scale": false, "category": "objects" };
const clamp = { "keywords": ["tool"], "char": "\u{1F5DC}", "fitzpatrick_scale": false, "category": "objects" };
const minidisc = { "keywords": ["technology", "record", "data", "disk", "90s"], "char": "\u{1F4BD}", "fitzpatrick_scale": false, "category": "objects" };
const floppy_disk = { "keywords": ["oldschool", "technology", "save", "90s", "80s"], "char": "\u{1F4BE}", "fitzpatrick_scale": false, "category": "objects" };
const cd = { "keywords": ["technology", "dvd", "disk", "disc", "90s"], "char": "\u{1F4BF}", "fitzpatrick_scale": false, "category": "objects" };
const dvd = { "keywords": ["cd", "disk", "disc"], "char": "\u{1F4C0}", "fitzpatrick_scale": false, "category": "objects" };
const vhs = { "keywords": ["record", "video", "oldschool", "90s", "80s"], "char": "\u{1F4FC}", "fitzpatrick_scale": false, "category": "objects" };
const camera = { "keywords": ["gadgets", "photography"], "char": "\u{1F4F7}", "fitzpatrick_scale": false, "category": "objects" };
const camera_flash = { "keywords": ["photography", "gadgets"], "char": "\u{1F4F8}", "fitzpatrick_scale": false, "category": "objects" };
const video_camera = { "keywords": ["film", "record"], "char": "\u{1F4F9}", "fitzpatrick_scale": false, "category": "objects" };
const movie_camera = { "keywords": ["film", "record"], "char": "\u{1F3A5}", "fitzpatrick_scale": false, "category": "objects" };
const film_projector = { "keywords": ["video", "tape", "record", "movie"], "char": "\u{1F4FD}", "fitzpatrick_scale": false, "category": "objects" };
const film_strip = { "keywords": ["movie"], "char": "\u{1F39E}", "fitzpatrick_scale": false, "category": "objects" };
const telephone_receiver = { "keywords": ["technology", "communication", "dial"], "char": "\u{1F4DE}", "fitzpatrick_scale": false, "category": "objects" };
const phone = { "keywords": ["technology", "communication", "dial", "telephone"], "char": "\u260E\uFE0F", "fitzpatrick_scale": false, "category": "objects" };
const pager = { "keywords": ["bbcall", "oldschool", "90s"], "char": "\u{1F4DF}", "fitzpatrick_scale": false, "category": "objects" };
const fax = { "keywords": ["communication", "technology"], "char": "\u{1F4E0}", "fitzpatrick_scale": false, "category": "objects" };
const tv = { "keywords": ["technology", "program", "oldschool", "show", "television"], "char": "\u{1F4FA}", "fitzpatrick_scale": false, "category": "objects" };
const radio = { "keywords": ["communication", "music", "podcast", "program"], "char": "\u{1F4FB}", "fitzpatrick_scale": false, "category": "objects" };
const studio_microphone = { "keywords": ["sing", "recording", "artist", "talkshow"], "char": "\u{1F399}", "fitzpatrick_scale": false, "category": "objects" };
const level_slider = { "keywords": ["scale"], "char": "\u{1F39A}", "fitzpatrick_scale": false, "category": "objects" };
const control_knobs = { "keywords": ["dial"], "char": "\u{1F39B}", "fitzpatrick_scale": false, "category": "objects" };
const compass = { "keywords": ["magnetic", "navigation", "orienteering"], "char": "\u{1F9ED}", "fitzpatrick_scale": false, "category": "objects" };
const stopwatch = { "keywords": ["time", "deadline"], "char": "\u23F1", "fitzpatrick_scale": false, "category": "objects" };
const timer_clock = { "keywords": ["alarm"], "char": "\u23F2", "fitzpatrick_scale": false, "category": "objects" };
const alarm_clock = { "keywords": ["time", "wake"], "char": "\u23F0", "fitzpatrick_scale": false, "category": "objects" };
const mantelpiece_clock = { "keywords": ["time"], "char": "\u{1F570}", "fitzpatrick_scale": false, "category": "objects" };
const hourglass_flowing_sand = { "keywords": ["oldschool", "time", "countdown"], "char": "\u23F3", "fitzpatrick_scale": false, "category": "objects" };
const hourglass = { "keywords": ["time", "clock", "oldschool", "limit", "exam", "quiz", "test"], "char": "\u231B", "fitzpatrick_scale": false, "category": "objects" };
const satellite = { "keywords": ["communication", "future", "radio", "space"], "char": "\u{1F4E1}", "fitzpatrick_scale": false, "category": "objects" };
const battery = { "keywords": ["power", "energy", "sustain"], "char": "\u{1F50B}", "fitzpatrick_scale": false, "category": "objects" };
const electric_plug = { "keywords": ["charger", "power"], "char": "\u{1F50C}", "fitzpatrick_scale": false, "category": "objects" };
const bulb = { "keywords": ["light", "electricity", "idea"], "char": "\u{1F4A1}", "fitzpatrick_scale": false, "category": "objects" };
const flashlight = { "keywords": ["dark", "camping", "sight", "night"], "char": "\u{1F526}", "fitzpatrick_scale": false, "category": "objects" };
const candle = { "keywords": ["fire", "wax"], "char": "\u{1F56F}", "fitzpatrick_scale": false, "category": "objects" };
const fire_extinguisher = { "keywords": ["quench"], "char": "\u{1F9EF}", "fitzpatrick_scale": false, "category": "objects" };
const wastebasket = { "keywords": ["bin", "trash", "rubbish", "garbage", "toss"], "char": "\u{1F5D1}", "fitzpatrick_scale": false, "category": "objects" };
const oil_drum = { "keywords": ["barrell"], "char": "\u{1F6E2}", "fitzpatrick_scale": false, "category": "objects" };
const money_with_wings = { "keywords": ["dollar", "bills", "payment", "sale"], "char": "\u{1F4B8}", "fitzpatrick_scale": false, "category": "objects" };
const dollar = { "keywords": ["money", "sales", "bill", "currency"], "char": "\u{1F4B5}", "fitzpatrick_scale": false, "category": "objects" };
const yen = { "keywords": ["money", "sales", "japanese", "dollar", "currency"], "char": "\u{1F4B4}", "fitzpatrick_scale": false, "category": "objects" };
const euro = { "keywords": ["money", "sales", "dollar", "currency"], "char": "\u{1F4B6}", "fitzpatrick_scale": false, "category": "objects" };
const pound = { "keywords": ["british", "sterling", "money", "sales", "bills", "uk", "england", "currency"], "char": "\u{1F4B7}", "fitzpatrick_scale": false, "category": "objects" };
const moneybag = { "keywords": ["dollar", "payment", "coins", "sale"], "char": "\u{1F4B0}", "fitzpatrick_scale": false, "category": "objects" };
const credit_card = { "keywords": ["money", "sales", "dollar", "bill", "payment", "shopping"], "char": "\u{1F4B3}", "fitzpatrick_scale": false, "category": "objects" };
const gem = { "keywords": ["blue", "ruby", "diamond", "jewelry"], "char": "\u{1F48E}", "fitzpatrick_scale": false, "category": "objects" };
const balance_scale = { "keywords": ["law", "fairness", "weight"], "char": "\u2696", "fitzpatrick_scale": false, "category": "objects" };
const toolbox = { "keywords": ["tools", "diy", "fix", "maintainer", "mechanic"], "char": "\u{1F9F0}", "fitzpatrick_scale": false, "category": "objects" };
const wrench = { "keywords": ["tools", "diy", "ikea", "fix", "maintainer"], "char": "\u{1F527}", "fitzpatrick_scale": false, "category": "objects" };
const hammer = { "keywords": ["tools", "build", "create"], "char": "\u{1F528}", "fitzpatrick_scale": false, "category": "objects" };
const hammer_and_pick = { "keywords": ["tools", "build", "create"], "char": "\u2692", "fitzpatrick_scale": false, "category": "objects" };
const hammer_and_wrench = { "keywords": ["tools", "build", "create"], "char": "\u{1F6E0}", "fitzpatrick_scale": false, "category": "objects" };
const pick = { "keywords": ["tools", "dig"], "char": "\u26CF", "fitzpatrick_scale": false, "category": "objects" };
const nut_and_bolt = { "keywords": ["handy", "tools", "fix"], "char": "\u{1F529}", "fitzpatrick_scale": false, "category": "objects" };
const gear = { "keywords": ["cog"], "char": "\u2699", "fitzpatrick_scale": false, "category": "objects" };
const brick = { "keywords": ["bricks"], "char": "\u{1F9F1}", "fitzpatrick_scale": false, "category": "objects" };
const chains = { "keywords": ["lock", "arrest"], "char": "\u26D3", "fitzpatrick_scale": false, "category": "objects" };
const magnet = { "keywords": ["attraction", "magnetic"], "char": "\u{1F9F2}", "fitzpatrick_scale": false, "category": "objects" };
const gun = { "keywords": ["violence", "weapon", "pistol", "revolver"], "char": "\u{1F52B}", "fitzpatrick_scale": false, "category": "objects" };
const bomb = { "keywords": ["boom", "explode", "explosion", "terrorism"], "char": "\u{1F4A3}", "fitzpatrick_scale": false, "category": "objects" };
const firecracker = { "keywords": ["dynamite", "boom", "explode", "explosion", "explosive"], "char": "\u{1F9E8}", "fitzpatrick_scale": false, "category": "objects" };
const hocho = { "keywords": ["knife", "blade", "cutlery", "kitchen", "weapon"], "char": "\u{1F52A}", "fitzpatrick_scale": false, "category": "objects" };
const dagger = { "keywords": ["weapon"], "char": "\u{1F5E1}", "fitzpatrick_scale": false, "category": "objects" };
const crossed_swords = { "keywords": ["weapon"], "char": "\u2694", "fitzpatrick_scale": false, "category": "objects" };
const shield = { "keywords": ["protection", "security"], "char": "\u{1F6E1}", "fitzpatrick_scale": false, "category": "objects" };
const smoking = { "keywords": ["kills", "tobacco", "cigarette", "joint", "smoke"], "char": "\u{1F6AC}", "fitzpatrick_scale": false, "category": "objects" };
const skull_and_crossbones = { "keywords": ["poison", "danger", "deadly", "scary", "death", "pirate", "evil"], "char": "\u2620", "fitzpatrick_scale": false, "category": "objects" };
const coffin = { "keywords": ["vampire", "dead", "die", "death", "rip", "graveyard", "cemetery", "casket", "funeral", "box"], "char": "\u26B0", "fitzpatrick_scale": false, "category": "objects" };
const funeral_urn = { "keywords": ["dead", "die", "death", "rip", "ashes"], "char": "\u26B1", "fitzpatrick_scale": false, "category": "objects" };
const amphora = { "keywords": ["vase", "jar"], "char": "\u{1F3FA}", "fitzpatrick_scale": false, "category": "objects" };
const crystal_ball = { "keywords": ["disco", "party", "magic", "circus", "fortune_teller"], "char": "\u{1F52E}", "fitzpatrick_scale": false, "category": "objects" };
const prayer_beads = { "keywords": ["dhikr", "religious"], "char": "\u{1F4FF}", "fitzpatrick_scale": false, "category": "objects" };
const nazar_amulet = { "keywords": ["bead", "charm"], "char": "\u{1F9FF}", "fitzpatrick_scale": false, "category": "objects" };
const barber = { "keywords": ["hair", "salon", "style"], "char": "\u{1F488}", "fitzpatrick_scale": false, "category": "objects" };
const alembic = { "keywords": ["distilling", "science", "experiment", "chemistry"], "char": "\u2697", "fitzpatrick_scale": false, "category": "objects" };
const telescope = { "keywords": ["stars", "space", "zoom", "science", "astronomy"], "char": "\u{1F52D}", "fitzpatrick_scale": false, "category": "objects" };
const microscope = { "keywords": ["laboratory", "experiment", "zoomin", "science", "study"], "char": "\u{1F52C}", "fitzpatrick_scale": false, "category": "objects" };
const hole = { "keywords": ["embarrassing"], "char": "\u{1F573}", "fitzpatrick_scale": false, "category": "objects" };
const pill = { "keywords": ["health", "medicine", "doctor", "pharmacy", "drug"], "char": "\u{1F48A}", "fitzpatrick_scale": false, "category": "objects" };
const syringe = { "keywords": ["health", "hospital", "drugs", "blood", "medicine", "needle", "doctor", "nurse"], "char": "\u{1F489}", "fitzpatrick_scale": false, "category": "objects" };
const dna = { "keywords": ["biologist", "genetics", "life"], "char": "\u{1F9EC}", "fitzpatrick_scale": false, "category": "objects" };
const microbe = { "keywords": ["amoeba", "bacteria", "germs"], "char": "\u{1F9A0}", "fitzpatrick_scale": false, "category": "objects" };
const petri_dish = { "keywords": ["bacteria", "biology", "culture", "lab"], "char": "\u{1F9EB}", "fitzpatrick_scale": false, "category": "objects" };
const test_tube = { "keywords": ["chemistry", "experiment", "lab", "science"], "char": "\u{1F9EA}", "fitzpatrick_scale": false, "category": "objects" };
const thermometer = { "keywords": ["weather", "temperature", "hot", "cold"], "char": "\u{1F321}", "fitzpatrick_scale": false, "category": "objects" };
const broom = { "keywords": ["cleaning", "sweeping", "witch"], "char": "\u{1F9F9}", "fitzpatrick_scale": false, "category": "objects" };
const basket = { "keywords": ["laundry"], "char": "\u{1F9FA}", "fitzpatrick_scale": false, "category": "objects" };
const toilet_paper = { "keywords": ["roll"], "char": "\u{1F9FB}", "fitzpatrick_scale": false, "category": "objects" };
const label = { "keywords": ["sale", "tag"], "char": "\u{1F3F7}", "fitzpatrick_scale": false, "category": "objects" };
const bookmark = { "keywords": ["favorite", "label", "save"], "char": "\u{1F516}", "fitzpatrick_scale": false, "category": "objects" };
const toilet = { "keywords": ["restroom", "wc", "washroom", "bathroom", "potty"], "char": "\u{1F6BD}", "fitzpatrick_scale": false, "category": "objects" };
const shower = { "keywords": ["clean", "water", "bathroom"], "char": "\u{1F6BF}", "fitzpatrick_scale": false, "category": "objects" };
const bathtub = { "keywords": ["clean", "shower", "bathroom"], "char": "\u{1F6C1}", "fitzpatrick_scale": false, "category": "objects" };
const soap = { "keywords": ["bar", "bathing", "cleaning", "lather"], "char": "\u{1F9FC}", "fitzpatrick_scale": false, "category": "objects" };
const sponge = { "keywords": ["absorbing", "cleaning", "porous"], "char": "\u{1F9FD}", "fitzpatrick_scale": false, "category": "objects" };
const lotion_bottle = { "keywords": ["moisturizer", "sunscreen"], "char": "\u{1F9F4}", "fitzpatrick_scale": false, "category": "objects" };
const key = { "keywords": ["lock", "door", "password"], "char": "\u{1F511}", "fitzpatrick_scale": false, "category": "objects" };
const old_key = { "keywords": ["lock", "door", "password"], "char": "\u{1F5DD}", "fitzpatrick_scale": false, "category": "objects" };
const couch_and_lamp = { "keywords": ["read", "chill"], "char": "\u{1F6CB}", "fitzpatrick_scale": false, "category": "objects" };
const sleeping_bed = { "keywords": ["bed", "rest"], "char": "\u{1F6CC}", "fitzpatrick_scale": true, "category": "objects" };
const bed = { "keywords": ["sleep", "rest"], "char": "\u{1F6CF}", "fitzpatrick_scale": false, "category": "objects" };
const door = { "keywords": ["house", "entry", "exit"], "char": "\u{1F6AA}", "fitzpatrick_scale": false, "category": "objects" };
const bellhop_bell = { "keywords": ["service"], "char": "\u{1F6CE}", "fitzpatrick_scale": false, "category": "objects" };
const teddy_bear = { "keywords": ["plush", "stuffed"], "char": "\u{1F9F8}", "fitzpatrick_scale": false, "category": "objects" };
const framed_picture = { "keywords": ["photography"], "char": "\u{1F5BC}", "fitzpatrick_scale": false, "category": "objects" };
const world_map = { "keywords": ["location", "direction"], "char": "\u{1F5FA}", "fitzpatrick_scale": false, "category": "objects" };
const parasol_on_ground = { "keywords": ["weather", "summer"], "char": "\u26F1", "fitzpatrick_scale": false, "category": "objects" };
const moyai = { "keywords": ["rock", "easter island", "moai"], "char": "\u{1F5FF}", "fitzpatrick_scale": false, "category": "objects" };
const shopping = { "keywords": ["mall", "buy", "purchase"], "char": "\u{1F6CD}", "fitzpatrick_scale": false, "category": "objects" };
const shopping_cart = { "keywords": ["trolley"], "char": "\u{1F6D2}", "fitzpatrick_scale": false, "category": "objects" };
const balloon = { "keywords": ["party", "celebration", "birthday", "circus"], "char": "\u{1F388}", "fitzpatrick_scale": false, "category": "objects" };
const flags = { "keywords": ["fish", "japanese", "koinobori", "carp", "banner"], "char": "\u{1F38F}", "fitzpatrick_scale": false, "category": "objects" };
const ribbon = { "keywords": ["decoration", "pink", "girl", "bowtie"], "char": "\u{1F380}", "fitzpatrick_scale": false, "category": "objects" };
const gift = { "keywords": ["present", "birthday", "christmas", "xmas"], "char": "\u{1F381}", "fitzpatrick_scale": false, "category": "objects" };
const confetti_ball = { "keywords": ["festival", "party", "birthday", "circus"], "char": "\u{1F38A}", "fitzpatrick_scale": false, "category": "objects" };
const tada = { "keywords": ["party", "congratulations", "birthday", "magic", "circus", "celebration"], "char": "\u{1F389}", "fitzpatrick_scale": false, "category": "objects" };
const dolls = { "keywords": ["japanese", "toy", "kimono"], "char": "\u{1F38E}", "fitzpatrick_scale": false, "category": "objects" };
const wind_chime = { "keywords": ["nature", "ding", "spring", "bell"], "char": "\u{1F390}", "fitzpatrick_scale": false, "category": "objects" };
const crossed_flags = { "keywords": ["japanese", "nation", "country", "border"], "char": "\u{1F38C}", "fitzpatrick_scale": false, "category": "objects" };
const izakaya_lantern = { "keywords": ["light", "paper", "halloween", "spooky"], "char": "\u{1F3EE}", "fitzpatrick_scale": false, "category": "objects" };
const red_envelope = { "keywords": ["gift"], "char": "\u{1F9E7}", "fitzpatrick_scale": false, "category": "objects" };
const email = { "keywords": ["letter", "postal", "inbox", "communication"], "char": "\u2709\uFE0F", "fitzpatrick_scale": false, "category": "objects" };
const envelope_with_arrow = { "keywords": ["email", "communication"], "char": "\u{1F4E9}", "fitzpatrick_scale": false, "category": "objects" };
const incoming_envelope = { "keywords": ["email", "inbox"], "char": "\u{1F4E8}", "fitzpatrick_scale": false, "category": "objects" };
const love_letter = { "keywords": ["email", "like", "affection", "envelope", "valentines"], "char": "\u{1F48C}", "fitzpatrick_scale": false, "category": "objects" };
const postbox = { "keywords": ["email", "letter", "envelope"], "char": "\u{1F4EE}", "fitzpatrick_scale": false, "category": "objects" };
const mailbox_closed = { "keywords": ["email", "communication", "inbox"], "char": "\u{1F4EA}", "fitzpatrick_scale": false, "category": "objects" };
const mailbox = { "keywords": ["email", "inbox", "communication"], "char": "\u{1F4EB}", "fitzpatrick_scale": false, "category": "objects" };
const mailbox_with_mail = { "keywords": ["email", "inbox", "communication"], "char": "\u{1F4EC}", "fitzpatrick_scale": false, "category": "objects" };
const mailbox_with_no_mail = { "keywords": ["email", "inbox"], "char": "\u{1F4ED}", "fitzpatrick_scale": false, "category": "objects" };
const postal_horn = { "keywords": ["instrument", "music"], "char": "\u{1F4EF}", "fitzpatrick_scale": false, "category": "objects" };
const inbox_tray = { "keywords": ["email", "documents"], "char": "\u{1F4E5}", "fitzpatrick_scale": false, "category": "objects" };
const outbox_tray = { "keywords": ["inbox", "email"], "char": "\u{1F4E4}", "fitzpatrick_scale": false, "category": "objects" };
const scroll = { "keywords": ["documents", "ancient", "history", "paper"], "char": "\u{1F4DC}", "fitzpatrick_scale": false, "category": "objects" };
const page_with_curl = { "keywords": ["documents", "office", "paper"], "char": "\u{1F4C3}", "fitzpatrick_scale": false, "category": "objects" };
const bookmark_tabs = { "keywords": ["favorite", "save", "order", "tidy"], "char": "\u{1F4D1}", "fitzpatrick_scale": false, "category": "objects" };
const receipt = { "keywords": ["accounting", "expenses"], "char": "\u{1F9FE}", "fitzpatrick_scale": false, "category": "objects" };
const bar_chart = { "keywords": ["graph", "presentation", "stats"], "char": "\u{1F4CA}", "fitzpatrick_scale": false, "category": "objects" };
const chart_with_upwards_trend = { "keywords": ["graph", "presentation", "stats", "recovery", "business", "economics", "money", "sales", "good", "success"], "char": "\u{1F4C8}", "fitzpatrick_scale": false, "category": "objects" };
const chart_with_downwards_trend = { "keywords": ["graph", "presentation", "stats", "recession", "business", "economics", "money", "sales", "bad", "failure"], "char": "\u{1F4C9}", "fitzpatrick_scale": false, "category": "objects" };
const page_facing_up = { "keywords": ["documents", "office", "paper", "information"], "char": "\u{1F4C4}", "fitzpatrick_scale": false, "category": "objects" };
const date = { "keywords": ["calendar", "schedule"], "char": "\u{1F4C5}", "fitzpatrick_scale": false, "category": "objects" };
const calendar = { "keywords": ["schedule", "date", "planning"], "char": "\u{1F4C6}", "fitzpatrick_scale": false, "category": "objects" };
const spiral_calendar = { "keywords": ["date", "schedule", "planning"], "char": "\u{1F5D3}", "fitzpatrick_scale": false, "category": "objects" };
const card_index = { "keywords": ["business", "stationery"], "char": "\u{1F4C7}", "fitzpatrick_scale": false, "category": "objects" };
const card_file_box = { "keywords": ["business", "stationery"], "char": "\u{1F5C3}", "fitzpatrick_scale": false, "category": "objects" };
const ballot_box = { "keywords": ["election", "vote"], "char": "\u{1F5F3}", "fitzpatrick_scale": false, "category": "objects" };
const file_cabinet = { "keywords": ["filing", "organizing"], "char": "\u{1F5C4}", "fitzpatrick_scale": false, "category": "objects" };
const clipboard = { "keywords": ["stationery", "documents"], "char": "\u{1F4CB}", "fitzpatrick_scale": false, "category": "objects" };
const spiral_notepad = { "keywords": ["memo", "stationery"], "char": "\u{1F5D2}", "fitzpatrick_scale": false, "category": "objects" };
const file_folder = { "keywords": ["documents", "business", "office"], "char": "\u{1F4C1}", "fitzpatrick_scale": false, "category": "objects" };
const open_file_folder = { "keywords": ["documents", "load"], "char": "\u{1F4C2}", "fitzpatrick_scale": false, "category": "objects" };
const card_index_dividers = { "keywords": ["organizing", "business", "stationery"], "char": "\u{1F5C2}", "fitzpatrick_scale": false, "category": "objects" };
const newspaper_roll = { "keywords": ["press", "headline"], "char": "\u{1F5DE}", "fitzpatrick_scale": false, "category": "objects" };
const newspaper = { "keywords": ["press", "headline"], "char": "\u{1F4F0}", "fitzpatrick_scale": false, "category": "objects" };
const notebook = { "keywords": ["stationery", "record", "notes", "paper", "study"], "char": "\u{1F4D3}", "fitzpatrick_scale": false, "category": "objects" };
const closed_book = { "keywords": ["read", "library", "knowledge", "textbook", "learn"], "char": "\u{1F4D5}", "fitzpatrick_scale": false, "category": "objects" };
const green_book = { "keywords": ["read", "library", "knowledge", "study"], "char": "\u{1F4D7}", "fitzpatrick_scale": false, "category": "objects" };
const blue_book = { "keywords": ["read", "library", "knowledge", "learn", "study"], "char": "\u{1F4D8}", "fitzpatrick_scale": false, "category": "objects" };
const orange_book = { "keywords": ["read", "library", "knowledge", "textbook", "study"], "char": "\u{1F4D9}", "fitzpatrick_scale": false, "category": "objects" };
const notebook_with_decorative_cover = { "keywords": ["classroom", "notes", "record", "paper", "study"], "char": "\u{1F4D4}", "fitzpatrick_scale": false, "category": "objects" };
const ledger = { "keywords": ["notes", "paper"], "char": "\u{1F4D2}", "fitzpatrick_scale": false, "category": "objects" };
const books = { "keywords": ["literature", "library", "study"], "char": "\u{1F4DA}", "fitzpatrick_scale": false, "category": "objects" };
const open_book = { "keywords": ["book", "read", "library", "knowledge", "literature", "learn", "study"], "char": "\u{1F4D6}", "fitzpatrick_scale": false, "category": "objects" };
const safety_pin = { "keywords": ["diaper"], "char": "\u{1F9F7}", "fitzpatrick_scale": false, "category": "objects" };
const link = { "keywords": ["rings", "url"], "char": "\u{1F517}", "fitzpatrick_scale": false, "category": "objects" };
const paperclip = { "keywords": ["documents", "stationery"], "char": "\u{1F4CE}", "fitzpatrick_scale": false, "category": "objects" };
const paperclips = { "keywords": ["documents", "stationery"], "char": "\u{1F587}", "fitzpatrick_scale": false, "category": "objects" };
const scissors = { "keywords": ["stationery", "cut"], "char": "\u2702\uFE0F", "fitzpatrick_scale": false, "category": "objects" };
const triangular_ruler = { "keywords": ["stationery", "math", "architect", "sketch"], "char": "\u{1F4D0}", "fitzpatrick_scale": false, "category": "objects" };
const straight_ruler = { "keywords": ["stationery", "calculate", "length", "math", "school", "drawing", "architect", "sketch"], "char": "\u{1F4CF}", "fitzpatrick_scale": false, "category": "objects" };
const abacus = { "keywords": ["calculation"], "char": "\u{1F9EE}", "fitzpatrick_scale": false, "category": "objects" };
const pushpin = { "keywords": ["stationery", "mark", "here"], "char": "\u{1F4CC}", "fitzpatrick_scale": false, "category": "objects" };
const round_pushpin = { "keywords": ["stationery", "location", "map", "here"], "char": "\u{1F4CD}", "fitzpatrick_scale": false, "category": "objects" };
const triangular_flag_on_post = { "keywords": ["mark", "milestone", "place"], "char": "\u{1F6A9}", "fitzpatrick_scale": false, "category": "objects" };
const white_flag = { "keywords": ["losing", "loser", "lost", "surrender", "give up", "fail"], "char": "\u{1F3F3}", "fitzpatrick_scale": false, "category": "objects" };
const black_flag = { "keywords": ["pirate"], "char": "\u{1F3F4}", "fitzpatrick_scale": false, "category": "objects" };
const rainbow_flag = { "keywords": ["flag", "rainbow", "pride", "gay", "lgbt", "glbt", "queer", "homosexual", "lesbian", "bisexual", "transgender"], "char": "\u{1F3F3}\uFE0F\u200D\u{1F308}", "fitzpatrick_scale": false, "category": "objects" };
const closed_lock_with_key = { "keywords": ["security", "privacy"], "char": "\u{1F510}", "fitzpatrick_scale": false, "category": "objects" };
const lock = { "keywords": ["security", "password", "padlock"], "char": "\u{1F512}", "fitzpatrick_scale": false, "category": "objects" };
const unlock = { "keywords": ["privacy", "security"], "char": "\u{1F513}", "fitzpatrick_scale": false, "category": "objects" };
const lock_with_ink_pen = { "keywords": ["security", "secret"], "char": "\u{1F50F}", "fitzpatrick_scale": false, "category": "objects" };
const pen = { "keywords": ["stationery", "writing", "write"], "char": "\u{1F58A}", "fitzpatrick_scale": false, "category": "objects" };
const fountain_pen = { "keywords": ["stationery", "writing", "write"], "char": "\u{1F58B}", "fitzpatrick_scale": false, "category": "objects" };
const black_nib = { "keywords": ["pen", "stationery", "writing", "write"], "char": "\u2712\uFE0F", "fitzpatrick_scale": false, "category": "objects" };
const memo = { "keywords": ["write", "documents", "stationery", "pencil", "paper", "writing", "legal", "exam", "quiz", "test", "study", "compose"], "char": "\u{1F4DD}", "fitzpatrick_scale": false, "category": "objects" };
const pencil2 = { "keywords": ["stationery", "write", "paper", "writing", "school", "study"], "char": "\u270F\uFE0F", "fitzpatrick_scale": false, "category": "objects" };
const crayon = { "keywords": ["drawing", "creativity"], "char": "\u{1F58D}", "fitzpatrick_scale": false, "category": "objects" };
const paintbrush = { "keywords": ["drawing", "creativity", "art"], "char": "\u{1F58C}", "fitzpatrick_scale": false, "category": "objects" };
const mag = { "keywords": ["search", "zoom", "find", "detective"], "char": "\u{1F50D}", "fitzpatrick_scale": false, "category": "objects" };
const mag_right = { "keywords": ["search", "zoom", "find", "detective"], "char": "\u{1F50E}", "fitzpatrick_scale": false, "category": "objects" };
const heart = { "keywords": ["love", "like", "valentines"], "char": "\u2764\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const orange_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F9E1}", "fitzpatrick_scale": false, "category": "symbols" };
const yellow_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F49B}", "fitzpatrick_scale": false, "category": "symbols" };
const green_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F49A}", "fitzpatrick_scale": false, "category": "symbols" };
const blue_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F499}", "fitzpatrick_scale": false, "category": "symbols" };
const purple_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F49C}", "fitzpatrick_scale": false, "category": "symbols" };
const black_heart = { "keywords": ["evil"], "char": "\u{1F5A4}", "fitzpatrick_scale": false, "category": "symbols" };
const broken_heart = { "keywords": ["sad", "sorry", "break", "heart", "heartbreak"], "char": "\u{1F494}", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_heart_exclamation = { "keywords": ["decoration", "love"], "char": "\u2763", "fitzpatrick_scale": false, "category": "symbols" };
const two_hearts = { "keywords": ["love", "like", "affection", "valentines", "heart"], "char": "\u{1F495}", "fitzpatrick_scale": false, "category": "symbols" };
const revolving_hearts = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F49E}", "fitzpatrick_scale": false, "category": "symbols" };
const heartbeat = { "keywords": ["love", "like", "affection", "valentines", "pink", "heart"], "char": "\u{1F493}", "fitzpatrick_scale": false, "category": "symbols" };
const heartpulse = { "keywords": ["like", "love", "affection", "valentines", "pink"], "char": "\u{1F497}", "fitzpatrick_scale": false, "category": "symbols" };
const sparkling_heart = { "keywords": ["love", "like", "affection", "valentines"], "char": "\u{1F496}", "fitzpatrick_scale": false, "category": "symbols" };
const cupid = { "keywords": ["love", "like", "heart", "affection", "valentines"], "char": "\u{1F498}", "fitzpatrick_scale": false, "category": "symbols" };
const gift_heart = { "keywords": ["love", "valentines"], "char": "\u{1F49D}", "fitzpatrick_scale": false, "category": "symbols" };
const heart_decoration = { "keywords": ["purple-square", "love", "like"], "char": "\u{1F49F}", "fitzpatrick_scale": false, "category": "symbols" };
const peace_symbol = { "keywords": ["hippie"], "char": "\u262E", "fitzpatrick_scale": false, "category": "symbols" };
const latin_cross = { "keywords": ["christianity"], "char": "\u271D", "fitzpatrick_scale": false, "category": "symbols" };
const star_and_crescent = { "keywords": ["islam"], "char": "\u262A", "fitzpatrick_scale": false, "category": "symbols" };
const om = { "keywords": ["hinduism", "buddhism", "sikhism", "jainism"], "char": "\u{1F549}", "fitzpatrick_scale": false, "category": "symbols" };
const wheel_of_dharma = { "keywords": ["hinduism", "buddhism", "sikhism", "jainism"], "char": "\u2638", "fitzpatrick_scale": false, "category": "symbols" };
const star_of_david = { "keywords": ["judaism"], "char": "\u2721", "fitzpatrick_scale": false, "category": "symbols" };
const six_pointed_star = { "keywords": ["purple-square", "religion", "jewish", "hexagram"], "char": "\u{1F52F}", "fitzpatrick_scale": false, "category": "symbols" };
const menorah = { "keywords": ["hanukkah", "candles", "jewish"], "char": "\u{1F54E}", "fitzpatrick_scale": false, "category": "symbols" };
const yin_yang = { "keywords": ["balance"], "char": "\u262F", "fitzpatrick_scale": false, "category": "symbols" };
const orthodox_cross = { "keywords": ["suppedaneum", "religion"], "char": "\u2626", "fitzpatrick_scale": false, "category": "symbols" };
const place_of_worship = { "keywords": ["religion", "church", "temple", "prayer"], "char": "\u{1F6D0}", "fitzpatrick_scale": false, "category": "symbols" };
const ophiuchus = { "keywords": ["sign", "purple-square", "constellation", "astrology"], "char": "\u26CE", "fitzpatrick_scale": false, "category": "symbols" };
const aries = { "keywords": ["sign", "purple-square", "zodiac", "astrology"], "char": "\u2648", "fitzpatrick_scale": false, "category": "symbols" };
const taurus = { "keywords": ["purple-square", "sign", "zodiac", "astrology"], "char": "\u2649", "fitzpatrick_scale": false, "category": "symbols" };
const gemini = { "keywords": ["sign", "zodiac", "purple-square", "astrology"], "char": "\u264A", "fitzpatrick_scale": false, "category": "symbols" };
const cancer = { "keywords": ["sign", "zodiac", "purple-square", "astrology"], "char": "\u264B", "fitzpatrick_scale": false, "category": "symbols" };
const leo = { "keywords": ["sign", "purple-square", "zodiac", "astrology"], "char": "\u264C", "fitzpatrick_scale": false, "category": "symbols" };
const virgo = { "keywords": ["sign", "zodiac", "purple-square", "astrology"], "char": "\u264D", "fitzpatrick_scale": false, "category": "symbols" };
const libra = { "keywords": ["sign", "purple-square", "zodiac", "astrology"], "char": "\u264E", "fitzpatrick_scale": false, "category": "symbols" };
const scorpius = { "keywords": ["sign", "zodiac", "purple-square", "astrology", "scorpio"], "char": "\u264F", "fitzpatrick_scale": false, "category": "symbols" };
const sagittarius = { "keywords": ["sign", "zodiac", "purple-square", "astrology"], "char": "\u2650", "fitzpatrick_scale": false, "category": "symbols" };
const capricorn = { "keywords": ["sign", "zodiac", "purple-square", "astrology"], "char": "\u2651", "fitzpatrick_scale": false, "category": "symbols" };
const aquarius = { "keywords": ["sign", "purple-square", "zodiac", "astrology"], "char": "\u2652", "fitzpatrick_scale": false, "category": "symbols" };
const pisces = { "keywords": ["purple-square", "sign", "zodiac", "astrology"], "char": "\u2653", "fitzpatrick_scale": false, "category": "symbols" };
const id = { "keywords": ["purple-square", "words"], "char": "\u{1F194}", "fitzpatrick_scale": false, "category": "symbols" };
const atom_symbol = { "keywords": ["science", "physics", "chemistry"], "char": "\u269B", "fitzpatrick_scale": false, "category": "symbols" };
const u7a7a = { "keywords": ["kanji", "japanese", "chinese", "empty", "sky", "blue-square"], "char": "\u{1F233}", "fitzpatrick_scale": false, "category": "symbols" };
const u5272 = { "keywords": ["cut", "divide", "chinese", "kanji", "pink-square"], "char": "\u{1F239}", "fitzpatrick_scale": false, "category": "symbols" };
const radioactive = { "keywords": ["nuclear", "danger"], "char": "\u2622", "fitzpatrick_scale": false, "category": "symbols" };
const biohazard = { "keywords": ["danger"], "char": "\u2623", "fitzpatrick_scale": false, "category": "symbols" };
const mobile_phone_off = { "keywords": ["mute", "orange-square", "silence", "quiet"], "char": "\u{1F4F4}", "fitzpatrick_scale": false, "category": "symbols" };
const vibration_mode = { "keywords": ["orange-square", "phone"], "char": "\u{1F4F3}", "fitzpatrick_scale": false, "category": "symbols" };
const u6709 = { "keywords": ["orange-square", "chinese", "have", "kanji"], "char": "\u{1F236}", "fitzpatrick_scale": false, "category": "symbols" };
const u7121 = { "keywords": ["nothing", "chinese", "kanji", "japanese", "orange-square"], "char": "\u{1F21A}", "fitzpatrick_scale": false, "category": "symbols" };
const u7533 = { "keywords": ["chinese", "japanese", "kanji", "orange-square"], "char": "\u{1F238}", "fitzpatrick_scale": false, "category": "symbols" };
const u55b6 = { "keywords": ["japanese", "opening hours", "orange-square"], "char": "\u{1F23A}", "fitzpatrick_scale": false, "category": "symbols" };
const u6708 = { "keywords": ["chinese", "month", "moon", "japanese", "orange-square", "kanji"], "char": "\u{1F237}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const eight_pointed_black_star = { "keywords": ["orange-square", "shape", "polygon"], "char": "\u2734\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const vs = { "keywords": ["words", "orange-square"], "char": "\u{1F19A}", "fitzpatrick_scale": false, "category": "symbols" };
const accept = { "keywords": ["ok", "good", "chinese", "kanji", "agree", "yes", "orange-circle"], "char": "\u{1F251}", "fitzpatrick_scale": false, "category": "symbols" };
const white_flower = { "keywords": ["japanese", "spring"], "char": "\u{1F4AE}", "fitzpatrick_scale": false, "category": "symbols" };
const ideograph_advantage = { "keywords": ["chinese", "kanji", "obtain", "get", "circle"], "char": "\u{1F250}", "fitzpatrick_scale": false, "category": "symbols" };
const secret = { "keywords": ["privacy", "chinese", "sshh", "kanji", "red-circle"], "char": "\u3299\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const congratulations = { "keywords": ["chinese", "kanji", "japanese", "red-circle"], "char": "\u3297\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const u5408 = { "keywords": ["japanese", "chinese", "join", "kanji", "red-square"], "char": "\u{1F234}", "fitzpatrick_scale": false, "category": "symbols" };
const u6e80 = { "keywords": ["full", "chinese", "japanese", "red-square", "kanji"], "char": "\u{1F235}", "fitzpatrick_scale": false, "category": "symbols" };
const u7981 = { "keywords": ["kanji", "japanese", "chinese", "forbidden", "limit", "restricted", "red-square"], "char": "\u{1F232}", "fitzpatrick_scale": false, "category": "symbols" };
const a = { "keywords": ["red-square", "alphabet", "letter"], "char": "\u{1F170}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const b = { "keywords": ["red-square", "alphabet", "letter"], "char": "\u{1F171}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const ab = { "keywords": ["red-square", "alphabet"], "char": "\u{1F18E}", "fitzpatrick_scale": false, "category": "symbols" };
const cl = { "keywords": ["alphabet", "words", "red-square"], "char": "\u{1F191}", "fitzpatrick_scale": false, "category": "symbols" };
const o2 = { "keywords": ["alphabet", "red-square", "letter"], "char": "\u{1F17E}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const sos = { "keywords": ["help", "red-square", "words", "emergency", "911"], "char": "\u{1F198}", "fitzpatrick_scale": false, "category": "symbols" };
const no_entry = { "keywords": ["limit", "security", "privacy", "bad", "denied", "stop", "circle"], "char": "\u26D4", "fitzpatrick_scale": false, "category": "symbols" };
const name_badge = { "keywords": ["fire", "forbid"], "char": "\u{1F4DB}", "fitzpatrick_scale": false, "category": "symbols" };
const no_entry_sign = { "keywords": ["forbid", "stop", "limit", "denied", "disallow", "circle"], "char": "\u{1F6AB}", "fitzpatrick_scale": false, "category": "symbols" };
const x = { "keywords": ["no", "delete", "remove", "cancel", "red"], "char": "\u274C", "fitzpatrick_scale": false, "category": "symbols" };
const o = { "keywords": ["circle", "round"], "char": "\u2B55", "fitzpatrick_scale": false, "category": "symbols" };
const stop_sign = { "keywords": ["stop"], "char": "\u{1F6D1}", "fitzpatrick_scale": false, "category": "symbols" };
const anger = { "keywords": ["angry", "mad"], "char": "\u{1F4A2}", "fitzpatrick_scale": false, "category": "symbols" };
const hotsprings = { "keywords": ["bath", "warm", "relax"], "char": "\u2668\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const no_pedestrians = { "keywords": ["rules", "crossing", "walking", "circle"], "char": "\u{1F6B7}", "fitzpatrick_scale": false, "category": "symbols" };
const do_not_litter = { "keywords": ["trash", "bin", "garbage", "circle"], "char": "\u{1F6AF}", "fitzpatrick_scale": false, "category": "symbols" };
const no_bicycles = { "keywords": ["cyclist", "prohibited", "circle"], "char": "\u{1F6B3}", "fitzpatrick_scale": false, "category": "symbols" };
const underage = { "keywords": ["18", "drink", "pub", "night", "minor", "circle"], "char": "\u{1F51E}", "fitzpatrick_scale": false, "category": "symbols" };
const no_mobile_phones = { "keywords": ["iphone", "mute", "circle"], "char": "\u{1F4F5}", "fitzpatrick_scale": false, "category": "symbols" };
const exclamation = { "keywords": ["heavy_exclamation_mark", "danger", "surprise", "punctuation", "wow", "warning"], "char": "\u2757", "fitzpatrick_scale": false, "category": "symbols" };
const grey_exclamation = { "keywords": ["surprise", "punctuation", "gray", "wow", "warning"], "char": "\u2755", "fitzpatrick_scale": false, "category": "symbols" };
const question = { "keywords": ["doubt", "confused"], "char": "\u2753", "fitzpatrick_scale": false, "category": "symbols" };
const grey_question = { "keywords": ["doubts", "gray", "huh", "confused"], "char": "\u2754", "fitzpatrick_scale": false, "category": "symbols" };
const bangbang = { "keywords": ["exclamation", "surprise"], "char": "\u203C\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const interrobang = { "keywords": ["wat", "punctuation", "surprise"], "char": "\u2049\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const low_brightness = { "keywords": ["sun", "afternoon", "warm", "summer"], "char": "\u{1F505}", "fitzpatrick_scale": false, "category": "symbols" };
const high_brightness = { "keywords": ["sun", "light"], "char": "\u{1F506}", "fitzpatrick_scale": false, "category": "symbols" };
const trident = { "keywords": ["weapon", "spear"], "char": "\u{1F531}", "fitzpatrick_scale": false, "category": "symbols" };
const fleur_de_lis = { "keywords": ["decorative", "scout"], "char": "\u269C", "fitzpatrick_scale": false, "category": "symbols" };
const part_alternation_mark = { "keywords": ["graph", "presentation", "stats", "business", "economics", "bad"], "char": "\u303D\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const warning = { "keywords": ["exclamation", "wip", "alert", "error", "problem", "issue"], "char": "\u26A0\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const children_crossing = { "keywords": ["school", "warning", "danger", "sign", "driving", "yellow-diamond"], "char": "\u{1F6B8}", "fitzpatrick_scale": false, "category": "symbols" };
const beginner = { "keywords": ["badge", "shield"], "char": "\u{1F530}", "fitzpatrick_scale": false, "category": "symbols" };
const recycle = { "keywords": ["arrow", "environment", "garbage", "trash"], "char": "\u267B\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const u6307 = { "keywords": ["chinese", "point", "green-square", "kanji"], "char": "\u{1F22F}", "fitzpatrick_scale": false, "category": "symbols" };
const chart = { "keywords": ["green-square", "graph", "presentation", "stats"], "char": "\u{1F4B9}", "fitzpatrick_scale": false, "category": "symbols" };
const sparkle = { "keywords": ["stars", "green-square", "awesome", "good", "fireworks"], "char": "\u2747\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const eight_spoked_asterisk = { "keywords": ["star", "sparkle", "green-square"], "char": "\u2733\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const negative_squared_cross_mark = { "keywords": ["x", "green-square", "no", "deny"], "char": "\u274E", "fitzpatrick_scale": false, "category": "symbols" };
const white_check_mark = { "keywords": ["green-square", "ok", "agree", "vote", "election", "answer", "tick"], "char": "\u2705", "fitzpatrick_scale": false, "category": "symbols" };
const diamond_shape_with_a_dot_inside = { "keywords": ["jewel", "blue", "gem", "crystal", "fancy"], "char": "\u{1F4A0}", "fitzpatrick_scale": false, "category": "symbols" };
const cyclone = { "keywords": ["weather", "swirl", "blue", "cloud", "vortex", "spiral", "whirlpool", "spin", "tornado", "hurricane", "typhoon"], "char": "\u{1F300}", "fitzpatrick_scale": false, "category": "symbols" };
const loop = { "keywords": ["tape", "cassette"], "char": "\u27BF", "fitzpatrick_scale": false, "category": "symbols" };
const globe_with_meridians = { "keywords": ["earth", "international", "world", "internet", "interweb", "i18n"], "char": "\u{1F310}", "fitzpatrick_scale": false, "category": "symbols" };
const m = { "keywords": ["alphabet", "blue-circle", "letter"], "char": "\u24C2\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const atm = { "keywords": ["money", "sales", "cash", "blue-square", "payment", "bank"], "char": "\u{1F3E7}", "fitzpatrick_scale": false, "category": "symbols" };
const sa = { "keywords": ["japanese", "blue-square", "katakana"], "char": "\u{1F202}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const passport_control = { "keywords": ["custom", "blue-square"], "char": "\u{1F6C2}", "fitzpatrick_scale": false, "category": "symbols" };
const customs = { "keywords": ["passport", "border", "blue-square"], "char": "\u{1F6C3}", "fitzpatrick_scale": false, "category": "symbols" };
const baggage_claim = { "keywords": ["blue-square", "airport", "transport"], "char": "\u{1F6C4}", "fitzpatrick_scale": false, "category": "symbols" };
const left_luggage = { "keywords": ["blue-square", "travel"], "char": "\u{1F6C5}", "fitzpatrick_scale": false, "category": "symbols" };
const wheelchair = { "keywords": ["blue-square", "disabled", "a11y", "accessibility"], "char": "\u267F", "fitzpatrick_scale": false, "category": "symbols" };
const no_smoking = { "keywords": ["cigarette", "blue-square", "smell", "smoke"], "char": "\u{1F6AD}", "fitzpatrick_scale": false, "category": "symbols" };
const wc = { "keywords": ["toilet", "restroom", "blue-square"], "char": "\u{1F6BE}", "fitzpatrick_scale": false, "category": "symbols" };
const parking = { "keywords": ["cars", "blue-square", "alphabet", "letter"], "char": "\u{1F17F}\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const potable_water = { "keywords": ["blue-square", "liquid", "restroom", "cleaning", "faucet"], "char": "\u{1F6B0}", "fitzpatrick_scale": false, "category": "symbols" };
const mens = { "keywords": ["toilet", "restroom", "wc", "blue-square", "gender", "male"], "char": "\u{1F6B9}", "fitzpatrick_scale": false, "category": "symbols" };
const womens = { "keywords": ["purple-square", "woman", "female", "toilet", "loo", "restroom", "gender"], "char": "\u{1F6BA}", "fitzpatrick_scale": false, "category": "symbols" };
const baby_symbol = { "keywords": ["orange-square", "child"], "char": "\u{1F6BC}", "fitzpatrick_scale": false, "category": "symbols" };
const restroom = { "keywords": ["blue-square", "toilet", "refresh", "wc", "gender"], "char": "\u{1F6BB}", "fitzpatrick_scale": false, "category": "symbols" };
const put_litter_in_its_place = { "keywords": ["blue-square", "sign", "human", "info"], "char": "\u{1F6AE}", "fitzpatrick_scale": false, "category": "symbols" };
const cinema = { "keywords": ["blue-square", "record", "film", "movie", "curtain", "stage", "theater"], "char": "\u{1F3A6}", "fitzpatrick_scale": false, "category": "symbols" };
const signal_strength = { "keywords": ["blue-square", "reception", "phone", "internet", "connection", "wifi", "bluetooth", "bars"], "char": "\u{1F4F6}", "fitzpatrick_scale": false, "category": "symbols" };
const koko = { "keywords": ["blue-square", "here", "katakana", "japanese", "destination"], "char": "\u{1F201}", "fitzpatrick_scale": false, "category": "symbols" };
const ng = { "keywords": ["blue-square", "words", "shape", "icon"], "char": "\u{1F196}", "fitzpatrick_scale": false, "category": "symbols" };
const ok = { "keywords": ["good", "agree", "yes", "blue-square"], "char": "\u{1F197}", "fitzpatrick_scale": false, "category": "symbols" };
const up = { "keywords": ["blue-square", "above", "high"], "char": "\u{1F199}", "fitzpatrick_scale": false, "category": "symbols" };
const cool = { "keywords": ["words", "blue-square"], "char": "\u{1F192}", "fitzpatrick_scale": false, "category": "symbols" };
const free = { "keywords": ["blue-square", "words"], "char": "\u{1F193}", "fitzpatrick_scale": false, "category": "symbols" };
const zero = { "keywords": ["0", "numbers", "blue-square", "null"], "char": "0\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const one = { "keywords": ["blue-square", "numbers", "1"], "char": "1\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const two = { "keywords": ["numbers", "2", "prime", "blue-square"], "char": "2\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const three = { "keywords": ["3", "numbers", "prime", "blue-square"], "char": "3\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const four = { "keywords": ["4", "numbers", "blue-square"], "char": "4\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const five = { "keywords": ["5", "numbers", "blue-square", "prime"], "char": "5\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const six = { "keywords": ["6", "numbers", "blue-square"], "char": "6\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const seven = { "keywords": ["7", "numbers", "blue-square", "prime"], "char": "7\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const eight = { "keywords": ["8", "blue-square", "numbers"], "char": "8\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const nine = { "keywords": ["blue-square", "numbers", "9"], "char": "9\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const keycap_ten = { "keywords": ["numbers", "10", "blue-square"], "char": "\u{1F51F}", "fitzpatrick_scale": false, "category": "symbols" };
const asterisk = { "keywords": ["star", "keycap"], "char": "*\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const eject_button = { "keywords": ["blue-square"], "char": "\u23CF\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_forward = { "keywords": ["blue-square", "right", "direction", "play"], "char": "\u25B6\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const pause_button = { "keywords": ["pause", "blue-square"], "char": "\u23F8", "fitzpatrick_scale": false, "category": "symbols" };
const next_track_button = { "keywords": ["forward", "next", "blue-square"], "char": "\u23ED", "fitzpatrick_scale": false, "category": "symbols" };
const stop_button = { "keywords": ["blue-square"], "char": "\u23F9", "fitzpatrick_scale": false, "category": "symbols" };
const record_button = { "keywords": ["blue-square"], "char": "\u23FA", "fitzpatrick_scale": false, "category": "symbols" };
const play_or_pause_button = { "keywords": ["blue-square", "play", "pause"], "char": "\u23EF", "fitzpatrick_scale": false, "category": "symbols" };
const previous_track_button = { "keywords": ["backward"], "char": "\u23EE", "fitzpatrick_scale": false, "category": "symbols" };
const fast_forward = { "keywords": ["blue-square", "play", "speed", "continue"], "char": "\u23E9", "fitzpatrick_scale": false, "category": "symbols" };
const rewind = { "keywords": ["play", "blue-square"], "char": "\u23EA", "fitzpatrick_scale": false, "category": "symbols" };
const twisted_rightwards_arrows = { "keywords": ["blue-square", "shuffle", "music", "random"], "char": "\u{1F500}", "fitzpatrick_scale": false, "category": "symbols" };
const repeat = { "keywords": ["loop", "record"], "char": "\u{1F501}", "fitzpatrick_scale": false, "category": "symbols" };
const repeat_one = { "keywords": ["blue-square", "loop"], "char": "\u{1F502}", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_backward = { "keywords": ["blue-square", "left", "direction"], "char": "\u25C0\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_up_small = { "keywords": ["blue-square", "triangle", "direction", "point", "forward", "top"], "char": "\u{1F53C}", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_down_small = { "keywords": ["blue-square", "direction", "bottom"], "char": "\u{1F53D}", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_double_up = { "keywords": ["blue-square", "direction", "top"], "char": "\u23EB", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_double_down = { "keywords": ["blue-square", "direction", "bottom"], "char": "\u23EC", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_right = { "keywords": ["blue-square", "next"], "char": "\u27A1\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_left = { "keywords": ["blue-square", "previous", "back"], "char": "\u2B05\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_up = { "keywords": ["blue-square", "continue", "top", "direction"], "char": "\u2B06\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_down = { "keywords": ["blue-square", "direction", "bottom"], "char": "\u2B07\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_upper_right = { "keywords": ["blue-square", "point", "direction", "diagonal", "northeast"], "char": "\u2197\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_lower_right = { "keywords": ["blue-square", "direction", "diagonal", "southeast"], "char": "\u2198\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_lower_left = { "keywords": ["blue-square", "direction", "diagonal", "southwest"], "char": "\u2199\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_upper_left = { "keywords": ["blue-square", "point", "direction", "diagonal", "northwest"], "char": "\u2196\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_up_down = { "keywords": ["blue-square", "direction", "way", "vertical"], "char": "\u2195\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const left_right_arrow = { "keywords": ["shape", "direction", "horizontal", "sideways"], "char": "\u2194\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrows_counterclockwise = { "keywords": ["blue-square", "sync", "cycle"], "char": "\u{1F504}", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_right_hook = { "keywords": ["blue-square", "return", "rotate", "direction"], "char": "\u21AA\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const leftwards_arrow_with_hook = { "keywords": ["back", "return", "blue-square", "undo", "enter"], "char": "\u21A9\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_heading_up = { "keywords": ["blue-square", "direction", "top"], "char": "\u2934\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrow_heading_down = { "keywords": ["blue-square", "direction", "bottom"], "char": "\u2935\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const hash = { "keywords": ["symbol", "blue-square", "twitter"], "char": "#\uFE0F\u20E3", "fitzpatrick_scale": false, "category": "symbols" };
const information_source = { "keywords": ["blue-square", "alphabet", "letter"], "char": "\u2139\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const abc = { "keywords": ["blue-square", "alphabet"], "char": "\u{1F524}", "fitzpatrick_scale": false, "category": "symbols" };
const abcd = { "keywords": ["blue-square", "alphabet"], "char": "\u{1F521}", "fitzpatrick_scale": false, "category": "symbols" };
const capital_abcd = { "keywords": ["alphabet", "words", "blue-square"], "char": "\u{1F520}", "fitzpatrick_scale": false, "category": "symbols" };
const symbols = { "keywords": ["blue-square", "music", "note", "ampersand", "percent", "glyphs", "characters"], "char": "\u{1F523}", "fitzpatrick_scale": false, "category": "symbols" };
const musical_note = { "keywords": ["score", "tone", "sound"], "char": "\u{1F3B5}", "fitzpatrick_scale": false, "category": "symbols" };
const notes = { "keywords": ["music", "score"], "char": "\u{1F3B6}", "fitzpatrick_scale": false, "category": "symbols" };
const wavy_dash = { "keywords": ["draw", "line", "moustache", "mustache", "squiggle", "scribble"], "char": "\u3030\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const curly_loop = { "keywords": ["scribble", "draw", "shape", "squiggle"], "char": "\u27B0", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_check_mark = { "keywords": ["ok", "nike", "answer", "yes", "tick"], "char": "\u2714\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const arrows_clockwise = { "keywords": ["sync", "cycle", "round", "repeat"], "char": "\u{1F503}", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_plus_sign = { "keywords": ["math", "calculation", "addition", "more", "increase"], "char": "\u2795", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_minus_sign = { "keywords": ["math", "calculation", "subtract", "less"], "char": "\u2796", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_division_sign = { "keywords": ["divide", "math", "calculation"], "char": "\u2797", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_multiplication_x = { "keywords": ["math", "calculation"], "char": "\u2716\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const infinity = { "keywords": ["forever"], "char": "\u267E", "fitzpatrick_scale": false, "category": "symbols" };
const heavy_dollar_sign = { "keywords": ["money", "sales", "payment", "currency", "buck"], "char": "\u{1F4B2}", "fitzpatrick_scale": false, "category": "symbols" };
const currency_exchange = { "keywords": ["money", "sales", "dollar", "travel"], "char": "\u{1F4B1}", "fitzpatrick_scale": false, "category": "symbols" };
const copyright = { "keywords": ["ip", "license", "circle", "law", "legal"], "char": "\xA9\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const registered = { "keywords": ["alphabet", "circle"], "char": "\xAE\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const tm = { "keywords": ["trademark", "brand", "law", "legal"], "char": "\u2122\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const end = { "keywords": ["words", "arrow"], "char": "\u{1F51A}", "fitzpatrick_scale": false, "category": "symbols" };
const back = { "keywords": ["arrow", "words", "return"], "char": "\u{1F519}", "fitzpatrick_scale": false, "category": "symbols" };
const on = { "keywords": ["arrow", "words"], "char": "\u{1F51B}", "fitzpatrick_scale": false, "category": "symbols" };
const top = { "keywords": ["words", "blue-square"], "char": "\u{1F51D}", "fitzpatrick_scale": false, "category": "symbols" };
const soon = { "keywords": ["arrow", "words"], "char": "\u{1F51C}", "fitzpatrick_scale": false, "category": "symbols" };
const ballot_box_with_check = { "keywords": ["ok", "agree", "confirm", "black-square", "vote", "election", "yes", "tick"], "char": "\u2611\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const radio_button = { "keywords": ["input", "old", "music", "circle"], "char": "\u{1F518}", "fitzpatrick_scale": false, "category": "symbols" };
const white_circle = { "keywords": ["shape", "round"], "char": "\u26AA", "fitzpatrick_scale": false, "category": "symbols" };
const black_circle = { "keywords": ["shape", "button", "round"], "char": "\u26AB", "fitzpatrick_scale": false, "category": "symbols" };
const red_circle = { "keywords": ["shape", "error", "danger"], "char": "\u{1F534}", "fitzpatrick_scale": false, "category": "symbols" };
const large_blue_circle = { "keywords": ["shape", "icon", "button"], "char": "\u{1F535}", "fitzpatrick_scale": false, "category": "symbols" };
const small_orange_diamond = { "keywords": ["shape", "jewel", "gem"], "char": "\u{1F538}", "fitzpatrick_scale": false, "category": "symbols" };
const small_blue_diamond = { "keywords": ["shape", "jewel", "gem"], "char": "\u{1F539}", "fitzpatrick_scale": false, "category": "symbols" };
const large_orange_diamond = { "keywords": ["shape", "jewel", "gem"], "char": "\u{1F536}", "fitzpatrick_scale": false, "category": "symbols" };
const large_blue_diamond = { "keywords": ["shape", "jewel", "gem"], "char": "\u{1F537}", "fitzpatrick_scale": false, "category": "symbols" };
const small_red_triangle = { "keywords": ["shape", "direction", "up", "top"], "char": "\u{1F53A}", "fitzpatrick_scale": false, "category": "symbols" };
const black_small_square = { "keywords": ["shape", "icon"], "char": "\u25AA\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const white_small_square = { "keywords": ["shape", "icon"], "char": "\u25AB\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const black_large_square = { "keywords": ["shape", "icon", "button"], "char": "\u2B1B", "fitzpatrick_scale": false, "category": "symbols" };
const white_large_square = { "keywords": ["shape", "icon", "stone", "button"], "char": "\u2B1C", "fitzpatrick_scale": false, "category": "symbols" };
const small_red_triangle_down = { "keywords": ["shape", "direction", "bottom"], "char": "\u{1F53B}", "fitzpatrick_scale": false, "category": "symbols" };
const black_medium_square = { "keywords": ["shape", "button", "icon"], "char": "\u25FC\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const white_medium_square = { "keywords": ["shape", "stone", "icon"], "char": "\u25FB\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const black_medium_small_square = { "keywords": ["icon", "shape", "button"], "char": "\u25FE", "fitzpatrick_scale": false, "category": "symbols" };
const white_medium_small_square = { "keywords": ["shape", "stone", "icon", "button"], "char": "\u25FD", "fitzpatrick_scale": false, "category": "symbols" };
const black_square_button = { "keywords": ["shape", "input", "frame"], "char": "\u{1F532}", "fitzpatrick_scale": false, "category": "symbols" };
const white_square_button = { "keywords": ["shape", "input"], "char": "\u{1F533}", "fitzpatrick_scale": false, "category": "symbols" };
const speaker = { "keywords": ["sound", "volume", "silence", "broadcast"], "char": "\u{1F508}", "fitzpatrick_scale": false, "category": "symbols" };
const sound = { "keywords": ["volume", "speaker", "broadcast"], "char": "\u{1F509}", "fitzpatrick_scale": false, "category": "symbols" };
const loud_sound = { "keywords": ["volume", "noise", "noisy", "speaker", "broadcast"], "char": "\u{1F50A}", "fitzpatrick_scale": false, "category": "symbols" };
const mute = { "keywords": ["sound", "volume", "silence", "quiet"], "char": "\u{1F507}", "fitzpatrick_scale": false, "category": "symbols" };
const mega = { "keywords": ["sound", "speaker", "volume"], "char": "\u{1F4E3}", "fitzpatrick_scale": false, "category": "symbols" };
const loudspeaker = { "keywords": ["volume", "sound"], "char": "\u{1F4E2}", "fitzpatrick_scale": false, "category": "symbols" };
const bell = { "keywords": ["sound", "notification", "christmas", "xmas", "chime"], "char": "\u{1F514}", "fitzpatrick_scale": false, "category": "symbols" };
const no_bell = { "keywords": ["sound", "volume", "mute", "quiet", "silent"], "char": "\u{1F515}", "fitzpatrick_scale": false, "category": "symbols" };
const black_joker = { "keywords": ["poker", "cards", "game", "play", "magic"], "char": "\u{1F0CF}", "fitzpatrick_scale": false, "category": "symbols" };
const mahjong = { "keywords": ["game", "play", "chinese", "kanji"], "char": "\u{1F004}", "fitzpatrick_scale": false, "category": "symbols" };
const spades = { "keywords": ["poker", "cards", "suits", "magic"], "char": "\u2660\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const clubs = { "keywords": ["poker", "cards", "magic", "suits"], "char": "\u2663\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const hearts = { "keywords": ["poker", "cards", "magic", "suits"], "char": "\u2665\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const diamonds = { "keywords": ["poker", "cards", "magic", "suits"], "char": "\u2666\uFE0F", "fitzpatrick_scale": false, "category": "symbols" };
const flower_playing_cards = { "keywords": ["game", "sunset", "red"], "char": "\u{1F3B4}", "fitzpatrick_scale": false, "category": "symbols" };
const thought_balloon = { "keywords": ["bubble", "cloud", "speech", "thinking", "dream"], "char": "\u{1F4AD}", "fitzpatrick_scale": false, "category": "symbols" };
const right_anger_bubble = { "keywords": ["caption", "speech", "thinking", "mad"], "char": "\u{1F5EF}", "fitzpatrick_scale": false, "category": "symbols" };
const speech_balloon = { "keywords": ["bubble", "words", "message", "talk", "chatting"], "char": "\u{1F4AC}", "fitzpatrick_scale": false, "category": "symbols" };
const left_speech_bubble = { "keywords": ["words", "message", "talk", "chatting"], "char": "\u{1F5E8}", "fitzpatrick_scale": false, "category": "symbols" };
const clock1 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F550}", "fitzpatrick_scale": false, "category": "symbols" };
const clock2 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F551}", "fitzpatrick_scale": false, "category": "symbols" };
const clock3 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F552}", "fitzpatrick_scale": false, "category": "symbols" };
const clock4 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F553}", "fitzpatrick_scale": false, "category": "symbols" };
const clock5 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F554}", "fitzpatrick_scale": false, "category": "symbols" };
const clock6 = { "keywords": ["time", "late", "early", "schedule", "dawn", "dusk"], "char": "\u{1F555}", "fitzpatrick_scale": false, "category": "symbols" };
const clock7 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F556}", "fitzpatrick_scale": false, "category": "symbols" };
const clock8 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F557}", "fitzpatrick_scale": false, "category": "symbols" };
const clock9 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F558}", "fitzpatrick_scale": false, "category": "symbols" };
const clock10 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F559}", "fitzpatrick_scale": false, "category": "symbols" };
const clock11 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F55A}", "fitzpatrick_scale": false, "category": "symbols" };
const clock12 = { "keywords": ["time", "noon", "midnight", "midday", "late", "early", "schedule"], "char": "\u{1F55B}", "fitzpatrick_scale": false, "category": "symbols" };
const clock130 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F55C}", "fitzpatrick_scale": false, "category": "symbols" };
const clock230 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F55D}", "fitzpatrick_scale": false, "category": "symbols" };
const clock330 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F55E}", "fitzpatrick_scale": false, "category": "symbols" };
const clock430 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F55F}", "fitzpatrick_scale": false, "category": "symbols" };
const clock530 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F560}", "fitzpatrick_scale": false, "category": "symbols" };
const clock630 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F561}", "fitzpatrick_scale": false, "category": "symbols" };
const clock730 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F562}", "fitzpatrick_scale": false, "category": "symbols" };
const clock830 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F563}", "fitzpatrick_scale": false, "category": "symbols" };
const clock930 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F564}", "fitzpatrick_scale": false, "category": "symbols" };
const clock1030 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F565}", "fitzpatrick_scale": false, "category": "symbols" };
const clock1130 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F566}", "fitzpatrick_scale": false, "category": "symbols" };
const clock1230 = { "keywords": ["time", "late", "early", "schedule"], "char": "\u{1F567}", "fitzpatrick_scale": false, "category": "symbols" };
const afghanistan = { "keywords": ["af", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const aland_islands = { "keywords": ["\xC5land", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1FD}", "fitzpatrick_scale": false, "category": "flags" };
const albania = { "keywords": ["al", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const algeria = { "keywords": ["dz", "flag", "nation", "country", "banner"], "char": "\u{1F1E9}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const american_samoa = { "keywords": ["american", "ws", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const andorra = { "keywords": ["ad", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const angola = { "keywords": ["ao", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const anguilla = { "keywords": ["ai", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const antarctica = { "keywords": ["aq", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F6}", "fitzpatrick_scale": false, "category": "flags" };
const antigua_barbuda = { "keywords": ["antigua", "barbuda", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const argentina = { "keywords": ["ar", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const armenia = { "keywords": ["am", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const aruba = { "keywords": ["aw", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const australia = { "keywords": ["au", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const austria = { "keywords": ["at", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const azerbaijan = { "keywords": ["az", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const bahamas = { "keywords": ["bs", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const bahrain = { "keywords": ["bh", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const bangladesh = { "keywords": ["bd", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const barbados = { "keywords": ["bb", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1E7}", "fitzpatrick_scale": false, "category": "flags" };
const belarus = { "keywords": ["by", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const belgium = { "keywords": ["be", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const belize = { "keywords": ["bz", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const benin = { "keywords": ["bj", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1EF}", "fitzpatrick_scale": false, "category": "flags" };
const bermuda = { "keywords": ["bm", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const bhutan = { "keywords": ["bt", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const bolivia = { "keywords": ["bo", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const caribbean_netherlands = { "keywords": ["bonaire", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F6}", "fitzpatrick_scale": false, "category": "flags" };
const bosnia_herzegovina = { "keywords": ["bosnia", "herzegovina", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const botswana = { "keywords": ["bw", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const brazil = { "keywords": ["br", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const british_indian_ocean_territory = { "keywords": ["british", "indian", "ocean", "territory", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const british_virgin_islands = { "keywords": ["british", "virgin", "islands", "bvi", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const brunei = { "keywords": ["bn", "darussalam", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const bulgaria = { "keywords": ["bg", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const burkina_faso = { "keywords": ["burkina", "faso", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const burundi = { "keywords": ["bi", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const cape_verde = { "keywords": ["cabo", "verde", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FB}", "fitzpatrick_scale": false, "category": "flags" };
const cambodia = { "keywords": ["kh", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const cameroon = { "keywords": ["cm", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const canada = { "keywords": ["ca", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const canary_islands = { "keywords": ["canary", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const cayman_islands = { "keywords": ["cayman", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const central_african_republic = { "keywords": ["central", "african", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const chad = { "keywords": ["td", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const chile = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const cn = { "keywords": ["china", "chinese", "prc", "flag", "country", "nation", "banner"], "char": "\u{1F1E8}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const christmas_island = { "keywords": ["christmas", "island", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FD}", "fitzpatrick_scale": false, "category": "flags" };
const cocos_islands = { "keywords": ["cocos", "keeling", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const colombia = { "keywords": ["co", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const comoros = { "keywords": ["km", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const congo_brazzaville = { "keywords": ["congo", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const congo_kinshasa = { "keywords": ["congo", "democratic", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const cook_islands = { "keywords": ["cook", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const costa_rica = { "keywords": ["costa", "rica", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const croatia = { "keywords": ["hr", "flag", "nation", "country", "banner"], "char": "\u{1F1ED}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const cuba = { "keywords": ["cu", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const curacao = { "keywords": ["cura\xE7ao", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const cyprus = { "keywords": ["cy", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const czech_republic = { "keywords": ["cz", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const denmark = { "keywords": ["dk", "flag", "nation", "country", "banner"], "char": "\u{1F1E9}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const djibouti = { "keywords": ["dj", "flag", "nation", "country", "banner"], "char": "\u{1F1E9}\u{1F1EF}", "fitzpatrick_scale": false, "category": "flags" };
const dominica = { "keywords": ["dm", "flag", "nation", "country", "banner"], "char": "\u{1F1E9}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const dominican_republic = { "keywords": ["dominican", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1E9}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const ecuador = { "keywords": ["ec", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const egypt = { "keywords": ["eg", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const el_salvador = { "keywords": ["el", "salvador", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1FB}", "fitzpatrick_scale": false, "category": "flags" };
const equatorial_guinea = { "keywords": ["equatorial", "gn", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F6}", "fitzpatrick_scale": false, "category": "flags" };
const eritrea = { "keywords": ["er", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const estonia = { "keywords": ["ee", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const ethiopia = { "keywords": ["et", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const eu = { "keywords": ["european", "union", "flag", "banner"], "char": "\u{1F1EA}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const falkland_islands = { "keywords": ["falkland", "islands", "malvinas", "flag", "nation", "country", "banner"], "char": "\u{1F1EB}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const faroe_islands = { "keywords": ["faroe", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1EB}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const fiji = { "keywords": ["fj", "flag", "nation", "country", "banner"], "char": "\u{1F1EB}\u{1F1EF}", "fitzpatrick_scale": false, "category": "flags" };
const finland = { "keywords": ["fi", "flag", "nation", "country", "banner"], "char": "\u{1F1EB}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const fr = { "keywords": ["banner", "flag", "nation", "france", "french", "country"], "char": "\u{1F1EB}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const french_guiana = { "keywords": ["french", "guiana", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const french_polynesia = { "keywords": ["french", "polynesia", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const french_southern_territories = { "keywords": ["french", "southern", "territories", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const gabon = { "keywords": ["ga", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const gambia = { "keywords": ["gm", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const georgia = { "keywords": ["ge", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const de = { "keywords": ["german", "nation", "flag", "country", "banner"], "char": "\u{1F1E9}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const ghana = { "keywords": ["gh", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const gibraltar = { "keywords": ["gi", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const greece = { "keywords": ["gr", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const greenland = { "keywords": ["gl", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const grenada = { "keywords": ["gd", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const guadeloupe = { "keywords": ["gp", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F5}", "fitzpatrick_scale": false, "category": "flags" };
const guam = { "keywords": ["gu", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const guatemala = { "keywords": ["gt", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const guernsey = { "keywords": ["gg", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const guinea = { "keywords": ["gn", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const guinea_bissau = { "keywords": ["gw", "bissau", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const guyana = { "keywords": ["gy", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const haiti = { "keywords": ["ht", "flag", "nation", "country", "banner"], "char": "\u{1F1ED}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const honduras = { "keywords": ["hn", "flag", "nation", "country", "banner"], "char": "\u{1F1ED}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const hong_kong = { "keywords": ["hong", "kong", "flag", "nation", "country", "banner"], "char": "\u{1F1ED}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const hungary = { "keywords": ["hu", "flag", "nation", "country", "banner"], "char": "\u{1F1ED}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const iceland = { "keywords": ["is", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const india = { "keywords": ["in", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const indonesia = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const iran = { "keywords": ["iran,", "islamic", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const iraq = { "keywords": ["iq", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F6}", "fitzpatrick_scale": false, "category": "flags" };
const ireland = { "keywords": ["ie", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const isle_of_man = { "keywords": ["isle", "man", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const israel = { "keywords": ["il", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const it = { "keywords": ["italy", "flag", "nation", "country", "banner"], "char": "\u{1F1EE}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const cote_divoire = { "keywords": ["ivory", "coast", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const jamaica = { "keywords": ["jm", "flag", "nation", "country", "banner"], "char": "\u{1F1EF}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const jp = { "keywords": ["japanese", "nation", "flag", "country", "banner"], "char": "\u{1F1EF}\u{1F1F5}", "fitzpatrick_scale": false, "category": "flags" };
const jersey = { "keywords": ["je", "flag", "nation", "country", "banner"], "char": "\u{1F1EF}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const jordan = { "keywords": ["jo", "flag", "nation", "country", "banner"], "char": "\u{1F1EF}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const kazakhstan = { "keywords": ["kz", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const kenya = { "keywords": ["ke", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const kiribati = { "keywords": ["ki", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const kosovo = { "keywords": ["xk", "flag", "nation", "country", "banner"], "char": "\u{1F1FD}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const kuwait = { "keywords": ["kw", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const kyrgyzstan = { "keywords": ["kg", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const laos = { "keywords": ["lao", "democratic", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const latvia = { "keywords": ["lv", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1FB}", "fitzpatrick_scale": false, "category": "flags" };
const lebanon = { "keywords": ["lb", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1E7}", "fitzpatrick_scale": false, "category": "flags" };
const lesotho = { "keywords": ["ls", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const liberia = { "keywords": ["lr", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const libya = { "keywords": ["ly", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const liechtenstein = { "keywords": ["li", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const lithuania = { "keywords": ["lt", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const luxembourg = { "keywords": ["lu", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const macau = { "keywords": ["macao", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const macedonia = { "keywords": ["macedonia,", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const madagascar = { "keywords": ["mg", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const malawi = { "keywords": ["mw", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const malaysia = { "keywords": ["my", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const maldives = { "keywords": ["mv", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FB}", "fitzpatrick_scale": false, "category": "flags" };
const mali = { "keywords": ["ml", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const malta = { "keywords": ["mt", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const marshall_islands = { "keywords": ["marshall", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const martinique = { "keywords": ["mq", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F6}", "fitzpatrick_scale": false, "category": "flags" };
const mauritania = { "keywords": ["mr", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const mauritius = { "keywords": ["mu", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const mayotte = { "keywords": ["yt", "flag", "nation", "country", "banner"], "char": "\u{1F1FE}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const mexico = { "keywords": ["mx", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FD}", "fitzpatrick_scale": false, "category": "flags" };
const micronesia = { "keywords": ["micronesia,", "federated", "states", "flag", "nation", "country", "banner"], "char": "\u{1F1EB}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const moldova = { "keywords": ["moldova,", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const monaco = { "keywords": ["mc", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const mongolia = { "keywords": ["mn", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const montenegro = { "keywords": ["me", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const montserrat = { "keywords": ["ms", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const morocco = { "keywords": ["ma", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const mozambique = { "keywords": ["mz", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const myanmar = { "keywords": ["mm", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const namibia = { "keywords": ["na", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const nauru = { "keywords": ["nr", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const nepal = { "keywords": ["np", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1F5}", "fitzpatrick_scale": false, "category": "flags" };
const netherlands = { "keywords": ["nl", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const new_caledonia = { "keywords": ["new", "caledonia", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const new_zealand = { "keywords": ["new", "zealand", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const nicaragua = { "keywords": ["ni", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const niger = { "keywords": ["ne", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const nigeria = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const niue = { "keywords": ["nu", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const norfolk_island = { "keywords": ["norfolk", "island", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const northern_mariana_islands = { "keywords": ["northern", "mariana", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1F2}\u{1F1F5}", "fitzpatrick_scale": false, "category": "flags" };
const north_korea = { "keywords": ["north", "korea", "nation", "flag", "country", "banner"], "char": "\u{1F1F0}\u{1F1F5}", "fitzpatrick_scale": false, "category": "flags" };
const norway = { "keywords": ["no", "flag", "nation", "country", "banner"], "char": "\u{1F1F3}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const oman = { "keywords": ["om_symbol", "flag", "nation", "country", "banner"], "char": "\u{1F1F4}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const pakistan = { "keywords": ["pk", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const palau = { "keywords": ["pw", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const palestinian_territories = { "keywords": ["palestine", "palestinian", "territories", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const panama = { "keywords": ["pa", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const papua_new_guinea = { "keywords": ["papua", "new", "guinea", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const paraguay = { "keywords": ["py", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const peru = { "keywords": ["pe", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const philippines = { "keywords": ["ph", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const pitcairn_islands = { "keywords": ["pitcairn", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const poland = { "keywords": ["pl", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const portugal = { "keywords": ["pt", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const puerto_rico = { "keywords": ["puerto", "rico", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const qatar = { "keywords": ["qa", "flag", "nation", "country", "banner"], "char": "\u{1F1F6}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const reunion = { "keywords": ["r\xE9union", "flag", "nation", "country", "banner"], "char": "\u{1F1F7}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const romania = { "keywords": ["ro", "flag", "nation", "country", "banner"], "char": "\u{1F1F7}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const ru = { "keywords": ["russian", "federation", "flag", "nation", "country", "banner"], "char": "\u{1F1F7}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const rwanda = { "keywords": ["rw", "flag", "nation", "country", "banner"], "char": "\u{1F1F7}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const st_barthelemy = { "keywords": ["saint", "barth\xE9lemy", "flag", "nation", "country", "banner"], "char": "\u{1F1E7}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const st_helena = { "keywords": ["saint", "helena", "ascension", "tristan", "cunha", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const st_kitts_nevis = { "keywords": ["saint", "kitts", "nevis", "flag", "nation", "country", "banner"], "char": "\u{1F1F0}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const st_lucia = { "keywords": ["saint", "lucia", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const st_pierre_miquelon = { "keywords": ["saint", "pierre", "miquelon", "flag", "nation", "country", "banner"], "char": "\u{1F1F5}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const st_vincent_grenadines = { "keywords": ["saint", "vincent", "grenadines", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const samoa = { "keywords": ["ws", "flag", "nation", "country", "banner"], "char": "\u{1F1FC}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const san_marino = { "keywords": ["san", "marino", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const sao_tome_principe = { "keywords": ["sao", "tome", "principe", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const saudi_arabia = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const senegal = { "keywords": ["sn", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const serbia = { "keywords": ["rs", "flag", "nation", "country", "banner"], "char": "\u{1F1F7}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const seychelles = { "keywords": ["sc", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const sierra_leone = { "keywords": ["sierra", "leone", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const singapore = { "keywords": ["sg", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const sint_maarten = { "keywords": ["sint", "maarten", "dutch", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1FD}", "fitzpatrick_scale": false, "category": "flags" };
const slovakia = { "keywords": ["sk", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const slovenia = { "keywords": ["si", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const solomon_islands = { "keywords": ["solomon", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1E7}", "fitzpatrick_scale": false, "category": "flags" };
const somalia = { "keywords": ["so", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const south_africa = { "keywords": ["south", "africa", "flag", "nation", "country", "banner"], "char": "\u{1F1FF}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const south_georgia_south_sandwich_islands = { "keywords": ["south", "georgia", "sandwich", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1EC}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const kr = { "keywords": ["south", "korea", "nation", "flag", "country", "banner"], "char": "\u{1F1F0}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const south_sudan = { "keywords": ["south", "sd", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const es = { "keywords": ["spain", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const sri_lanka = { "keywords": ["sri", "lanka", "flag", "nation", "country", "banner"], "char": "\u{1F1F1}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const sudan = { "keywords": ["sd", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1E9}", "fitzpatrick_scale": false, "category": "flags" };
const suriname = { "keywords": ["sr", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const swaziland = { "keywords": ["sz", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const sweden = { "keywords": ["se", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const switzerland = { "keywords": ["ch", "flag", "nation", "country", "banner"], "char": "\u{1F1E8}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const syria = { "keywords": ["syrian", "arab", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1F8}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const taiwan = { "keywords": ["tw", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const tajikistan = { "keywords": ["tj", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1EF}", "fitzpatrick_scale": false, "category": "flags" };
const tanzania = { "keywords": ["tanzania,", "united", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const thailand = { "keywords": ["th", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const timor_leste = { "keywords": ["timor", "leste", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F1}", "fitzpatrick_scale": false, "category": "flags" };
const togo = { "keywords": ["tg", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const tokelau = { "keywords": ["tk", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F0}", "fitzpatrick_scale": false, "category": "flags" };
const tonga = { "keywords": ["to", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F4}", "fitzpatrick_scale": false, "category": "flags" };
const trinidad_tobago = { "keywords": ["trinidad", "tobago", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F9}", "fitzpatrick_scale": false, "category": "flags" };
const tunisia = { "keywords": ["tn", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const tr = { "keywords": ["turkey", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F7}", "fitzpatrick_scale": false, "category": "flags" };
const turkmenistan = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const turks_caicos_islands = { "keywords": ["turks", "caicos", "islands", "flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1E8}", "fitzpatrick_scale": false, "category": "flags" };
const tuvalu = { "keywords": ["flag", "nation", "country", "banner"], "char": "\u{1F1F9}\u{1F1FB}", "fitzpatrick_scale": false, "category": "flags" };
const uganda = { "keywords": ["ug", "flag", "nation", "country", "banner"], "char": "\u{1F1FA}\u{1F1EC}", "fitzpatrick_scale": false, "category": "flags" };
const ukraine = { "keywords": ["ua", "flag", "nation", "country", "banner"], "char": "\u{1F1FA}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const united_arab_emirates = { "keywords": ["united", "arab", "emirates", "flag", "nation", "country", "banner"], "char": "\u{1F1E6}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const uk = { "keywords": ["united", "kingdom", "great", "britain", "northern", "ireland", "flag", "nation", "country", "banner", "british", "UK", "english", "england", "union jack"], "char": "\u{1F1EC}\u{1F1E7}", "fitzpatrick_scale": false, "category": "flags" };
const england = { "keywords": ["flag", "english"], "char": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", "fitzpatrick_scale": false, "category": "flags" };
const scotland = { "keywords": ["flag", "scottish"], "char": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", "fitzpatrick_scale": false, "category": "flags" };
const wales = { "keywords": ["flag", "welsh"], "char": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}", "fitzpatrick_scale": false, "category": "flags" };
const us = { "keywords": ["united", "states", "america", "flag", "nation", "country", "banner"], "char": "\u{1F1FA}\u{1F1F8}", "fitzpatrick_scale": false, "category": "flags" };
const us_virgin_islands = { "keywords": ["virgin", "islands", "us", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1EE}", "fitzpatrick_scale": false, "category": "flags" };
const uruguay = { "keywords": ["uy", "flag", "nation", "country", "banner"], "char": "\u{1F1FA}\u{1F1FE}", "fitzpatrick_scale": false, "category": "flags" };
const uzbekistan = { "keywords": ["uz", "flag", "nation", "country", "banner"], "char": "\u{1F1FA}\u{1F1FF}", "fitzpatrick_scale": false, "category": "flags" };
const vanuatu = { "keywords": ["vu", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1FA}", "fitzpatrick_scale": false, "category": "flags" };
const vatican_city = { "keywords": ["vatican", "city", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1E6}", "fitzpatrick_scale": false, "category": "flags" };
const venezuela = { "keywords": ["ve", "bolivarian", "republic", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const vietnam = { "keywords": ["viet", "nam", "flag", "nation", "country", "banner"], "char": "\u{1F1FB}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const wallis_futuna = { "keywords": ["wallis", "futuna", "flag", "nation", "country", "banner"], "char": "\u{1F1FC}\u{1F1EB}", "fitzpatrick_scale": false, "category": "flags" };
const western_sahara = { "keywords": ["western", "sahara", "flag", "nation", "country", "banner"], "char": "\u{1F1EA}\u{1F1ED}", "fitzpatrick_scale": false, "category": "flags" };
const yemen = { "keywords": ["ye", "flag", "nation", "country", "banner"], "char": "\u{1F1FE}\u{1F1EA}", "fitzpatrick_scale": false, "category": "flags" };
const zambia = { "keywords": ["zm", "flag", "nation", "country", "banner"], "char": "\u{1F1FF}\u{1F1F2}", "fitzpatrick_scale": false, "category": "flags" };
const zimbabwe = { "keywords": ["zw", "flag", "nation", "country", "banner"], "char": "\u{1F1FF}\u{1F1FC}", "fitzpatrick_scale": false, "category": "flags" };
const united_nations = { "keywords": ["un", "flag", "banner"], "char": "\u{1F1FA}\u{1F1F3}", "fitzpatrick_scale": false, "category": "flags" };
const pirate_flag = { "keywords": ["skull", "crossbones", "flag", "banner"], "char": "\u{1F3F4}\u200D\u2620\uFE0F", "fitzpatrick_scale": false, "category": "flags" };
const require$$0 = {
  "100": { "keywords": ["score", "perfect", "numbers", "century", "exam", "quiz", "test", "pass", "hundred"], "char": "\u{1F4AF}", "fitzpatrick_scale": false, "category": "symbols" },
  "1234": { "keywords": ["numbers", "blue-square"], "char": "\u{1F522}", "fitzpatrick_scale": false, "category": "symbols" },
  grinning,
  grimacing,
  grin,
  joy,
  rofl,
  partying,
  smiley,
  smile,
  sweat_smile,
  laughing,
  innocent,
  wink,
  blush,
  slightly_smiling_face,
  upside_down_face,
  relaxed,
  yum,
  relieved,
  heart_eyes,
  smiling_face_with_three_hearts,
  kissing_heart,
  kissing,
  kissing_smiling_eyes,
  kissing_closed_eyes,
  stuck_out_tongue_winking_eye,
  zany,
  raised_eyebrow,
  monocle,
  stuck_out_tongue_closed_eyes,
  stuck_out_tongue,
  money_mouth_face,
  nerd_face,
  sunglasses,
  star_struck,
  clown_face,
  cowboy_hat_face,
  hugs,
  smirk,
  no_mouth,
  neutral_face,
  expressionless,
  unamused,
  roll_eyes,
  thinking,
  lying_face,
  hand_over_mouth,
  shushing,
  symbols_over_mouth,
  exploding_head,
  flushed,
  disappointed,
  worried,
  angry,
  rage,
  pensive,
  confused,
  slightly_frowning_face,
  frowning_face,
  persevere,
  confounded,
  tired_face,
  weary,
  pleading,
  triumph,
  open_mouth,
  scream,
  fearful,
  cold_sweat,
  hushed,
  frowning,
  anguished,
  cry,
  disappointed_relieved,
  drooling_face,
  sleepy,
  sweat,
  hot,
  cold,
  sob,
  dizzy_face,
  astonished,
  zipper_mouth_face,
  nauseated_face,
  sneezing_face,
  vomiting,
  mask,
  face_with_thermometer,
  face_with_head_bandage,
  woozy,
  sleeping,
  zzz,
  poop,
  smiling_imp,
  imp,
  japanese_ogre,
  japanese_goblin,
  skull,
  ghost,
  alien,
  robot,
  smiley_cat,
  smile_cat,
  joy_cat,
  heart_eyes_cat,
  smirk_cat,
  kissing_cat,
  scream_cat,
  crying_cat_face,
  pouting_cat,
  palms_up,
  raised_hands,
  clap,
  wave,
  call_me_hand,
  "+1": { "keywords": ["thumbsup", "yes", "awesome", "good", "agree", "accept", "cool", "hand", "like"], "char": "\u{1F44D}", "fitzpatrick_scale": true, "category": "people" },
  "-1": { "keywords": ["thumbsdown", "no", "dislike", "hand"], "char": "\u{1F44E}", "fitzpatrick_scale": true, "category": "people" },
  facepunch,
  fist,
  fist_left,
  fist_right,
  v,
  ok_hand,
  raised_hand,
  raised_back_of_hand,
  open_hands,
  muscle,
  pray,
  foot,
  leg,
  handshake,
  point_up,
  point_up_2,
  point_down,
  point_left,
  point_right,
  fu,
  raised_hand_with_fingers_splayed,
  love_you,
  metal,
  crossed_fingers,
  vulcan_salute,
  writing_hand,
  selfie,
  nail_care,
  lips,
  tooth,
  tongue,
  ear,
  nose,
  eye,
  eyes,
  brain,
  bust_in_silhouette,
  busts_in_silhouette,
  speaking_head,
  baby,
  child,
  boy,
  girl,
  adult,
  man,
  woman,
  blonde_woman,
  blonde_man,
  bearded_person,
  older_adult,
  older_man,
  older_woman,
  man_with_gua_pi_mao,
  woman_with_headscarf,
  woman_with_turban,
  man_with_turban,
  policewoman,
  policeman,
  construction_worker_woman,
  construction_worker_man,
  guardswoman,
  guardsman,
  female_detective,
  male_detective,
  woman_health_worker,
  man_health_worker,
  woman_farmer,
  man_farmer,
  woman_cook,
  man_cook,
  woman_student,
  man_student,
  woman_singer,
  man_singer,
  woman_teacher,
  man_teacher,
  woman_factory_worker,
  man_factory_worker,
  woman_technologist,
  man_technologist,
  woman_office_worker,
  man_office_worker,
  woman_mechanic,
  man_mechanic,
  woman_scientist,
  man_scientist,
  woman_artist,
  man_artist,
  woman_firefighter,
  man_firefighter,
  woman_pilot,
  man_pilot,
  woman_astronaut,
  man_astronaut,
  woman_judge,
  man_judge,
  woman_superhero,
  man_superhero,
  woman_supervillain,
  man_supervillain,
  mrs_claus,
  santa,
  sorceress,
  wizard,
  woman_elf,
  man_elf,
  woman_vampire,
  man_vampire,
  woman_zombie,
  man_zombie,
  woman_genie,
  man_genie,
  mermaid,
  merman,
  woman_fairy,
  man_fairy,
  angel,
  pregnant_woman,
  breastfeeding,
  princess,
  prince,
  bride_with_veil,
  man_in_tuxedo,
  running_woman,
  running_man,
  walking_woman,
  walking_man,
  dancer,
  man_dancing,
  dancing_women,
  dancing_men,
  couple,
  two_men_holding_hands,
  two_women_holding_hands,
  bowing_woman,
  bowing_man,
  man_facepalming,
  woman_facepalming,
  woman_shrugging,
  man_shrugging,
  tipping_hand_woman,
  tipping_hand_man,
  no_good_woman,
  no_good_man,
  ok_woman,
  ok_man,
  raising_hand_woman,
  raising_hand_man,
  pouting_woman,
  pouting_man,
  frowning_woman,
  frowning_man,
  haircut_woman,
  haircut_man,
  massage_woman,
  massage_man,
  woman_in_steamy_room,
  man_in_steamy_room,
  couple_with_heart_woman_man,
  couple_with_heart_woman_woman,
  couple_with_heart_man_man,
  couplekiss_man_woman,
  couplekiss_woman_woman,
  couplekiss_man_man,
  family_man_woman_boy,
  family_man_woman_girl,
  family_man_woman_girl_boy,
  family_man_woman_boy_boy,
  family_man_woman_girl_girl,
  family_woman_woman_boy,
  family_woman_woman_girl,
  family_woman_woman_girl_boy,
  family_woman_woman_boy_boy,
  family_woman_woman_girl_girl,
  family_man_man_boy,
  family_man_man_girl,
  family_man_man_girl_boy,
  family_man_man_boy_boy,
  family_man_man_girl_girl,
  family_woman_boy,
  family_woman_girl,
  family_woman_girl_boy,
  family_woman_boy_boy,
  family_woman_girl_girl,
  family_man_boy,
  family_man_girl,
  family_man_girl_boy,
  family_man_boy_boy,
  family_man_girl_girl,
  yarn,
  thread,
  coat,
  labcoat,
  womans_clothes,
  tshirt,
  jeans,
  necktie,
  dress,
  bikini,
  kimono,
  lipstick,
  kiss,
  footprints,
  flat_shoe,
  high_heel,
  sandal,
  boot,
  mans_shoe,
  athletic_shoe,
  hiking_boot,
  socks,
  gloves,
  scarf,
  womans_hat,
  tophat,
  billed_hat,
  rescue_worker_helmet,
  mortar_board,
  crown,
  school_satchel,
  luggage,
  pouch,
  purse,
  handbag,
  briefcase,
  eyeglasses,
  dark_sunglasses,
  goggles,
  ring,
  closed_umbrella,
  dog,
  cat,
  mouse,
  hamster,
  rabbit,
  fox_face,
  bear,
  panda_face,
  koala,
  tiger,
  lion,
  cow,
  pig,
  pig_nose,
  frog,
  squid,
  octopus,
  shrimp,
  monkey_face,
  gorilla,
  see_no_evil,
  hear_no_evil,
  speak_no_evil,
  monkey,
  chicken,
  penguin,
  bird,
  baby_chick,
  hatching_chick,
  hatched_chick,
  duck,
  eagle,
  owl,
  bat,
  wolf,
  boar,
  horse,
  unicorn,
  honeybee,
  bug,
  butterfly,
  snail,
  beetle,
  ant,
  grasshopper,
  spider,
  scorpion,
  crab,
  snake,
  lizard,
  "t-rex": { "keywords": ["animal", "nature", "dinosaur", "tyrannosaurus", "extinct"], "char": "\u{1F996}", "fitzpatrick_scale": false, "category": "animals_and_nature" },
  sauropod,
  turtle,
  tropical_fish,
  fish,
  blowfish,
  dolphin,
  shark,
  whale,
  whale2,
  crocodile,
  leopard,
  zebra,
  tiger2,
  water_buffalo,
  ox,
  cow2,
  deer,
  dromedary_camel,
  camel,
  giraffe,
  elephant,
  rhinoceros,
  goat,
  ram,
  sheep,
  racehorse,
  pig2,
  rat,
  mouse2,
  rooster,
  turkey,
  dove,
  dog2,
  poodle,
  cat2,
  rabbit2,
  chipmunk,
  hedgehog,
  raccoon,
  llama,
  hippopotamus,
  kangaroo,
  badger,
  swan,
  peacock,
  parrot,
  lobster,
  mosquito,
  paw_prints,
  dragon,
  dragon_face,
  cactus,
  christmas_tree,
  evergreen_tree,
  deciduous_tree,
  palm_tree,
  seedling,
  herb,
  shamrock,
  four_leaf_clover,
  bamboo,
  tanabata_tree,
  leaves,
  fallen_leaf,
  maple_leaf,
  ear_of_rice,
  hibiscus,
  sunflower,
  rose,
  wilted_flower,
  tulip,
  blossom,
  cherry_blossom,
  bouquet,
  mushroom,
  chestnut,
  jack_o_lantern,
  shell,
  spider_web,
  earth_americas,
  earth_africa,
  earth_asia,
  full_moon,
  waning_gibbous_moon,
  last_quarter_moon,
  waning_crescent_moon,
  new_moon,
  waxing_crescent_moon,
  first_quarter_moon,
  waxing_gibbous_moon,
  new_moon_with_face,
  full_moon_with_face,
  first_quarter_moon_with_face,
  last_quarter_moon_with_face,
  sun_with_face,
  crescent_moon,
  star,
  star2,
  dizzy,
  sparkles,
  comet,
  sunny,
  sun_behind_small_cloud,
  partly_sunny,
  sun_behind_large_cloud,
  sun_behind_rain_cloud,
  cloud,
  cloud_with_rain,
  cloud_with_lightning_and_rain,
  cloud_with_lightning,
  zap,
  fire,
  boom,
  snowflake,
  cloud_with_snow,
  snowman,
  snowman_with_snow,
  wind_face,
  dash,
  tornado,
  fog,
  open_umbrella,
  umbrella,
  droplet,
  sweat_drops,
  ocean,
  green_apple,
  apple,
  pear,
  tangerine,
  lemon,
  banana,
  watermelon,
  grapes,
  strawberry,
  melon,
  cherries,
  peach,
  pineapple,
  coconut,
  kiwi_fruit,
  mango,
  avocado,
  broccoli,
  tomato,
  eggplant,
  cucumber,
  carrot,
  hot_pepper,
  potato,
  corn,
  leafy_greens,
  sweet_potato,
  peanuts,
  honey_pot,
  croissant,
  bread,
  baguette_bread,
  bagel,
  pretzel,
  cheese,
  egg,
  bacon,
  steak,
  pancakes,
  poultry_leg,
  meat_on_bone,
  bone,
  fried_shrimp,
  fried_egg,
  hamburger,
  fries,
  stuffed_flatbread,
  hotdog,
  pizza,
  sandwich,
  canned_food,
  spaghetti,
  taco,
  burrito,
  green_salad,
  shallow_pan_of_food,
  ramen,
  stew,
  fish_cake,
  fortune_cookie,
  sushi,
  bento,
  curry,
  rice_ball,
  rice,
  rice_cracker,
  oden,
  dango,
  shaved_ice,
  ice_cream,
  icecream,
  pie,
  cake,
  cupcake,
  moon_cake,
  birthday,
  custard,
  candy,
  lollipop,
  chocolate_bar,
  popcorn,
  dumpling,
  doughnut,
  cookie,
  milk_glass,
  beer,
  beers,
  clinking_glasses,
  wine_glass,
  tumbler_glass,
  cocktail,
  tropical_drink,
  champagne,
  sake,
  tea,
  cup_with_straw,
  coffee,
  baby_bottle,
  salt,
  spoon,
  fork_and_knife,
  plate_with_cutlery,
  bowl_with_spoon,
  takeout_box,
  chopsticks,
  soccer,
  basketball,
  football,
  baseball,
  softball,
  tennis,
  volleyball,
  rugby_football,
  flying_disc,
  "8ball": { "keywords": ["pool", "hobby", "game", "luck", "magic"], "char": "\u{1F3B1}", "fitzpatrick_scale": false, "category": "activity" },
  golf,
  golfing_woman,
  golfing_man,
  ping_pong,
  badminton,
  goal_net,
  ice_hockey,
  field_hockey,
  lacrosse,
  cricket,
  ski,
  skier,
  snowboarder,
  person_fencing,
  women_wrestling,
  men_wrestling,
  woman_cartwheeling,
  man_cartwheeling,
  woman_playing_handball,
  man_playing_handball,
  ice_skate,
  curling_stone,
  skateboard,
  sled,
  bow_and_arrow,
  fishing_pole_and_fish,
  boxing_glove,
  martial_arts_uniform,
  rowing_woman,
  rowing_man,
  climbing_woman,
  climbing_man,
  swimming_woman,
  swimming_man,
  woman_playing_water_polo,
  man_playing_water_polo,
  woman_in_lotus_position,
  man_in_lotus_position,
  surfing_woman,
  surfing_man,
  bath,
  basketball_woman,
  basketball_man,
  weight_lifting_woman,
  weight_lifting_man,
  biking_woman,
  biking_man,
  mountain_biking_woman,
  mountain_biking_man,
  horse_racing,
  business_suit_levitating,
  trophy,
  running_shirt_with_sash,
  medal_sports,
  medal_military,
  "1st_place_medal": { "keywords": ["award", "winning", "first"], "char": "\u{1F947}", "fitzpatrick_scale": false, "category": "activity" },
  "2nd_place_medal": { "keywords": ["award", "second"], "char": "\u{1F948}", "fitzpatrick_scale": false, "category": "activity" },
  "3rd_place_medal": { "keywords": ["award", "third"], "char": "\u{1F949}", "fitzpatrick_scale": false, "category": "activity" },
  reminder_ribbon,
  rosette,
  ticket,
  tickets,
  performing_arts,
  art,
  circus_tent,
  woman_juggling,
  man_juggling,
  microphone,
  headphones,
  musical_score,
  musical_keyboard,
  drum,
  saxophone,
  trumpet,
  guitar,
  violin,
  clapper,
  video_game,
  space_invader,
  dart,
  game_die,
  chess_pawn,
  slot_machine,
  jigsaw,
  bowling,
  red_car,
  taxi,
  blue_car,
  bus,
  trolleybus,
  racing_car,
  police_car,
  ambulance,
  fire_engine,
  minibus,
  truck,
  articulated_lorry,
  tractor,
  kick_scooter,
  motorcycle,
  bike,
  motor_scooter,
  rotating_light,
  oncoming_police_car,
  oncoming_bus,
  oncoming_automobile,
  oncoming_taxi,
  aerial_tramway,
  mountain_cableway,
  suspension_railway,
  railway_car,
  train,
  monorail,
  bullettrain_side,
  bullettrain_front,
  light_rail,
  mountain_railway,
  steam_locomotive,
  train2,
  metro,
  tram,
  station,
  flying_saucer,
  helicopter,
  small_airplane,
  airplane,
  flight_departure,
  flight_arrival,
  sailboat,
  motor_boat,
  speedboat,
  ferry,
  passenger_ship,
  rocket,
  artificial_satellite,
  seat,
  canoe,
  anchor,
  construction,
  fuelpump,
  busstop,
  vertical_traffic_light,
  traffic_light,
  checkered_flag,
  ship,
  ferris_wheel,
  roller_coaster,
  carousel_horse,
  building_construction,
  foggy,
  tokyo_tower,
  factory,
  fountain,
  rice_scene,
  mountain,
  mountain_snow,
  mount_fuji,
  volcano,
  japan,
  camping,
  tent,
  national_park,
  motorway,
  railway_track,
  sunrise,
  sunrise_over_mountains,
  desert,
  beach_umbrella,
  desert_island,
  city_sunrise,
  city_sunset,
  cityscape,
  night_with_stars,
  bridge_at_night,
  milky_way,
  stars,
  sparkler,
  fireworks,
  rainbow,
  houses,
  european_castle,
  japanese_castle,
  stadium,
  statue_of_liberty,
  house,
  house_with_garden,
  derelict_house,
  office,
  department_store,
  post_office,
  european_post_office,
  hospital,
  bank,
  hotel,
  convenience_store,
  school,
  love_hotel,
  wedding,
  classical_building,
  church,
  mosque,
  synagogue,
  kaaba,
  shinto_shrine,
  watch,
  iphone,
  calling,
  computer,
  keyboard,
  desktop_computer,
  printer,
  computer_mouse,
  trackball,
  joystick,
  clamp,
  minidisc,
  floppy_disk,
  cd,
  dvd,
  vhs,
  camera,
  camera_flash,
  video_camera,
  movie_camera,
  film_projector,
  film_strip,
  telephone_receiver,
  phone,
  pager,
  fax,
  tv,
  radio,
  studio_microphone,
  level_slider,
  control_knobs,
  compass,
  stopwatch,
  timer_clock,
  alarm_clock,
  mantelpiece_clock,
  hourglass_flowing_sand,
  hourglass,
  satellite,
  battery,
  electric_plug,
  bulb,
  flashlight,
  candle,
  fire_extinguisher,
  wastebasket,
  oil_drum,
  money_with_wings,
  dollar,
  yen,
  euro,
  pound,
  moneybag,
  credit_card,
  gem,
  balance_scale,
  toolbox,
  wrench,
  hammer,
  hammer_and_pick,
  hammer_and_wrench,
  pick,
  nut_and_bolt,
  gear,
  brick,
  chains,
  magnet,
  gun,
  bomb,
  firecracker,
  hocho,
  dagger,
  crossed_swords,
  shield,
  smoking,
  skull_and_crossbones,
  coffin,
  funeral_urn,
  amphora,
  crystal_ball,
  prayer_beads,
  nazar_amulet,
  barber,
  alembic,
  telescope,
  microscope,
  hole,
  pill,
  syringe,
  dna,
  microbe,
  petri_dish,
  test_tube,
  thermometer,
  broom,
  basket,
  toilet_paper,
  label,
  bookmark,
  toilet,
  shower,
  bathtub,
  soap,
  sponge,
  lotion_bottle,
  key,
  old_key,
  couch_and_lamp,
  sleeping_bed,
  bed,
  door,
  bellhop_bell,
  teddy_bear,
  framed_picture,
  world_map,
  parasol_on_ground,
  moyai,
  shopping,
  shopping_cart,
  balloon,
  flags,
  ribbon,
  gift,
  confetti_ball,
  tada,
  dolls,
  wind_chime,
  crossed_flags,
  izakaya_lantern,
  red_envelope,
  email,
  envelope_with_arrow,
  incoming_envelope,
  "e-mail": { "keywords": ["communication", "inbox"], "char": "\u{1F4E7}", "fitzpatrick_scale": false, "category": "objects" },
  love_letter,
  postbox,
  mailbox_closed,
  mailbox,
  mailbox_with_mail,
  mailbox_with_no_mail,
  "package": { "keywords": ["mail", "gift", "cardboard", "box", "moving"], "char": "\u{1F4E6}", "fitzpatrick_scale": false, "category": "objects" },
  postal_horn,
  inbox_tray,
  outbox_tray,
  scroll,
  page_with_curl,
  bookmark_tabs,
  receipt,
  bar_chart,
  chart_with_upwards_trend,
  chart_with_downwards_trend,
  page_facing_up,
  date,
  calendar,
  spiral_calendar,
  card_index,
  card_file_box,
  ballot_box,
  file_cabinet,
  clipboard,
  spiral_notepad,
  file_folder,
  open_file_folder,
  card_index_dividers,
  newspaper_roll,
  newspaper,
  notebook,
  closed_book,
  green_book,
  blue_book,
  orange_book,
  notebook_with_decorative_cover,
  ledger,
  books,
  open_book,
  safety_pin,
  link,
  paperclip,
  paperclips,
  scissors,
  triangular_ruler,
  straight_ruler,
  abacus,
  pushpin,
  round_pushpin,
  triangular_flag_on_post,
  white_flag,
  black_flag,
  rainbow_flag,
  closed_lock_with_key,
  lock,
  unlock,
  lock_with_ink_pen,
  pen,
  fountain_pen,
  black_nib,
  memo,
  pencil2,
  crayon,
  paintbrush,
  mag,
  mag_right,
  heart,
  orange_heart,
  yellow_heart,
  green_heart,
  blue_heart,
  purple_heart,
  black_heart,
  broken_heart,
  heavy_heart_exclamation,
  two_hearts,
  revolving_hearts,
  heartbeat,
  heartpulse,
  sparkling_heart,
  cupid,
  gift_heart,
  heart_decoration,
  peace_symbol,
  latin_cross,
  star_and_crescent,
  om,
  wheel_of_dharma,
  star_of_david,
  six_pointed_star,
  menorah,
  yin_yang,
  orthodox_cross,
  place_of_worship,
  ophiuchus,
  aries,
  taurus,
  gemini,
  cancer,
  leo,
  virgo,
  libra,
  scorpius,
  sagittarius,
  capricorn,
  aquarius,
  pisces,
  id,
  atom_symbol,
  u7a7a,
  u5272,
  radioactive,
  biohazard,
  mobile_phone_off,
  vibration_mode,
  u6709,
  u7121,
  u7533,
  u55b6,
  u6708,
  eight_pointed_black_star,
  vs,
  accept,
  white_flower,
  ideograph_advantage,
  secret,
  congratulations,
  u5408,
  u6e80,
  u7981,
  a,
  b,
  ab,
  cl,
  o2,
  sos,
  no_entry,
  name_badge,
  no_entry_sign,
  x,
  o,
  stop_sign,
  anger,
  hotsprings,
  no_pedestrians,
  do_not_litter,
  no_bicycles,
  "non-potable_water": { "keywords": ["drink", "faucet", "tap", "circle"], "char": "\u{1F6B1}", "fitzpatrick_scale": false, "category": "symbols" },
  underage,
  no_mobile_phones,
  exclamation,
  grey_exclamation,
  question,
  grey_question,
  bangbang,
  interrobang,
  low_brightness,
  high_brightness,
  trident,
  fleur_de_lis,
  part_alternation_mark,
  warning,
  children_crossing,
  beginner,
  recycle,
  u6307,
  chart,
  sparkle,
  eight_spoked_asterisk,
  negative_squared_cross_mark,
  white_check_mark,
  diamond_shape_with_a_dot_inside,
  cyclone,
  loop,
  globe_with_meridians,
  m,
  atm,
  sa,
  passport_control,
  customs,
  baggage_claim,
  left_luggage,
  wheelchair,
  no_smoking,
  wc,
  parking,
  potable_water,
  mens,
  womens,
  baby_symbol,
  restroom,
  put_litter_in_its_place,
  cinema,
  signal_strength,
  koko,
  ng,
  ok,
  up,
  cool,
  "new": { "keywords": ["blue-square", "words", "start"], "char": "\u{1F195}", "fitzpatrick_scale": false, "category": "symbols" },
  free,
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  keycap_ten,
  asterisk,
  eject_button,
  arrow_forward,
  pause_button,
  next_track_button,
  stop_button,
  record_button,
  play_or_pause_button,
  previous_track_button,
  fast_forward,
  rewind,
  twisted_rightwards_arrows,
  repeat,
  repeat_one,
  arrow_backward,
  arrow_up_small,
  arrow_down_small,
  arrow_double_up,
  arrow_double_down,
  arrow_right,
  arrow_left,
  arrow_up,
  arrow_down,
  arrow_upper_right,
  arrow_lower_right,
  arrow_lower_left,
  arrow_upper_left,
  arrow_up_down,
  left_right_arrow,
  arrows_counterclockwise,
  arrow_right_hook,
  leftwards_arrow_with_hook,
  arrow_heading_up,
  arrow_heading_down,
  hash,
  information_source,
  abc,
  abcd,
  capital_abcd,
  symbols,
  musical_note,
  notes,
  wavy_dash,
  curly_loop,
  heavy_check_mark,
  arrows_clockwise,
  heavy_plus_sign,
  heavy_minus_sign,
  heavy_division_sign,
  heavy_multiplication_x,
  infinity,
  heavy_dollar_sign,
  currency_exchange,
  copyright,
  registered,
  tm,
  end,
  back,
  on,
  top,
  soon,
  ballot_box_with_check,
  radio_button,
  white_circle,
  black_circle,
  red_circle,
  large_blue_circle,
  small_orange_diamond,
  small_blue_diamond,
  large_orange_diamond,
  large_blue_diamond,
  small_red_triangle,
  black_small_square,
  white_small_square,
  black_large_square,
  white_large_square,
  small_red_triangle_down,
  black_medium_square,
  white_medium_square,
  black_medium_small_square,
  white_medium_small_square,
  black_square_button,
  white_square_button,
  speaker,
  sound,
  loud_sound,
  mute,
  mega,
  loudspeaker,
  bell,
  no_bell,
  black_joker,
  mahjong,
  spades,
  clubs,
  hearts,
  diamonds,
  flower_playing_cards,
  thought_balloon,
  right_anger_bubble,
  speech_balloon,
  left_speech_bubble,
  clock1,
  clock2,
  clock3,
  clock4,
  clock5,
  clock6,
  clock7,
  clock8,
  clock9,
  clock10,
  clock11,
  clock12,
  clock130,
  clock230,
  clock330,
  clock430,
  clock530,
  clock630,
  clock730,
  clock830,
  clock930,
  clock1030,
  clock1130,
  clock1230,
  afghanistan,
  aland_islands,
  albania,
  algeria,
  american_samoa,
  andorra,
  angola,
  anguilla,
  antarctica,
  antigua_barbuda,
  argentina,
  armenia,
  aruba,
  australia,
  austria,
  azerbaijan,
  bahamas,
  bahrain,
  bangladesh,
  barbados,
  belarus,
  belgium,
  belize,
  benin,
  bermuda,
  bhutan,
  bolivia,
  caribbean_netherlands,
  bosnia_herzegovina,
  botswana,
  brazil,
  british_indian_ocean_territory,
  british_virgin_islands,
  brunei,
  bulgaria,
  burkina_faso,
  burundi,
  cape_verde,
  cambodia,
  cameroon,
  canada,
  canary_islands,
  cayman_islands,
  central_african_republic,
  chad,
  chile,
  cn,
  christmas_island,
  cocos_islands,
  colombia,
  comoros,
  congo_brazzaville,
  congo_kinshasa,
  cook_islands,
  costa_rica,
  croatia,
  cuba,
  curacao,
  cyprus,
  czech_republic,
  denmark,
  djibouti,
  dominica,
  dominican_republic,
  ecuador,
  egypt,
  el_salvador,
  equatorial_guinea,
  eritrea,
  estonia,
  ethiopia,
  eu,
  falkland_islands,
  faroe_islands,
  fiji,
  finland,
  fr,
  french_guiana,
  french_polynesia,
  french_southern_territories,
  gabon,
  gambia,
  georgia,
  de,
  ghana,
  gibraltar,
  greece,
  greenland,
  grenada,
  guadeloupe,
  guam,
  guatemala,
  guernsey,
  guinea,
  guinea_bissau,
  guyana,
  haiti,
  honduras,
  hong_kong,
  hungary,
  iceland,
  india,
  indonesia,
  iran,
  iraq,
  ireland,
  isle_of_man,
  israel,
  it,
  cote_divoire,
  jamaica,
  jp,
  jersey,
  jordan,
  kazakhstan,
  kenya,
  kiribati,
  kosovo,
  kuwait,
  kyrgyzstan,
  laos,
  latvia,
  lebanon,
  lesotho,
  liberia,
  libya,
  liechtenstein,
  lithuania,
  luxembourg,
  macau,
  macedonia,
  madagascar,
  malawi,
  malaysia,
  maldives,
  mali,
  malta,
  marshall_islands,
  martinique,
  mauritania,
  mauritius,
  mayotte,
  mexico,
  micronesia,
  moldova,
  monaco,
  mongolia,
  montenegro,
  montserrat,
  morocco,
  mozambique,
  myanmar,
  namibia,
  nauru,
  nepal,
  netherlands,
  new_caledonia,
  new_zealand,
  nicaragua,
  niger,
  nigeria,
  niue,
  norfolk_island,
  northern_mariana_islands,
  north_korea,
  norway,
  oman,
  pakistan,
  palau,
  palestinian_territories,
  panama,
  papua_new_guinea,
  paraguay,
  peru,
  philippines,
  pitcairn_islands,
  poland,
  portugal,
  puerto_rico,
  qatar,
  reunion,
  romania,
  ru,
  rwanda,
  st_barthelemy,
  st_helena,
  st_kitts_nevis,
  st_lucia,
  st_pierre_miquelon,
  st_vincent_grenadines,
  samoa,
  san_marino,
  sao_tome_principe,
  saudi_arabia,
  senegal,
  serbia,
  seychelles,
  sierra_leone,
  singapore,
  sint_maarten,
  slovakia,
  slovenia,
  solomon_islands,
  somalia,
  south_africa,
  south_georgia_south_sandwich_islands,
  kr,
  south_sudan,
  es,
  sri_lanka,
  sudan,
  suriname,
  swaziland,
  sweden,
  switzerland,
  syria,
  taiwan,
  tajikistan,
  tanzania,
  thailand,
  timor_leste,
  togo,
  tokelau,
  tonga,
  trinidad_tobago,
  tunisia,
  tr,
  turkmenistan,
  turks_caicos_islands,
  tuvalu,
  uganda,
  ukraine,
  united_arab_emirates,
  uk,
  england,
  scotland,
  wales,
  us,
  us_virgin_islands,
  uruguay,
  uzbekistan,
  vanuatu,
  vatican_city,
  venezuela,
  vietnam,
  wallis_futuna,
  western_sahara,
  yemen,
  zambia,
  zimbabwe,
  united_nations,
  pirate_flag
};
const require$$1 = /* @__PURE__ */ JSON.parse('["grinning","smiley","smile","grin","laughing","sweat_smile","joy","rofl","relaxed","blush","innocent","slightly_smiling_face","upside_down_face","wink","relieved","heart_eyes","smiling_face_with_three_hearts","kissing_heart","kissing","kissing_smiling_eyes","kissing_closed_eyes","yum","stuck_out_tongue","stuck_out_tongue_closed_eyes","stuck_out_tongue_winking_eye","zany","raised_eyebrow","monocle","nerd_face","sunglasses","star_struck","partying","smirk","unamused","disappointed","pensive","worried","confused","slightly_frowning_face","frowning_face","persevere","confounded","tired_face","weary","pleading","cry","sob","triumph","angry","rage","symbols_over_mouth","exploding_head","flushed","hot","cold","scream","fearful","cold_sweat","disappointed_relieved","sweat","hugs","thinking","hand_over_mouth","shushing","lying_face","no_mouth","neutral_face","expressionless","grimacing","roll_eyes","hushed","frowning","anguished","open_mouth","astonished","sleeping","drooling_face","sleepy","dizzy_face","zipper_mouth_face","woozy","nauseated_face","vomiting","sneezing_face","mask","face_with_thermometer","face_with_head_bandage","money_mouth_face","cowboy_hat_face","smiling_imp","imp","japanese_ogre","japanese_goblin","clown_face","poop","ghost","skull","skull_and_crossbones","alien","space_invader","robot","jack_o_lantern","smiley_cat","smile_cat","joy_cat","heart_eyes_cat","smirk_cat","kissing_cat","scream_cat","crying_cat_face","pouting_cat","palms_up","open_hands","raised_hands","clap","handshake","+1","-1","facepunch","fist","fist_left","fist_right","crossed_fingers","v","love_you","metal","ok_hand","point_left","point_right","point_up","point_down","point_up_2","raised_hand","raised_back_of_hand","raised_hand_with_fingers_splayed","vulcan_salute","wave","call_me_hand","muscle","fu","writing_hand","pray","foot","leg","ring","lipstick","kiss","lips","tooth","tongue","ear","nose","footprints","eye","eyes","brain","speaking_head","bust_in_silhouette","busts_in_silhouette","baby","girl","child","boy","woman","adult","man","blonde_woman","blonde_man","bearded_person","older_woman","older_adult","older_man","man_with_gua_pi_mao","woman_with_headscarf","woman_with_turban","man_with_turban","policewoman","policeman","construction_worker_woman","construction_worker_man","guardswoman","guardsman","female_detective","male_detective","woman_health_worker","man_health_worker","woman_farmer","man_farmer","woman_cook","man_cook","woman_student","man_student","woman_singer","man_singer","woman_teacher","man_teacher","woman_factory_worker","man_factory_worker","woman_technologist","man_technologist","woman_office_worker","man_office_worker","woman_mechanic","man_mechanic","woman_scientist","man_scientist","woman_artist","man_artist","woman_firefighter","man_firefighter","woman_pilot","man_pilot","woman_astronaut","man_astronaut","woman_judge","man_judge","bride_with_veil","man_in_tuxedo","princess","prince","woman_superhero","man_superhero","woman_supervillain","man_supervillain","mrs_claus","santa","sorceress","wizard","woman_elf","man_elf","woman_vampire","man_vampire","woman_zombie","man_zombie","woman_genie","man_genie","mermaid","merman","woman_fairy","man_fairy","angel","pregnant_woman","breastfeeding","bowing_woman","bowing_man","tipping_hand_woman","tipping_hand_man","no_good_woman","no_good_man","ok_woman","ok_man","raising_hand_woman","raising_hand_man","woman_facepalming","man_facepalming","woman_shrugging","man_shrugging","pouting_woman","pouting_man","frowning_woman","frowning_man","haircut_woman","haircut_man","massage_woman","massage_man","woman_in_steamy_room","man_in_steamy_room","nail_care","selfie","dancer","man_dancing","dancing_women","dancing_men","business_suit_levitating","walking_woman","walking_man","running_woman","running_man","couple","two_women_holding_hands","two_men_holding_hands","couple_with_heart_woman_man","couple_with_heart_woman_woman","couple_with_heart_man_man","couplekiss_man_woman","couplekiss_woman_woman","couplekiss_man_man","family_man_woman_boy","family_man_woman_girl","family_man_woman_girl_boy","family_man_woman_boy_boy","family_man_woman_girl_girl","family_woman_woman_boy","family_woman_woman_girl","family_woman_woman_girl_boy","family_woman_woman_boy_boy","family_woman_woman_girl_girl","family_man_man_boy","family_man_man_girl","family_man_man_girl_boy","family_man_man_boy_boy","family_man_man_girl_girl","family_woman_boy","family_woman_girl","family_woman_girl_boy","family_woman_boy_boy","family_woman_girl_girl","family_man_boy","family_man_girl","family_man_girl_boy","family_man_boy_boy","family_man_girl_girl","yarn","thread","coat","labcoat","womans_clothes","tshirt","jeans","necktie","dress","bikini","kimono","flat_shoe","high_heel","sandal","boot","mans_shoe","athletic_shoe","hiking_boot","socks","gloves","scarf","tophat","billed_hat","womans_hat","mortar_board","rescue_worker_helmet","crown","pouch","purse","handbag","briefcase","school_satchel","luggage","eyeglasses","dark_sunglasses","goggles","closed_umbrella","dog","cat","mouse","hamster","rabbit","fox_face","bear","panda_face","koala","tiger","lion","cow","pig","pig_nose","frog","monkey_face","see_no_evil","hear_no_evil","speak_no_evil","monkey","chicken","penguin","bird","baby_chick","hatching_chick","hatched_chick","duck","eagle","owl","bat","wolf","boar","horse","unicorn","honeybee","bug","butterfly","snail","shell","beetle","ant","mosquito","grasshopper","spider","spider_web","scorpion","turtle","snake","lizard","t-rex","sauropod","octopus","squid","shrimp","lobster","crab","blowfish","tropical_fish","fish","dolphin","whale","whale2","shark","crocodile","tiger2","leopard","zebra","gorilla","elephant","hippopotamus","rhinoceros","dromedary_camel","giraffe","kangaroo","camel","water_buffalo","ox","cow2","racehorse","pig2","ram","sheep","llama","goat","deer","dog2","poodle","cat2","rooster","turkey","peacock","parrot","swan","dove","rabbit2","raccoon","badger","rat","mouse2","chipmunk","hedgehog","paw_prints","dragon","dragon_face","cactus","christmas_tree","evergreen_tree","deciduous_tree","palm_tree","seedling","herb","shamrock","four_leaf_clover","bamboo","tanabata_tree","leaves","fallen_leaf","maple_leaf","ear_of_rice","hibiscus","sunflower","rose","wilted_flower","tulip","blossom","cherry_blossom","bouquet","mushroom","earth_americas","earth_africa","earth_asia","full_moon","waning_gibbous_moon","last_quarter_moon","waning_crescent_moon","new_moon","waxing_crescent_moon","first_quarter_moon","waxing_gibbous_moon","new_moon_with_face","full_moon_with_face","first_quarter_moon_with_face","last_quarter_moon_with_face","sun_with_face","crescent_moon","star","star2","dizzy","sparkles","comet","sunny","sun_behind_small_cloud","partly_sunny","sun_behind_large_cloud","sun_behind_rain_cloud","cloud","cloud_with_rain","cloud_with_lightning_and_rain","cloud_with_lightning","zap","fire","boom","snowflake","cloud_with_snow","snowman","snowman_with_snow","wind_face","dash","tornado","fog","open_umbrella","umbrella","droplet","sweat_drops","ocean","green_apple","apple","pear","tangerine","lemon","banana","watermelon","grapes","strawberry","melon","cherries","peach","mango","pineapple","coconut","kiwi_fruit","tomato","eggplant","avocado","broccoli","leafy_greens","cucumber","hot_pepper","corn","carrot","potato","sweet_potato","croissant","bagel","bread","baguette_bread","pretzel","cheese","egg","fried_egg","pancakes","bacon","steak","poultry_leg","meat_on_bone","bone","hotdog","hamburger","fries","pizza","sandwich","stuffed_flatbread","taco","burrito","green_salad","shallow_pan_of_food","canned_food","spaghetti","ramen","stew","curry","sushi","bento","fried_shrimp","rice_ball","rice","rice_cracker","fish_cake","fortune_cookie","moon_cake","oden","dango","shaved_ice","ice_cream","icecream","pie","cupcake","cake","birthday","custard","lollipop","candy","chocolate_bar","popcorn","doughnut","dumpling","cookie","chestnut","peanuts","honey_pot","milk_glass","baby_bottle","coffee","tea","cup_with_straw","sake","beer","beers","clinking_glasses","wine_glass","tumbler_glass","cocktail","tropical_drink","champagne","spoon","fork_and_knife","plate_with_cutlery","bowl_with_spoon","takeout_box","chopsticks","salt","soccer","basketball","football","baseball","softball","tennis","volleyball","rugby_football","flying_disc","8ball","golf","golfing_woman","golfing_man","ping_pong","badminton","goal_net","ice_hockey","field_hockey","lacrosse","cricket","ski","skier","snowboarder","person_fencing","women_wrestling","men_wrestling","woman_cartwheeling","man_cartwheeling","woman_playing_handball","man_playing_handball","ice_skate","curling_stone","skateboard","sled","bow_and_arrow","fishing_pole_and_fish","boxing_glove","martial_arts_uniform","rowing_woman","rowing_man","climbing_woman","climbing_man","swimming_woman","swimming_man","woman_playing_water_polo","man_playing_water_polo","woman_in_lotus_position","man_in_lotus_position","surfing_woman","surfing_man","basketball_woman","basketball_man","weight_lifting_woman","weight_lifting_man","biking_woman","biking_man","mountain_biking_woman","mountain_biking_man","horse_racing","trophy","running_shirt_with_sash","medal_sports","medal_military","1st_place_medal","2nd_place_medal","3rd_place_medal","reminder_ribbon","rosette","ticket","tickets","performing_arts","art","circus_tent","woman_juggling","man_juggling","microphone","headphones","musical_score","musical_keyboard","drum","saxophone","trumpet","guitar","violin","clapper","video_game","dart","game_die","chess_pawn","slot_machine","jigsaw","bowling","red_car","taxi","blue_car","bus","trolleybus","racing_car","police_car","ambulance","fire_engine","minibus","truck","articulated_lorry","tractor","kick_scooter","motorcycle","bike","motor_scooter","rotating_light","oncoming_police_car","oncoming_bus","oncoming_automobile","oncoming_taxi","aerial_tramway","mountain_cableway","suspension_railway","railway_car","train","monorail","bullettrain_side","bullettrain_front","light_rail","mountain_railway","steam_locomotive","train2","metro","tram","station","flying_saucer","helicopter","small_airplane","airplane","flight_departure","flight_arrival","sailboat","motor_boat","speedboat","ferry","passenger_ship","rocket","artificial_satellite","seat","canoe","anchor","construction","fuelpump","busstop","vertical_traffic_light","traffic_light","ship","ferris_wheel","roller_coaster","carousel_horse","building_construction","foggy","tokyo_tower","factory","fountain","rice_scene","mountain","mountain_snow","mount_fuji","volcano","japan","camping","tent","national_park","motorway","railway_track","sunrise","sunrise_over_mountains","desert","beach_umbrella","desert_island","city_sunrise","city_sunset","cityscape","night_with_stars","bridge_at_night","milky_way","stars","sparkler","fireworks","rainbow","houses","european_castle","japanese_castle","stadium","statue_of_liberty","house","house_with_garden","derelict_house","office","department_store","post_office","european_post_office","hospital","bank","hotel","convenience_store","school","love_hotel","wedding","classical_building","church","mosque","synagogue","kaaba","shinto_shrine","watch","iphone","calling","computer","keyboard","desktop_computer","printer","computer_mouse","trackball","joystick","clamp","minidisc","floppy_disk","cd","dvd","vhs","camera","camera_flash","video_camera","movie_camera","film_projector","film_strip","telephone_receiver","phone","pager","fax","tv","radio","studio_microphone","level_slider","control_knobs","compass","stopwatch","timer_clock","alarm_clock","mantelpiece_clock","hourglass_flowing_sand","hourglass","satellite","battery","electric_plug","bulb","flashlight","candle","fire_extinguisher","wastebasket","oil_drum","money_with_wings","dollar","yen","euro","pound","moneybag","credit_card","gem","balance_scale","toolbox","wrench","hammer","hammer_and_pick","hammer_and_wrench","pick","nut_and_bolt","gear","brick","chains","magnet","gun","bomb","firecracker","hocho","dagger","crossed_swords","shield","smoking","coffin","funeral_urn","amphora","crystal_ball","prayer_beads","nazar_amulet","barber","alembic","telescope","microscope","hole","pill","syringe","dna","microbe","petri_dish","test_tube","thermometer","broom","basket","toilet_paper","label","bookmark","toilet","shower","bathtub","bath","soap","sponge","lotion_bottle","key","old_key","couch_and_lamp","sleeping_bed","bed","door","bellhop_bell","teddy_bear","framed_picture","world_map","parasol_on_ground","moyai","shopping","shopping_cart","balloon","flags","ribbon","gift","confetti_ball","tada","dolls","wind_chime","crossed_flags","izakaya_lantern","red_envelope","email","envelope_with_arrow","incoming_envelope","e-mail","love_letter","postbox","mailbox_closed","mailbox","mailbox_with_mail","mailbox_with_no_mail","package","postal_horn","inbox_tray","outbox_tray","scroll","page_with_curl","bookmark_tabs","receipt","bar_chart","chart_with_upwards_trend","chart_with_downwards_trend","page_facing_up","date","calendar","spiral_calendar","card_index","card_file_box","ballot_box","file_cabinet","clipboard","spiral_notepad","file_folder","open_file_folder","card_index_dividers","newspaper_roll","newspaper","notebook","closed_book","green_book","blue_book","orange_book","notebook_with_decorative_cover","ledger","books","open_book","safety_pin","link","paperclip","paperclips","scissors","triangular_ruler","straight_ruler","abacus","pushpin","round_pushpin","closed_lock_with_key","lock","unlock","lock_with_ink_pen","pen","fountain_pen","black_nib","memo","pencil2","crayon","paintbrush","mag","mag_right","heart","orange_heart","yellow_heart","green_heart","blue_heart","purple_heart","black_heart","broken_heart","heavy_heart_exclamation","two_hearts","revolving_hearts","heartbeat","heartpulse","sparkling_heart","cupid","gift_heart","heart_decoration","peace_symbol","latin_cross","star_and_crescent","om","wheel_of_dharma","star_of_david","six_pointed_star","menorah","yin_yang","orthodox_cross","place_of_worship","ophiuchus","aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces","id","atom_symbol","u7a7a","u5272","radioactive","biohazard","mobile_phone_off","vibration_mode","u6709","u7121","u7533","u55b6","u6708","eight_pointed_black_star","vs","accept","white_flower","ideograph_advantage","secret","congratulations","u5408","u6e80","u7981","a","b","ab","cl","o2","sos","no_entry","name_badge","no_entry_sign","x","o","stop_sign","anger","hotsprings","no_pedestrians","do_not_litter","no_bicycles","non-potable_water","underage","no_mobile_phones","exclamation","grey_exclamation","question","grey_question","bangbang","interrobang","100","low_brightness","high_brightness","trident","fleur_de_lis","part_alternation_mark","warning","children_crossing","beginner","recycle","u6307","chart","sparkle","eight_spoked_asterisk","negative_squared_cross_mark","white_check_mark","diamond_shape_with_a_dot_inside","cyclone","loop","globe_with_meridians","m","atm","zzz","sa","passport_control","customs","baggage_claim","left_luggage","wheelchair","no_smoking","wc","parking","potable_water","mens","womens","baby_symbol","restroom","put_litter_in_its_place","cinema","signal_strength","koko","ng","ok","up","cool","new","free","zero","one","two","three","four","five","six","seven","eight","nine","keycap_ten","asterisk","1234","eject_button","arrow_forward","pause_button","next_track_button","stop_button","record_button","play_or_pause_button","previous_track_button","fast_forward","rewind","twisted_rightwards_arrows","repeat","repeat_one","arrow_backward","arrow_up_small","arrow_down_small","arrow_double_up","arrow_double_down","arrow_right","arrow_left","arrow_up","arrow_down","arrow_upper_right","arrow_lower_right","arrow_lower_left","arrow_upper_left","arrow_up_down","left_right_arrow","arrows_counterclockwise","arrow_right_hook","leftwards_arrow_with_hook","arrow_heading_up","arrow_heading_down","hash","information_source","abc","abcd","capital_abcd","symbols","musical_note","notes","wavy_dash","curly_loop","heavy_check_mark","arrows_clockwise","heavy_plus_sign","heavy_minus_sign","heavy_division_sign","heavy_multiplication_x","infinity","heavy_dollar_sign","currency_exchange","copyright","registered","tm","end","back","on","top","soon","ballot_box_with_check","radio_button","white_circle","black_circle","red_circle","large_blue_circle","small_orange_diamond","small_blue_diamond","large_orange_diamond","large_blue_diamond","small_red_triangle","black_small_square","white_small_square","black_large_square","white_large_square","small_red_triangle_down","black_medium_square","white_medium_square","black_medium_small_square","white_medium_small_square","black_square_button","white_square_button","speaker","sound","loud_sound","mute","mega","loudspeaker","bell","no_bell","black_joker","mahjong","spades","clubs","hearts","diamonds","flower_playing_cards","thought_balloon","right_anger_bubble","speech_balloon","left_speech_bubble","clock1","clock2","clock3","clock4","clock5","clock6","clock7","clock8","clock9","clock10","clock11","clock12","clock130","clock230","clock330","clock430","clock530","clock630","clock730","clock830","clock930","clock1030","clock1130","clock1230","white_flag","black_flag","pirate_flag","checkered_flag","triangular_flag_on_post","rainbow_flag","united_nations","afghanistan","aland_islands","albania","algeria","american_samoa","andorra","angola","anguilla","antarctica","antigua_barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia","caribbean_netherlands","bosnia_herzegovina","botswana","brazil","british_indian_ocean_territory","british_virgin_islands","brunei","bulgaria","burkina_faso","burundi","cape_verde","cambodia","cameroon","canada","canary_islands","cayman_islands","central_african_republic","chad","chile","cn","christmas_island","cocos_islands","colombia","comoros","congo_brazzaville","congo_kinshasa","cook_islands","costa_rica","croatia","cuba","curacao","cyprus","czech_republic","denmark","djibouti","dominica","dominican_republic","ecuador","egypt","el_salvador","equatorial_guinea","eritrea","estonia","ethiopia","eu","falkland_islands","faroe_islands","fiji","finland","fr","french_guiana","french_polynesia","french_southern_territories","gabon","gambia","georgia","de","ghana","gibraltar","greece","greenland","grenada","guadeloupe","guam","guatemala","guernsey","guinea","guinea_bissau","guyana","haiti","honduras","hong_kong","hungary","iceland","india","indonesia","iran","iraq","ireland","isle_of_man","israel","it","cote_divoire","jamaica","jp","jersey","jordan","kazakhstan","kenya","kiribati","kosovo","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malawi","malaysia","maldives","mali","malta","marshall_islands","martinique","mauritania","mauritius","mayotte","mexico","micronesia","moldova","monaco","mongolia","montenegro","montserrat","morocco","mozambique","myanmar","namibia","nauru","nepal","netherlands","new_caledonia","new_zealand","nicaragua","niger","nigeria","niue","norfolk_island","northern_mariana_islands","north_korea","norway","oman","pakistan","palau","palestinian_territories","panama","papua_new_guinea","paraguay","peru","philippines","pitcairn_islands","poland","portugal","puerto_rico","qatar","reunion","romania","ru","rwanda","st_barthelemy","st_helena","st_kitts_nevis","st_lucia","st_pierre_miquelon","st_vincent_grenadines","samoa","san_marino","sao_tome_principe","saudi_arabia","senegal","serbia","seychelles","sierra_leone","singapore","sint_maarten","slovakia","slovenia","solomon_islands","somalia","south_africa","south_georgia_south_sandwich_islands","kr","south_sudan","es","sri_lanka","sudan","suriname","swaziland","sweden","switzerland","syria","taiwan","tajikistan","tanzania","thailand","timor_leste","togo","tokelau","tonga","trinidad_tobago","tunisia","tr","turkmenistan","turks_caicos_islands","tuvalu","uganda","ukraine","united_arab_emirates","uk","england","scotland","wales","us","us_virgin_islands","uruguay","uzbekistan","vanuatu","vatican_city","venezuela","vietnam","wallis_futuna","western_sahara","yemen","zambia","zimbabwe"]');
var emojilib$1;
var hasRequiredEmojilib;
function requireEmojilib() {
  if (hasRequiredEmojilib) return emojilib$1;
  hasRequiredEmojilib = 1;
  emojilib$1 = {
    lib: require$$0,
    ordered: require$$1,
    fitzpatrick_scale_modifiers: ["\u{1F3FB}", "\u{1F3FC}", "\u{1F3FD}", "\u{1F3FE}", "\u{1F3FF}"]
  };
  return emojilib$1;
}
var emojilibExports = requireEmojilib();
const emojilib = /* @__PURE__ */ getDefaultExportFromCjs(emojilibExports);
var charRegex$1;
var hasRequiredCharRegex;
function requireCharRegex() {
  if (hasRequiredCharRegex) return charRegex$1;
  hasRequiredCharRegex = 1;
  charRegex$1 = () => {
    const astralRange = "\\ud800-\\udfff";
    const comboMarksRange = "\\u0300-\\u036f";
    const comboHalfMarksRange = "\\ufe20-\\ufe2f";
    const comboSymbolsRange = "\\u20d0-\\u20ff";
    const comboMarksExtendedRange = "\\u1ab0-\\u1aff";
    const comboMarksSupplementRange = "\\u1dc0-\\u1dff";
    const comboRange = comboMarksRange + comboHalfMarksRange + comboSymbolsRange + comboMarksExtendedRange + comboMarksSupplementRange;
    const varRange = "\\ufe0e\\ufe0f";
    const familyRange = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93";
    const astral = `[${astralRange}]`;
    const combo = `[${comboRange}]`;
    const fitz = "\\ud83c[\\udffb-\\udfff]";
    const modifier = `(?:${combo}|${fitz})`;
    const nonAstral = `[^${astralRange}]`;
    const regional = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}";
    const surrogatePair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    const zwj = "\\u200d";
    const blackFlag = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)";
    const family = `[${familyRange}]`;
    const optModifier = `${modifier}?`;
    const optVar = `[${varRange}]?`;
    const optJoin = `(?:${zwj}(?:${[nonAstral, regional, surrogatePair].join("|")})${optVar + optModifier})*`;
    const seq = optVar + optModifier + optJoin;
    const nonAstralCombo = `${nonAstral}${combo}?`;
    const symbol = `(?:${[nonAstralCombo, combo, regional, surrogatePair, astral, family].join("|")})`;
    return new RegExp(`${blackFlag}|${fitz}(?=${fitz})|${symbol + seq}`, "g");
  };
  return charRegex$1;
}
var charRegexExports = requireCharRegex();
const charRegex = /* @__PURE__ */ getDefaultExportFromCjs(charRegexExports);
charRegex();
var NON_SPACING_MARK = String.fromCharCode(65039);
var nonSpacingRegex = new RegExp(NON_SPACING_MARK, "g");
function normalizeCode(code) {
  return code.replace(nonSpacingRegex, "");
}
function normalizeName(name) {
  return /:.+:/.test(name) ? name.slice(1, -1) : name;
}
var emojiData = Object.entries(emojilib.lib).map(
  ([name, { char: emoji }]) => [name, emoji]
);
var emojiCodesByName = new Map(emojiData);
new Map(
  emojiData.map(([name, emoji]) => [normalizeCode(emoji), name])
);
var get = (codeOrName) => {
  distExports.assert.string(codeOrName);
  return emojiCodesByName.get(normalizeName(codeOrName));
};
const emoticon = [
  {
    description: "angry face",
    emoji: "\u{1F620}",
    emoticons: [">:(", ">:[", ">:-(", ">:-[", ">=(", ">=[", ">=-(", ">=-["],
    name: "angry",
    tags: ["mad", "annoyed"]
  },
  {
    description: "smiling face with smiling eyes",
    emoji: "\u{1F60A}",
    emoticons: [
      ':")',
      ':"]',
      ':"D',
      ':-")',
      ':-"]',
      ':-"D',
      '=")',
      '="]',
      '="D',
      '=-")',
      '=-"]',
      '=-"D'
    ],
    name: "blush",
    tags: ["proud"]
  },
  {
    description: "broken heart",
    emoji: "\u{1F494}",
    emoticons: ["<\\3", "</3"],
    name: "broken_heart",
    tags: []
  },
  {
    description: "confused face",
    emoji: "\u{1F615}",
    emoticons: [":/", ":\\", ":-/", ":-\\", "=/", "=\\", "=-/", "=-\\"],
    name: "confused",
    tags: []
  },
  {
    description: "crying face",
    emoji: "\u{1F622}",
    emoticons: [
      ":,(",
      ":,[",
      ":,|",
      ":,-(",
      ":,-[",
      ":,-|",
      ":'(",
      ":'[",
      ":'|",
      ":'-(",
      ":'-[",
      ":'-|",
      "=,(",
      "=,[",
      "=,|",
      "=,-(",
      "=,-[",
      "=,-|",
      "='(",
      "='[",
      "='|",
      "='-(",
      "='-[",
      "='-|",
      "T-T"
    ],
    name: "cry",
    tags: ["sad", "tear"]
  },
  {
    description: "frowning face with open mouth",
    emoji: "\u{1F626}",
    emoticons: [":(", ":[", ":-(", ":-[", "=(", "=[", "=-(", "=-["],
    name: "frowning",
    tags: []
  },
  {
    description: "red heart",
    emoji: "\u2764\uFE0F",
    emoticons: ["<3"],
    name: "heart",
    tags: ["love"]
  },
  {
    description: "angry face with horns",
    emoji: "\u{1F47F}",
    emoticons: ["]:(", "]:[", "]:-(", "]:-[", "]=(", "]=[", "]=-(", "]=-["],
    name: "imp",
    tags: ["angry", "devil", "evil", "horns"]
  },
  {
    description: "smiling face with halo",
    emoji: "\u{1F607}",
    emoticons: [
      "o:)",
      "o:]",
      "o:D",
      "o:-)",
      "o:-]",
      "o:-D",
      "o=)",
      "o=]",
      "o=D",
      "o=-)",
      "o=-]",
      "o=-D",
      "O:)",
      "O:]",
      "O:D",
      "O:-)",
      "O:-]",
      "O:-D",
      "O=)",
      "O=]",
      "O=D",
      "O=-)",
      "O=-]",
      "O=-D",
      "0:)",
      "0:]",
      "0:D",
      "0:-)",
      "0:-]",
      "0:-D",
      "0=)",
      "0=]",
      "0=D",
      "0=-)",
      "0=-]",
      "0=-D"
    ],
    name: "innocent",
    tags: ["angel"]
  },
  {
    description: "face with tears of joy",
    emoji: "\u{1F602}",
    emoticons: [
      ":,)",
      ":,]",
      ":,D",
      ":,-)",
      ":,-]",
      ":,-D",
      ":')",
      ":']",
      ":'D",
      ":'-)",
      ":'-]",
      ":'-D",
      "=,)",
      "=,]",
      "=,D",
      "=,-)",
      "=,-]",
      "=,-D",
      "=')",
      "=']",
      "='D",
      "='-)",
      "='-]",
      "='-D"
    ],
    name: "joy",
    tags: ["tears"]
  },
  {
    description: "kissing face",
    emoji: "\u{1F617}",
    emoticons: [":*", ":-*", "=*", "=-*"],
    name: "kissing",
    tags: []
  },
  {
    description: "grinning squinting face",
    emoji: "\u{1F606}",
    emoticons: [
      "x)",
      "x]",
      "xD",
      "x-)",
      "x-]",
      "x-D",
      "X)",
      "X]",
      "X-)",
      "X-]",
      "X-D"
    ],
    name: "laughing",
    tags: ["happy", "haha"]
  },
  {
    description: "man",
    emoji: "\u{1F468}",
    emoticons: [
      ":3",
      ":-3",
      "=3",
      "=-3",
      ";3",
      ";-3",
      "x3",
      "x-3",
      "X3",
      "X-3"
    ],
    name: "man",
    tags: ["mustache", "father", "dad"]
  },
  {
    description: "neutral face",
    emoji: "\u{1F610}",
    emoticons: [":|", ":-|", "=|", "=-|"],
    name: "neutral_face",
    tags: ["meh"]
  },
  {
    description: "face without mouth",
    emoji: "\u{1F636}",
    emoticons: [":-"],
    name: "no_mouth",
    tags: ["mute", "silence"]
  },
  {
    description: "face with open mouth",
    emoji: "\u{1F62E}",
    emoticons: [
      ":o",
      ":O",
      ":0",
      ":-o",
      ":-O",
      ":-0",
      "=o",
      "=O",
      "=0",
      "=-o",
      "=-O",
      "=-0"
    ],
    name: "open_mouth",
    tags: ["surprise", "impressed", "wow"]
  },
  {
    description: "enraged face",
    emoji: "\u{1F621}",
    emoticons: [":@", ":-@", "=@", "=-@"],
    name: "rage",
    tags: ["angry"]
  },
  {
    description: "grinning face with smiling eyes",
    emoji: "\u{1F604}",
    emoticons: [":D", ":-D", "=D", "=-D"],
    name: "smile",
    tags: ["happy", "joy", "laugh", "pleased"]
  },
  {
    description: "grinning face with big eyes",
    emoji: "\u{1F603}",
    emoticons: [":)", ":]", ":-)", ":-]", "=)", "=]", "=-)", "=-]"],
    name: "smiley",
    tags: ["happy", "joy", "haha"]
  },
  {
    description: "smiling face with horns",
    emoji: "\u{1F608}",
    emoticons: [
      "]:)",
      "]:]",
      "]:D",
      "]:-)",
      "]:-]",
      "]:-D",
      "]=)",
      "]=]",
      "]=D",
      "]=-)",
      "]=-]",
      "]=-D"
    ],
    name: "smiling_imp",
    tags: ["devil", "evil", "horns"]
  },
  {
    description: "loudly crying face",
    emoji: "\u{1F62D}",
    emoticons: [
      ":,'(",
      ":,'[",
      ":,'-(",
      ":,'-[",
      ":',(",
      ":',[",
      ":',-(",
      ":',-[",
      "=,'(",
      "=,'[",
      "=,'-(",
      "=,'-[",
      "=',(",
      "=',[",
      "=',-(",
      "=',-["
    ],
    name: "sob",
    tags: ["sad", "cry", "bawling"]
  },
  {
    description: "face with tongue",
    emoji: "\u{1F61B}",
    emoticons: [
      ":p",
      ":P",
      ":d",
      ":-p",
      ":-P",
      ":-d",
      "=p",
      "=P",
      "=d",
      "=-p",
      "=-P",
      "=-d"
    ],
    name: "stuck_out_tongue",
    tags: []
  },
  {
    description: "squinting face with tongue",
    emoji: "\u{1F61D}",
    emoticons: ["xP", "x-p", "x-P", "x-d", "Xp", "Xd", "X-p", "X-P", "X-d"],
    name: "stuck_out_tongue_closed_eyes",
    tags: ["prank"]
  },
  {
    description: "winking face with tongue",
    emoji: "\u{1F61C}",
    emoticons: [";p", ";P", ";d", ";-p", ";-P", ";-d"],
    name: "stuck_out_tongue_winking_eye",
    tags: ["prank", "silly"]
  },
  {
    description: "smiling face with sunglasses",
    emoji: "\u{1F60E}",
    emoticons: [
      "8)",
      "8]",
      "8D",
      "8-)",
      "8-]",
      "8-D",
      "B)",
      "B]",
      "B-)",
      "B-]",
      "B-D"
    ],
    name: "sunglasses",
    tags: ["cool"]
  },
  {
    description: "downcast face with sweat",
    emoji: "\u{1F613}",
    emoticons: [
      ",:(",
      ",:[",
      ",:-(",
      ",:-[",
      ",=(",
      ",=[",
      ",=-(",
      ",=-[",
      "':(",
      "':[",
      "':-(",
      "':-[",
      "'=(",
      "'=[",
      "'=-(",
      "'=-["
    ],
    name: "sweat",
    tags: []
  },
  {
    description: "grinning face with sweat",
    emoji: "\u{1F605}",
    emoticons: [
      ",:)",
      ",:]",
      ",:D",
      ",:-)",
      ",:-]",
      ",:-D",
      ",=)",
      ",=]",
      ",=D",
      ",=-)",
      ",=-]",
      ",=-D",
      "':)",
      "':]",
      "':D",
      "':-)",
      "':-]",
      "':-D",
      "'=)",
      "'=]",
      "'=D",
      "'=-)",
      "'=-]",
      "'=-D"
    ],
    name: "sweat_smile",
    tags: ["hot"]
  },
  {
    description: "unamused face",
    emoji: "\u{1F612}",
    emoticons: [
      ":$",
      ":s",
      ":z",
      ":S",
      ":Z",
      ":-$",
      ":-s",
      ":-z",
      ":-S",
      ":-Z",
      "=$",
      "=s",
      "=z",
      "=S",
      "=Z",
      "=-$",
      "=-s",
      "=-z",
      "=-S",
      "=-Z"
    ],
    name: "unamused",
    tags: ["meh"]
  },
  {
    description: "winking face",
    emoji: "\u{1F609}",
    emoticons: [";)", ";]", ";D", ";-)", ";-]", ";-D"],
    name: "wink",
    tags: ["flirt"]
  }
];
const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;
const RE_SHORT = /[$@|*'",;.=:\-)([\]\\/<>038BOopPsSdDxXzZ]{2,5}/g;
const RE_PUNCT = /(?:_|-(?!1))/g;
const DEFAULT_SETTINGS = {
  padSpaceAfter: false,
  emoticon: false,
  accessible: false
};
const plugin = (options) => {
  const settings = Object.assign({}, DEFAULT_SETTINGS, options);
  const pad = !!settings.padSpaceAfter;
  const emoticonEnable = !!settings.emoticon;
  const accessible = !!settings.accessible;
  function aria(text, label2) {
    return {
      type: "text",
      value: text,
      data: {
        hName: "span",
        hProperties: {
          role: "img",
          ariaLabel: label2
        },
        hChildren: [{ type: "text", value: text }]
      }
    };
  }
  function replaceEmoticon(match) {
    const iconFull = emoticon.find((e) => e.emoticons.includes(match));
    const iconPart = emoticon.find((e) => e.emoticons.includes(match.slice(0, -1)));
    const icon = iconFull || iconPart;
    if (!icon) {
      return false;
    }
    const trimmedChar = !iconFull && iconPart ? match.slice(-1) : "";
    const addPad = pad ? " " : "";
    const replaced = icon.emoji + addPad + trimmedChar;
    if (accessible) {
      return aria(replaced, icon.name + " emoticon");
    }
    return replaced;
  }
  function replaceEmoji(match) {
    let got = get(match);
    if (typeof got === "undefined") {
      return false;
    }
    if (pad) {
      got = got + " ";
    }
    if (accessible) {
      const label2 = match.slice(1, -1).replace(RE_PUNCT, " ") + " emoji";
      return aria(got, label2);
    }
    return got;
  }
  const replacers = [[RE_EMOJI, replaceEmoji]];
  if (emoticonEnable) {
    replacers.push([RE_SHORT, replaceEmoticon]);
  }
  function transformer(tree) {
    findAndReplace(tree, replacers);
  }
  return transformer;
};
function rehypeHighlight$1(opts) {
  const options = opts;
  return async (tree) => {
    const tasks = [];
    const styles = [];
    visit$1(
      tree,
      (_node) => {
        var _a, _b, _c;
        const node = _node;
        if (!["pre", "code"].includes(node.tagName)) {
          return false;
        }
        const hasHighlightableLanguage = ((_a = node.properties) == null ? void 0 : _a.language) !== void 0 && ((_b = node.properties) == null ? void 0 : _b.language) !== "text";
        const hasHighlightableLines = Boolean((_c = node.properties) == null ? void 0 : _c.highlights);
        return hasHighlightableLanguage || hasHighlightableLines;
      },
      (node) => {
        const _node = node;
        const highlights = typeof _node.properties.highlights === "string" ? _node.properties.highlights.split(/[,\s]+/).map(Number) : Array.isArray(_node.properties.highlights) ? _node.properties.highlights.map(Number) : [];
        const task = options.highlighter(
          toString(node),
          _node.properties.language,
          options.theme,
          {
            highlights: highlights.filter(Boolean),
            meta: _node.properties.meta
          }
        ).then(({ tree: tree2, className, style, inlineStyle }) => {
          var _a;
          _node.properties.className = ((_node.properties.className || "") + " " + className).trim();
          _node.properties.style = ((_node.properties.style || "") + " " + inlineStyle).trim();
          if (((_a = _node.children[0]) == null ? void 0 : _a.tagName) === "code") {
            _node.children[0].children = tree2;
          } else {
            _node.children = tree2[0].children || tree2;
          }
          if (style)
            styles.push(style);
        });
        tasks.push(task);
      }
    );
    if (tasks.length) {
      await Promise.all(tasks);
      tree.children.push({
        type: "element",
        tagName: "style",
        children: [{ type: "text", value: cleanCSS(styles.join("")) }],
        properties: {}
      });
    }
  };
}
const cleanCSS = (css) => {
  const styles = css.split("}").filter((s) => Boolean(s.trim())).map((s) => s.trim() + "}");
  return Array.from(new Set(styles)).join("");
};
const defaults = {
  theme: {},
  async highlighter(code, lang, theme, options) {
    try {
      if (false) ;
      return await $fetch("/api/_mdc/highlight", {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          options: JSON.stringify(options)
        }
      });
    } catch (e) {
    }
    return Promise.resolve({ tree: [{ type: "text", value: code }], className: "", style: "" });
  }
};
function rehypeHighlight(opts = {}) {
  const options = { ...defaults, ...opts };
  if (typeof options.highlighter !== "function") {
    options.highlighter = defaults.highlighter;
  }
  return rehypeHighlight$1(options);
}
const remarkPlugins = {
  "remark-emoji": { instance: plugin }
};
const rehypePlugins = {
  "highlight": { instance: rehypeHighlight, options: {} }
};
const highlight = { "theme": "monokai" };

export { highlight, rehypePlugins, remarkPlugins };
//# sourceMappingURL=mdc-imports-fZGs1Pv0.mjs.map
