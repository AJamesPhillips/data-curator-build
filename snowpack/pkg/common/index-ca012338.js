import { g as global } from './_polyfill-node:global-acbc543a.js';

function hasResourceInfo(resource) {
  const potentialResourceInfo = resource;
  return typeof potentialResourceInfo === "object" && typeof potentialResourceInfo.internal_resourceInfo === "object";
}
function hasServerResourceInfo(resource) {
  const potentialResourceInfo = resource;
  return typeof potentialResourceInfo === "object" && typeof potentialResourceInfo.internal_resourceInfo === "object" && typeof potentialResourceInfo.internal_resourceInfo.linkedResources === "object";
}
function hasChangelog(dataset) {
  const potentialChangeLog = dataset;
  return typeof potentialChangeLog.internal_changeLog === "object" && Array.isArray(potentialChangeLog.internal_changeLog.additions) && Array.isArray(potentialChangeLog.internal_changeLog.deletions);
}
class SolidClientError extends Error {
}

function internal_toIriString(iri) {
  return typeof iri === "string" ? iri : iri.value;
}

const fetch = async (resource, init) => {
  if (typeof window === "object" && typeof require !== "function") {
    return await window.fetch(resource, init);
  }
  if (typeof require !== "function") {
    const crossFetchModule = await import('./browser-ponyfill-be24bd47.js').then(function (n) { return n.c; });
    const fetch3 = crossFetchModule.default;
    return fetch3(resource, init);
  }
  let fetch2;
  fetch2 = require("cross-fetch");
  return await fetch2(resource, init);
};

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var _polyfillNode_buffer = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Buffer: Buffer,
  INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
  SlowBuffer: SlowBuffer,
  isBuffer: isBuffer,
  kMaxLength: _kMaxLength
});

var COMPATIBLE_ENCODING_PATTERN = /^utf-?8|ascii|utf-?16-?le|ucs-?2|base-?64|latin-?1$/i;
var WS_TRIM_PATTERN = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
var WS_CHAR_PATTERN = /\s|\uFEFF|\xA0/;
var WS_FOLD_PATTERN = /\r?\n[\x20\x09]+/g;
var DELIMITER_PATTERN = /[;,"]/;
var WS_DELIMITER_PATTERN = /[;,"]|\s/;

/**
 * Token character pattern
 * @type {RegExp}
 * @see https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
var TOKEN_PATTERN = /^[!#$%&'*+\-\.^_`|~\da-zA-Z]+$/;

var STATE = {
  IDLE: 1 << 0,
  URI: 1 << 1,
  ATTR: 1 << 2,
};

function trim( value ) {
  return value.replace( WS_TRIM_PATTERN, '' )
}

function hasWhitespace( value ) {
  return WS_CHAR_PATTERN.test( value )
}

function skipWhitespace( value, offset ) {
  while( hasWhitespace( value[offset] ) ) {
    offset++;
  }
  return offset
}

function needsQuotes( value ) {
  return WS_DELIMITER_PATTERN.test( value ) ||
    !TOKEN_PATTERN.test( value )
}

class Link {

  /**
   * Link
   * @constructor
   * @param {String} [value]
   * @returns {Link}
   */
  constructor( value ) {

    /** @type {Array} URI references */
    this.refs = [];

    if( value ) {
      this.parse( value );
    }

  }

  /**
   * Get refs with given relation type
   * @param {String} value
   * @returns {Array<Object>}
   */
  rel( value ) {

    var links = [];
    var type = value.toLowerCase();

    for( var i = 0; i < this.refs.length; i++ ) {
      if( this.refs[ i ].rel.toLowerCase() === type ) {
        links.push( this.refs[ i ] );
      }
    }

    return links

  }

  /**
   * Get refs where given attribute has a given value
   * @param {String} attr
   * @param {String} value
   * @returns {Array<Object>}
   */
  get( attr, value ) {

    attr = attr.toLowerCase();

    var links = [];

    for( var i = 0; i < this.refs.length; i++ ) {
      if( this.refs[ i ][ attr ] === value ) {
        links.push( this.refs[ i ] );
      }
    }

    return links

  }

  set( link ) {
    this.refs.push( link );
    return this
  }

  has( attr, value ) {

    attr = attr.toLowerCase();

    for( var i = 0; i < this.refs.length; i++ ) {
      if( this.refs[ i ][ attr ] === value ) {
        return true
      }
    }

    return false

  }

  parse( value, offset ) {

    offset = offset || 0;
    value = offset ? value.slice( offset ) : value;

    // Trim & unfold folded lines
    value = trim( value ).replace( WS_FOLD_PATTERN, '' );

    var state = STATE.IDLE;
    var length = value.length;
    var offset = 0;
    var ref = null;

    while( offset < length ) {
      if( state === STATE.IDLE ) {
        if( hasWhitespace( value[offset] ) ) {
          offset++;
          continue
        } else if( value[offset] === '<' ) {
          if( ref != null ) {
            ref.rel != null ?
              this.refs.push( ...Link.expandRelations( ref ) ) :
              this.refs.push( ref );
          }
          var end = value.indexOf( '>', offset );
          if( end === -1 ) throw new Error( 'Expected end of URI delimiter at offset ' + offset )
          ref = { uri: value.slice( offset + 1, end ) };
          // this.refs.push( ref )
          offset = end;
          state = STATE.URI;
        } else {
          throw new Error( 'Unexpected character "' + value[offset] + '" at offset ' + offset )
        }
        offset++;
      } else if( state === STATE.URI ) {
        if( hasWhitespace( value[offset] ) ) {
          offset++;
          continue
        } else if( value[offset] === ';' ) {
          state = STATE.ATTR;
          offset++;
        } else if( value[offset] === ',' ) {
          state = STATE.IDLE;
          offset++;
        } else {
          throw new Error( 'Unexpected character "' + value[offset] + '" at offset ' + offset )
        }
      } else if( state === STATE.ATTR ) {
        if( value[offset] ===';' || hasWhitespace( value[offset] ) ) {
          offset++;
          continue
        }
        var end = value.indexOf( '=', offset );
        if( end === -1 ) throw new Error( 'Expected attribute delimiter at offset ' + offset )
        var attr = trim( value.slice( offset, end ) ).toLowerCase();
        var attrValue = '';
        offset = end + 1;
        offset = skipWhitespace( value, offset );
        if( value[offset] === '"' ) {
          offset++;
          while( offset < length ) {
            if( value[offset] === '"' ) {
              offset++; break
            }
            if( value[offset] === '\\' ) {
              offset++;
            }
            attrValue += value[offset];
            offset++;
          }
        } else {
          var end = offset + 1;
          while( !DELIMITER_PATTERN.test( value[end] ) && end < length ) {
            end++;
          }
          attrValue = value.slice( offset, end );
          offset = end;
        }
        if( ref[ attr ] && Link.isSingleOccurenceAttr( attr ) ) ; else if( attr[ attr.length - 1 ] === '*' ) {
          ref[ attr ] = Link.parseExtendedValue( attrValue );
        } else {
          attrValue = attr === 'type' ?
            attrValue.toLowerCase() : attrValue;
          if( ref[ attr ] != null ) {
            if( Array.isArray( ref[ attr ] ) ) {
              ref[ attr ].push( attrValue );
            } else {
              ref[ attr ] = [ ref[ attr ], attrValue ];
            }
          } else {
            ref[ attr ] = attrValue;
          }
        }
        switch( value[offset] ) {
          case ',': state = STATE.IDLE; break
          case ';': state = STATE.ATTR; break
        }
        offset++;
      } else {
        throw new Error( 'Unknown parser state "' + state + '"' )
      }
    }

    if( ref != null ) {
      ref.rel != null ?
        this.refs.push( ...Link.expandRelations( ref ) ) :
        this.refs.push( ref );
    }

    ref = null;

    return this

  }

  toString() {

    var refs = [];
    var link = '';
    var ref = null;

    for( var i = 0; i < this.refs.length; i++ ) {
      ref = this.refs[i];
      link = Object.keys( this.refs[i] ).reduce( function( link, attr ) {
        if( attr === 'uri' ) return link
        return link + '; ' + Link.formatAttribute( attr, ref[ attr ] )
      }, '<' + ref.uri + '>' );
      refs.push( link );
    }

    return refs.join( ', ' )

  }

}

/**
 * Determines whether an encoding can be
 * natively handled with a `Buffer`
 * @param {String} value
 * @returns {Boolean}
 */
Link.isCompatibleEncoding = function( value ) {
  return COMPATIBLE_ENCODING_PATTERN.test( value )
};

Link.parse = function( value, offset ) {
  return new Link().parse( value, offset )
};

Link.isSingleOccurenceAttr = function( attr ) {
  return attr === 'rel' || attr === 'type' || attr === 'media' ||
    attr === 'title' || attr === 'title*'
};

Link.isTokenAttr = function( attr ) {
  return attr === 'rel' || attr === 'type' || attr === 'anchor'
};

Link.escapeQuotes = function( value ) {
  return value.replace( /"/g, '\\"' )
};

Link.expandRelations = function( ref ) {
  var rels = ref.rel.split( ' ' );
  return rels.map( function( rel ) {
    var value = Object.assign( {}, ref );
    value.rel = rel;
    return value
  })
};

/**
 * Parses an extended value and attempts to decode it
 * @internal
 * @param {String} value
 * @return {Object}
 */
Link.parseExtendedValue = function( value ) {
  var parts = /([^']+)?(?:'([^']+)')?(.+)/.exec( value );
  return {
    language: parts[2].toLowerCase(),
    encoding: Link.isCompatibleEncoding( parts[1] ) ?
      null : parts[1].toLowerCase(),
    value: Link.isCompatibleEncoding( parts[1] ) ?
      decodeURIComponent( parts[3] ) : parts[3]
  }
};

/**
 * Format a given extended attribute and it's value
 * @param {String} attr
 * @param {Object} data
 * @return {String}
 */
Link.formatExtendedAttribute = function( attr, data ) {

  var encoding = ( data.encoding || 'utf-8' ).toUpperCase();
  var language = data.language || 'en';

  var encodedValue = '';

  if( Buffer.isBuffer( data.value ) && Link.isCompatibleEncoding( encoding ) ) {
    encodedValue = data.value.toString( encoding );
  } else if( Buffer.isBuffer( data.value ) ) {
    encodedValue = data.value.toString( 'hex' )
      .replace( /[0-9a-f]{2}/gi, '%$1' );
  } else {
    encodedValue = encodeURIComponent( data.value );
  }

  return attr + '=' + encoding + '\'' +
    language + '\'' + encodedValue

};

/**
 * Format a given attribute and it's value
 * @param {String} attr
 * @param {String|Object} value
 * @return {String}
 */
Link.formatAttribute = function( attr, value ) {

  if( Array.isArray( value ) ) {
    return value.map(( item ) => {
      return Link.formatAttribute( attr, item )
    }).join( '; ' )
  }

  if( attr[ attr.length - 1 ] === '*' || typeof value !== 'string' ) {
    return Link.formatExtendedAttribute( attr, value )
  }

  if( Link.isTokenAttr( attr ) ) {
    value = needsQuotes( value ) ?
      '"' + Link.escapeQuotes( value ) + '"' :
      Link.escapeQuotes( value );
  } else if( needsQuotes( value ) ) {
    value = encodeURIComponent( value );
    // We don't need to escape <SP> <,> <;> within quotes
    value = value
      .replace( /%20/g, ' ' )
      .replace( /%2C/g, ',' )
      .replace( /%3B/g, ';' );

    value = '"' + value + '"';
  }

  return attr + '=' + value

};

var link = Link;

function internal_parseResourceInfo(response) {
  var _a, _b, _c;
  const contentTypeParts = (_b = (_a = response.headers.get("Content-Type")) === null || _a === void 0 ? void 0 : _a.split(";")) !== null && _b !== void 0 ? _b : [];
  const isSolidDataset = contentTypeParts.length > 0 && ["text/turtle", "application/ld+json"].includes(contentTypeParts[0]);
  const resourceInfo = {
    sourceIri: response.url,
    isRawData: !isSolidDataset,
    contentType: (_c = response.headers.get("Content-Type")) !== null && _c !== void 0 ? _c : void 0,
    linkedResources: {}
  };
  const linkHeader = response.headers.get("Link");
  if (linkHeader) {
    const parsedLinks = link.parse(linkHeader);
    const aclLinks = parsedLinks.get("rel", "acl");
    if (aclLinks.length === 1) {
      resourceInfo.aclUrl = new URL(aclLinks[0].uri, resourceInfo.sourceIri).href;
    }
    resourceInfo.linkedResources = parsedLinks.refs.reduce((rels, ref) => {
      var _a2;
      var _b2;
      (_a2 = rels[_b2 = ref.rel]) !== null && _a2 !== void 0 ? _a2 : rels[_b2] = [];
      rels[ref.rel].push(new URL(ref.uri, resourceInfo.sourceIri).href);
      return rels;
    }, resourceInfo.linkedResources);
  }
  const wacAllowHeader = response.headers.get("WAC-Allow");
  if (wacAllowHeader) {
    resourceInfo.permissions = parseWacAllowHeader(wacAllowHeader);
  }
  return resourceInfo;
}
function parseWacAllowHeader(wacAllowHeader) {
  function parsePermissionStatement(permissionStatement) {
    const permissions = permissionStatement.split(" ");
    const writePermission = permissions.includes("write");
    return writePermission ? {
      read: permissions.includes("read"),
      append: true,
      write: true,
      control: permissions.includes("control")
    } : {
      read: permissions.includes("read"),
      append: permissions.includes("append"),
      write: false,
      control: permissions.includes("control")
    };
  }
  function getStatementFor(header, scope) {
    const relevantEntries = header.split(",").map((rawEntry) => rawEntry.split("=")).filter((parts) => parts.length === 2 && parts[0].trim() === scope);
    if (relevantEntries.length !== 1) {
      return "";
    }
    const relevantStatement = relevantEntries[0][1].trim();
    if (relevantStatement.charAt(0) !== '"' || relevantStatement.charAt(relevantStatement.length - 1) !== '"') {
      return "";
    }
    return relevantStatement.substring(1, relevantStatement.length - 1);
  }
  return {
    user: parsePermissionStatement(getStatementFor(wacAllowHeader, "user")),
    public: parsePermissionStatement(getStatementFor(wacAllowHeader, "public"))
  };
}
function internal_isUnsuccessfulResponse(response) {
  return !response.ok;
}

const ldp = {
  BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer",
  Container: "http://www.w3.org/ns/ldp#Container",
  Resource: "http://www.w3.org/ns/ldp#Resource",
  contains: "http://www.w3.org/ns/ldp#contains"
};

const internal_defaultFetchOptions = {
  fetch
};
function responseToResourceInfo(response) {
  if (internal_isUnsuccessfulResponse(response)) {
    throw new FetchError(`Fetching the metadata of the Resource at [${response.url}] failed: [${response.status}] [${response.statusText}].`, response);
  }
  const resourceInfo = internal_parseResourceInfo(response);
  return {internal_resourceInfo: resourceInfo};
}
function isContainer(resource) {
  const containerUrl = hasResourceInfo(resource) ? getSourceUrl(resource) : internal_toIriString(resource);
  return containerUrl.endsWith("/");
}
function getContentType(resource) {
  var _a;
  return (_a = resource.internal_resourceInfo.contentType) !== null && _a !== void 0 ? _a : null;
}
function getSourceUrl(resource) {
  if (hasResourceInfo(resource)) {
    return resource.internal_resourceInfo.sourceIri;
  }
  return null;
}
class FetchError extends SolidClientError {
  constructor(message, errorResponse) {
    super(message);
    this.response = errorResponse;
  }
  get statusCode() {
    return this.response.status;
  }
  get statusText() {
    return this.response.statusText;
  }
}

class BlankNode {
  constructor (id) {
    this.value = id || ('b' + (++BlankNode.nextId));
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

BlankNode.prototype.termType = 'BlankNode';

BlankNode.nextId = 0;

var BlankNode_1 = BlankNode;

class DefaultGraph {
  equals (other) {
    return !!other && other.termType === this.termType
  }
}

DefaultGraph.prototype.termType = 'DefaultGraph';
DefaultGraph.prototype.value = '';

var DefaultGraph_1 = DefaultGraph;

function fromTerm (original) {
  if (!original) {
    return null
  }

  if (original.termType === 'BlankNode') {
    return this.blankNode(original.value)
  }

  if (original.termType === 'DefaultGraph') {
    return this.defaultGraph()
  }

  if (original.termType === 'Literal') {
    return this.literal(original.value, original.language || this.namedNode(original.datatype.value))
  }

  if (original.termType === 'NamedNode') {
    return this.namedNode(original.value)
  }

  if (original.termType === 'Quad') {
    const subject = this.fromTerm(original.subject);
    const predicate = this.fromTerm(original.predicate);
    const object = this.fromTerm(original.object);
    const graph = this.fromTerm(original.graph);

    return this.quad(subject, predicate, object, graph)
  }

  if (original.termType === 'Variable') {
    return this.variable(original.value)
  }

  throw new Error(`unknown termType ${original.termType}`)
}

var fromTerm_1 = fromTerm;

class NamedNode {
  constructor (iri) {
    this.value = iri;
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

NamedNode.prototype.termType = 'NamedNode';

var NamedNode_1 = NamedNode;

class Literal {
  constructor (value, language, datatype) {
    this.value = value;
    this.datatype = Literal.stringDatatype;
    this.language = '';

    if (language) {
      this.language = language;
      this.datatype = Literal.langStringDatatype;
    } else if (datatype) {
      this.datatype = datatype;
    }
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value &&
      other.language === this.language && other.datatype.equals(this.datatype)
  }
}

Literal.prototype.termType = 'Literal';

Literal.langStringDatatype = new NamedNode_1('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString');
Literal.stringDatatype = new NamedNode_1('http://www.w3.org/2001/XMLSchema#string');

var Literal_1 = Literal;

class Quad {
  constructor (subject, predicate, object, graph) {
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;

    if (graph) {
      this.graph = graph;
    } else {
      this.graph = new DefaultGraph_1();
    }
  }

  equals (other) {
    // `|| !other.termType` is for backwards-compatibility with old factories without RDF* support.
    return !!other && (other.termType === 'Quad' || !other.termType) &&
      other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
      other.object.equals(this.object) && other.graph.equals(this.graph)
  }
}

Quad.prototype.termType = 'Quad';
Quad.prototype.value = '';

var Quad_1 = Quad;

class Variable {
  constructor (name) {
    this.value = name;
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

Variable.prototype.termType = 'Variable';

var Variable_1 = Variable;

function namedNode (value) {
  return new NamedNode_1(value)
}

function blankNode (value) {
  return new BlankNode_1(value)
}

function literal (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal_1(value, languageOrDatatype)
    }

    return new Literal_1(value, null, DataFactory.namedNode(languageOrDatatype))
  }

  return new Literal_1(value, null, languageOrDatatype)
}

function variable (value) {
  return new Variable_1(value)
}

function defaultGraph () {
  return DataFactory.defaultGraphInstance
}

function triple (subject, predicate, object) {
  return DataFactory.quad(subject, predicate, object)
}

function quad (subject, predicate, object, graph) {
  return new Quad_1(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
}

function fromTerm$1 (original) {
  return fromTerm_1.call(DataFactory, original)
}

function fromQuad (original) {
  return fromTerm_1.call(DataFactory, original)
}

const DataFactory = {
  namedNode,
  blankNode,
  literal,
  variable,
  defaultGraph,
  triple,
  quad,
  fromTerm: fromTerm$1,
  fromQuad,
  defaultGraphInstance: new DefaultGraph_1()
};

var DataFactory_1 = DataFactory;

var dataModel = DataFactory_1;

function isString (s) {
  return typeof s === 'string' || s instanceof String
}

const xsdString = 'http://www.w3.org/2001/XMLSchema#string';

function termToId (term) {
  if (typeof term === 'string') {
    return term
  }

  if (!term) {
    return ''
  }

  if (typeof term.id !== 'undefined' && term.termType !== 'Quad') {
    return term.id
  }

  let subject, predicate, object, graph;

  // Term instantiated with another library
  switch (term.termType) {
    case 'NamedNode':
      return term.value

    case 'BlankNode':
      return `_:${term.value}`

    case 'Variable':
      return `?${term.value}`

    case 'DefaultGraph':
      return ''

    case 'Literal':
      if (term.language) {
        return `"${term.value}"@${term.language}`
      }

      return `"${term.value}"${term.datatype && term.datatype.value !== xsdString ? `^^${term.datatype.value}` : ''}`

    case 'Quad':
      // To identify RDF* quad components, we escape quotes by doubling them.
      // This avoids the overhead of backslash parsing of Turtle-like syntaxes.
      subject = escapeQuotes(termToId(term.subject));
      predicate = escapeQuotes(termToId(term.predicate));
      object = escapeQuotes(termToId(term.object));
      graph = term.graph.termType === 'DefaultGraph' ? '' : ` ${termToId(term.graph)}`;

      return `<<${subject} ${predicate} ${object}${graph}>>`

    default:
      throw new Error(`Unexpected termType: ${term.termType}`)
  }
}

const escapedLiteral = /^"(.*".*)(?="[^"]*$)/;

function escapeQuotes (id) {
  return id.replace(escapedLiteral, (_, quoted) => `"${quoted.replace(/"/g, '""')}`)
}

class DatasetCore {
  constructor (quads) {
    // The number of quads is initially zero
    this._size = 0;
    // `_graphs` contains subject, predicate, and object indexes per graph
    this._graphs = Object.create(null);
    // `_ids` maps entities such as `http://xmlns.com/foaf/0.1/name` to numbers,
    // saving memory by using only numbers as keys in `_graphs`
    this._id = 0;
    this._ids = Object.create(null);
    this._ids['><'] = 0; // dummy entry, so the first actual key is non-zero
    this._entities = Object.create(null); // inverse of `_ids`

    this._quads = new Map();

    // Add quads if passed
    if (quads) {
      for (const quad of quads) {
        this.add(quad);
      }
    }
  }

  get size () {
    // Return the quad count if if was cached
    let size = this._size;

    if (size !== null) {
      return size
    }

    // Calculate the number of quads by counting to the deepest level
    size = 0;
    const graphs = this._graphs;
    let subjects, subject;

    for (const graphKey in graphs) {
      for (const subjectKey in (subjects = graphs[graphKey].subjects)) {
        for (const predicateKey in (subject = subjects[subjectKey])) {
          size += Object.keys(subject[predicateKey]).length;
        }
      }
    }

    this._size = size;

    return this._size
  }

  add (quad) {
    // Convert terms to internal string representation
    let subject = termToId(quad.subject);
    let predicate = termToId(quad.predicate);
    let object = termToId(quad.object);
    const graph = termToId(quad.graph);

    // Find the graph that will contain the triple
    let graphItem = this._graphs[graph];
    // Create the graph if it doesn't exist yet
    if (!graphItem) {
      graphItem = this._graphs[graph] = { subjects: {}, predicates: {}, objects: {} };
      // Freezing a graph helps subsequent `add` performance,
      // and properties will never be modified anyway
      Object.freeze(graphItem);
    }

    // Since entities can often be long IRIs, we avoid storing them in every index.
    // Instead, we have a separate index that maps entities to numbers,
    // which are then used as keys in the other indexes.
    const ids = this._ids;
    const entities = this._entities;
    subject = ids[subject] || (ids[entities[++this._id] = subject] = this._id);
    predicate = ids[predicate] || (ids[entities[++this._id] = predicate] = this._id);
    object = ids[object] || (ids[entities[++this._id] = object] = this._id);

    this._addToIndex(graphItem.subjects, subject, predicate, object);
    this._addToIndex(graphItem.predicates, predicate, object, subject);
    this._addToIndex(graphItem.objects, object, subject, predicate);

    this._setQuad(subject, predicate, object, graph, quad);

    // The cached quad count is now invalid
    this._size = null;

    return this
  }

  delete (quad) {
    // Convert terms to internal string representation
    let subject = termToId(quad.subject);
    let predicate = termToId(quad.predicate);
    let object = termToId(quad.object);
    const graph = termToId(quad.graph);

    // Find internal identifiers for all components
    // and verify the quad exists.
    const ids = this._ids;
    const graphs = this._graphs;
    let graphItem, subjects, predicates;

    if (!(subject = ids[subject]) || !(predicate = ids[predicate]) ||
      !(object = ids[object]) || !(graphItem = graphs[graph]) ||
      !(subjects = graphItem.subjects[subject]) ||
      !(predicates = subjects[predicate]) ||
      !(object in predicates)
    ) {
      return this
    }

    // Remove it from all indexes
    this._removeFromIndex(graphItem.subjects, subject, predicate, object);
    this._removeFromIndex(graphItem.predicates, predicate, object, subject);
    this._removeFromIndex(graphItem.objects, object, subject, predicate);

    if (this._size !== null) {
      this._size--;
    }

    this._deleteQuad(subject, predicate, object, graph);

    // Remove the graph if it is empty
    for (subject in graphItem.subjects) { // eslint-disable-line no-unreachable-loop
      return this
    }

    delete graphs[graph];

    return this
  }

  has (quad) {
    // Convert terms to internal string representation
    const subject = termToId(quad.subject);
    const predicate = termToId(quad.predicate);
    const object = termToId(quad.object);
    const graph = termToId(quad.graph);

    const graphItem = this._graphs[graph];

    if (!graphItem) {
      return false
    }

    const ids = this._ids;
    let subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (
      (isString(subject) && !(subjectId = ids[subject])) ||
      (isString(predicate) && !(predicateId = ids[predicate])) ||
      (isString(object) && !(objectId = ids[object]))
    ) {
      return false
    }

    return this._countInIndex(graphItem.objects, objectId, subjectId, predicateId) === 1
  }

  match (subject, predicate, object, graph) {
    return this._createDataset(this._match(subject, predicate, object, graph))
  }

  [Symbol.iterator] () {
    return this._match()[Symbol.iterator]()
  }

  // ## Private methods

  // ### `_addToIndex` adds a quad to a three-layered index.
  // Returns if the index has changed, if the entry did not already exist.
  _addToIndex (index0, key0, key1, key2) {
    // Create layers as necessary
    const index1 = index0[key0] || (index0[key0] = {});
    const index2 = index1[key1] || (index1[key1] = {});
    // Setting the key to _any_ value signals the presence of the quad
    const existed = key2 in index2;

    if (!existed) {
      index2[key2] = null;
    }

    return !existed
  }

  // ### `_removeFromIndex` removes a quad from a three-layered index
  _removeFromIndex (index0, key0, key1, key2) {
    // Remove the quad from the index
    const index1 = index0[key0];
    const index2 = index1[key1];
    delete index2[key2];

    // Remove intermediary index layers if they are empty
    for (const key in index2) { // eslint-disable-line no-unreachable-loop
      return
    }

    delete index1[key1];

    for (const key in index1) { // eslint-disable-line no-unreachable-loop
      return
    }

    delete index0[key0];
  }

  // ### `_findInIndex` finds a set of quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  // `name0`, `name1`, and `name2` are the names of the keys at each level,
  // used when reconstructing the resulting quad
  // (for instance: _subject_, _predicate_, and _object_).
  // Finally, `graph` will be the graph of the created quads.
  // If `callback` is given, each result is passed through it
  // and iteration halts when it returns truthy for any quad.
  // If instead `array` is given, each result is added to the array.
  _findInIndex (index0, key0, key1, key2, name0, name1, name2, graph, callback, array) {
    let tmp, index1, index2;

    // If a key is specified, use only that part of index 0.
    if (key0) {
      (tmp = index0, index0 = {})[key0] = tmp[key0];
    }

    for (const value0 in index0) {
      index1 = index0[value0];

      if (index1) {
        // If a key is specified, use only that part of index 1.
        if (key1) {
          (tmp = index1, index1 = {})[key1] = tmp[key1];
        }

        for (const value1 in index1) {
          index2 = index1[value1];

          if (index2) {
            // If a key is specified, use only that part of index 2, if it exists.
            const values = key2 ? (key2 in index2 ? [key2] : []) : Object.keys(index2);
            // Create quads for all items found in index 2.
            for (let l = 0; l < values.length; l++) {
              const parts = {
                [name0]: value0,
                [name1]: value1,
                [name2]: values[l]
              };

              const quad = this._getQuad(parts.subject, parts.predicate, parts.object, graph);

              if (array) {
                array.push(quad);
              } else if (callback(quad)) {
                return true
              }
            }
          }
        }
      }
    }

    return array
  }

  // ### `_countInIndex` counts matching quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  _countInIndex (index0, key0, key1, key2) {
    let count = 0;
    let tmp, index1, index2;

    // If a key is specified, count only that part of index 0
    if (key0) {
      (tmp = index0, index0 = {})[key0] = tmp[key0];
    }

    for (const value0 in index0) {
      index1 = index0[value0];

      if (index1) {
        // If a key is specified, count only that part of index 1
        if (key1) {
          (tmp = index1, index1 = {})[key1] = tmp[key1];
        }

        for (const value1 in index1) {
          index2 = index1[value1];

          if (index2) {
            if (key2) {
              // If a key is specified, count the quad if it exists
              (key2 in index2) && count++;
            } else {
              // Otherwise, count all quads
              count += Object.keys(index2).length;
            }
          }
        }
      }
    }

    return count
  }

  // ### `_getGraphs` returns an array with the given graph,
  // or all graphs if the argument is null or undefined.
  _getGraphs (graph) {
    if (!isString(graph)) {
      return this._graphs
    }

    return {
      [graph]: this._graphs[graph]
    }
  }

  _match (subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && termToId(subject);
    predicate = predicate && termToId(predicate);
    object = object && termToId(object);
    graph = graph && termToId(graph);

    const quads = [];
    const graphs = this._getGraphs(graph);
    const ids = this._ids;
    let content, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (
      (isString(subject) && !(subjectId = ids[subject])) ||
      (isString(predicate) && !(predicateId = ids[predicate])) ||
      (isString(object) && !(objectId = ids[object]))
    ) {
      return quads
    }

    for (const graphId in graphs) {
      content = graphs[graphId];

      // Only if the specified graph contains triples, there can be results
      if (content) {
        // Choose the optimal index, based on what fields are present
        if (subjectId) {
          if (objectId) {
            // If subject and object are given, the object index will be the fastest
            this._findInIndex(content.objects, objectId, subjectId, predicateId, 'object', 'subject', 'predicate', graphId, null, quads);
          } else {
            // If only subject and possibly predicate are given, the subject index will be the fastest
            this._findInIndex(content.subjects, subjectId, predicateId, null, 'subject', 'predicate', 'object', graphId, null, quads);
          }
        } else if (predicateId) {
          // if only predicate and possibly object are given, the predicate index will be the fastest
          this._findInIndex(content.predicates, predicateId, objectId, null, 'predicate', 'object', 'subject', graphId, null, quads);
        } else if (objectId) {
          // If only object is given, the object index will be the fastest
          this._findInIndex(content.objects, objectId, null, null, 'object', 'subject', 'predicate', graphId, null, quads);
        } else {
          // If nothing is given, iterate subjects and predicates first
          this._findInIndex(content.subjects, null, null, null, 'subject', 'predicate', 'object', graphId, null, quads);
        }
      }
    }

    return quads
  }

  _getQuad (subjectId, predicateId, objectId, graphId) {
    return this._quads.get(this._toId(subjectId, predicateId, objectId, graphId))
  }

  _setQuad (subjectId, predicateId, objectId, graphId, quad) {
    this._quads.set(this._toId(subjectId, predicateId, objectId, graphId), quad);
  }

  _deleteQuad (subjectId, predicateId, objectId, graphId) {
    this._quads.delete(this._toId(subjectId, predicateId, objectId, graphId));
  }

  _createDataset (quads) {
    return new this.constructor(quads)
  }

  _toId (subjectId, predicateId, objectId, graphId) {
    return `${subjectId}:${predicateId}:${objectId}:${graphId}`
  }
}

var DatasetCore_1 = DatasetCore;

function dataset (quads) {
  return new DatasetCore_1(quads)
}

var dataset_1 = Object.assign({ dataset }, dataModel);

dataset_1.dataset;
const localNodeSkolemPrefix = "https://inrupt.com/.well-known/sdk-local-node/";
const freeze = Object.freeze;
function isLocalNodeIri(iri) {
  return iri.substring(0, localNodeSkolemPrefix.length) === localNodeSkolemPrefix;
}
function getLocalNodeName(localNodeIri) {
  return localNodeIri.substring(localNodeSkolemPrefix.length);
}
function getLocalNodeIri(localNodeName) {
  return `${localNodeSkolemPrefix}${localNodeName}`;
}
function isBlankNodeId(value) {
  return typeof value === "string" && value.substring(0, 2) === "_:";
}
function getBlankNodeValue(blankNodeId) {
  return blankNodeId.substring(2);
}
function getBlankNodeId(blankNode) {
  return `_:${blankNode.value}`;
}

const xmlSchemaTypes = {
  boolean: "http://www.w3.org/2001/XMLSchema#boolean",
  dateTime: "http://www.w3.org/2001/XMLSchema#dateTime",
  date: "http://www.w3.org/2001/XMLSchema#date",
  time: "http://www.w3.org/2001/XMLSchema#time",
  decimal: "http://www.w3.org/2001/XMLSchema#decimal",
  integer: "http://www.w3.org/2001/XMLSchema#integer",
  string: "http://www.w3.org/2001/XMLSchema#string",
  langString: "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"
};
function deserializeBoolean(value) {
  if (value === "true" || value === "1") {
    return true;
  } else if (value === "false" || value === "0") {
    return false;
  } else {
    return null;
  }
}
function deserializeDatetime(literalString) {
  const datetimeRegEx = /-?\d{4,}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(Z|(\+|-)\d\d:\d\d)?/;
  if (!datetimeRegEx.test(literalString)) {
    return null;
  }
  const [signedDateString, rest] = literalString.split("T");
  const [yearMultiplier, dateString] = signedDateString.charAt(0) === "-" ? [-1, signedDateString.substring(1)] : [1, signedDateString];
  const [yearString, monthString, dayString] = dateString.split("-");
  const utcFullYear = Number.parseInt(yearString, 10) * yearMultiplier;
  const utcMonth = Number.parseInt(monthString, 10) - 1;
  const utcDate = Number.parseInt(dayString, 10);
  const [timeString, timezoneString] = splitTimeFromTimezone(rest);
  const [hourOffset, minuteOffset] = typeof timezoneString === "string" ? getTimezoneOffsets(timezoneString) : [0, 0];
  const [hourString, minuteString, timeRest] = timeString.split(":");
  const utcHours = Number.parseInt(hourString, 10) + hourOffset;
  const utcMinutes = Number.parseInt(minuteString, 10) + minuteOffset;
  const [secondString, optionalMillisecondString] = timeRest.split(".");
  const utcSeconds = Number.parseInt(secondString, 10);
  const utcMilliseconds = optionalMillisecondString ? Number.parseInt(optionalMillisecondString, 10) : 0;
  const date = new Date(Date.UTC(utcFullYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds, utcMilliseconds));
  if (utcFullYear >= 0 && utcFullYear < 100) {
    date.setUTCFullYear(date.getUTCFullYear() - 1900);
  }
  return date;
}
function splitTimeFromTimezone(timeString) {
  if (timeString.endsWith("Z")) {
    return [timeString.substring(0, timeString.length - 1), "Z"];
  }
  const splitOnPlus = timeString.split("+");
  const splitOnMinus = timeString.split("-");
  if (splitOnPlus.length === 1 && splitOnMinus.length === 1) {
    return [splitOnPlus[0], void 0];
  }
  return splitOnPlus.length > splitOnMinus.length ? [splitOnPlus[0], "+" + splitOnPlus[1]] : [splitOnMinus[0], "-" + splitOnMinus[1]];
}
function getTimezoneOffsets(timezoneString) {
  if (timezoneString === "Z") {
    return [0, 0];
  }
  const multiplier = timezoneString.charAt(0) === "+" ? 1 : -1;
  const [hourString, minuteString] = timezoneString.substring(1).split(":");
  const hours = Number.parseInt(hourString, 10);
  const minutes = Number.parseInt(minuteString, 10);
  return [hours * multiplier, minutes * multiplier];
}
function deserializeDecimal(literalString) {
  const deserialized = Number.parseFloat(literalString);
  if (Number.isNaN(deserialized)) {
    return null;
  }
  return deserialized;
}
function deserializeInteger(literalString) {
  const deserialized = Number.parseInt(literalString, 10);
  if (Number.isNaN(deserialized)) {
    return null;
  }
  return deserialized;
}
function isNamedNode(value) {
  return isTerm(value) && value.termType === "NamedNode";
}
function isLiteral(value) {
  return isTerm(value) && value.termType === "Literal";
}
function isTerm(value) {
  return value !== null && typeof value === "object" && typeof value.termType === "string" && typeof value.value === "string" && typeof value.equals === "function";
}
function isLocalNode(value) {
  return isNamedNode(value) && isLocalNodeIri(value.value);
}
function internal_isValidUrl(iri) {
  const iriString = internal_toIriString(iri);
  if (typeof URL !== "function") {
    return true;
  }
  try {
    new URL(iriString);
  } catch (_a) {
    return false;
  }
  return true;
}
function resolveIriForLocalNode(localNode, resourceIri) {
  return DataFactory$1.namedNode(resolveLocalIri(getLocalNodeName(localNode.value), resourceIri));
}
function resolveLocalIri(name, resourceIri) {
  if (typeof URL !== "function") {
    throw new Error("The URL interface is not available, so an IRI cannot be determined.");
  }
  const thingIri = new URL(resourceIri);
  thingIri.hash = name;
  return thingIri.href;
}

const DataFactory$1 = dataModel;
function addRdfJsQuadToDataset(dataset, quad, quadParseOptions = {}) {
  var _a;
  const supportedGraphTypes = [
    "NamedNode",
    "DefaultGraph"
  ];
  if (!supportedGraphTypes.includes(quad.graph.termType)) {
    throw new Error(`Cannot parse Quads with nodes of type [${quad.graph.termType}] as their Graph node.`);
  }
  const graphId = quad.graph.termType === "DefaultGraph" ? "default" : quad.graph.value;
  const graph = (_a = dataset.graphs[graphId]) !== null && _a !== void 0 ? _a : {};
  return freeze(Object.assign(Object.assign({}, dataset), {graphs: freeze(Object.assign(Object.assign({}, dataset.graphs), {[graphId]: addRdfJsQuadToGraph(graph, quad, quadParseOptions)}))}));
}
function addRdfJsQuadToGraph(graph, quad, quadParseOptions) {
  var _a;
  const supportedSubjectTypes = [
    "NamedNode",
    "BlankNode"
  ];
  if (!supportedSubjectTypes.includes(quad.subject.termType)) {
    throw new Error(`Cannot parse Quads with nodes of type [${quad.subject.termType}] as their Subject node.`);
  }
  const subjectIri = quad.subject.termType === "BlankNode" ? `_:${quad.subject.value}` : quad.subject.value;
  const subject = (_a = graph[subjectIri]) !== null && _a !== void 0 ? _a : {
    type: "Subject",
    url: subjectIri,
    predicates: {}
  };
  return freeze(Object.assign(Object.assign({}, graph), {[subjectIri]: addRdfJsQuadToSubject(subject, quad, quadParseOptions)}));
}
function addRdfJsQuadToSubject(subject, quad, quadParseOptions) {
  return freeze(Object.assign(Object.assign({}, subject), {predicates: addRdfJsQuadToPredicates(subject.predicates, quad, quadParseOptions)}));
}
function addRdfJsQuadToPredicates(predicates, quad, quadParseOptions) {
  var _a;
  const supportedPredicateTypes = [
    "NamedNode"
  ];
  if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
    throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
  }
  const predicateIri = quad.predicate.value;
  const objects = (_a = predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
  return freeze(Object.assign(Object.assign({}, predicates), {[predicateIri]: addRdfJsQuadToObjects(objects, quad, quadParseOptions)}));
}
function addRdfJsQuadToObjects(objects, quad, quadParseOptions) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (quad.object.termType === "NamedNode") {
    const namedNodes = freeze([
      ...(_a = objects.namedNodes) !== null && _a !== void 0 ? _a : [],
      quad.object.value
    ]);
    return freeze(Object.assign(Object.assign({}, objects), {namedNodes}));
  }
  if (quad.object.termType === "Literal") {
    if (quad.object.datatype.value === xmlSchemaTypes.langString) {
      const locale = quad.object.language.toLowerCase();
      const thisLocaleStrings = freeze([
        ...(_c = (_b = objects.langStrings) === null || _b === void 0 ? void 0 : _b[locale]) !== null && _c !== void 0 ? _c : [],
        quad.object.value
      ]);
      const langStrings = freeze(Object.assign(Object.assign({}, (_d = objects.langStrings) !== null && _d !== void 0 ? _d : {}), {[locale]: thisLocaleStrings}));
      return freeze(Object.assign(Object.assign({}, objects), {langStrings}));
    }
    const thisTypeValues = freeze([
      ...(_f = (_e = objects.literals) === null || _e === void 0 ? void 0 : _e[quad.object.datatype.value]) !== null && _f !== void 0 ? _f : [],
      quad.object.value
    ]);
    const literals = freeze(Object.assign(Object.assign({}, (_g = objects.literals) !== null && _g !== void 0 ? _g : {}), {[quad.object.datatype.value]: thisTypeValues}));
    return freeze(Object.assign(Object.assign({}, objects), {literals}));
  }
  if (quad.object.termType === "BlankNode") {
    const blankNodePredicates = getPredicatesForBlankNode(quad.object, quadParseOptions);
    const blankNodes = freeze([
      ...(_h = objects.blankNodes) !== null && _h !== void 0 ? _h : [],
      blankNodePredicates
    ]);
    return freeze(Object.assign(Object.assign({}, objects), {blankNodes}));
  }
  throw new Error(`Objects of type [${quad.object.termType}] are not supported.`);
}
function getPredicatesForBlankNode(node, quadParseOptions) {
  var _a, _b;
  const chainBlankNodes = (_a = quadParseOptions.chainBlankNodes) !== null && _a !== void 0 ? _a : [];
  if (chainBlankNodes.find((chainBlankNode) => chainBlankNode.equals(node)) === void 0) {
    return getBlankNodeId(node);
  }
  const quads = (_b = quadParseOptions.otherQuads) !== null && _b !== void 0 ? _b : [];
  const quadsWithNodeAsSubject = quads.filter((quad) => quad.subject.equals(node));
  const predicates = quadsWithNodeAsSubject.filter((quad) => !isBlankNode(quad.object)).reduce((predicatesAcc, quad) => {
    var _a2;
    const supportedPredicateTypes = [
      "NamedNode"
    ];
    if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
      throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
    }
    const objects = (_a2 = predicatesAcc[quad.predicate.value]) !== null && _a2 !== void 0 ? _a2 : {};
    return freeze(Object.assign(Object.assign({}, predicatesAcc), {[quad.predicate.value]: addRdfJsQuadToObjects(objects, quad, quadParseOptions)}));
  }, {});
  const blankNodeObjectQuads = quadsWithNodeAsSubject.filter((quad) => isBlankNode(quad.object));
  return blankNodeObjectQuads.reduce((predicatesAcc, quad) => {
    var _a2, _b2;
    const supportedPredicateTypes = [
      "NamedNode"
    ];
    if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
      throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
    }
    const objects = (_a2 = predicatesAcc[quad.predicate.value]) !== null && _a2 !== void 0 ? _a2 : {};
    const blankNodes = (_b2 = objects.blankNodes) !== null && _b2 !== void 0 ? _b2 : [];
    return freeze(Object.assign(Object.assign({}, predicatesAcc), {
      [quad.predicate.value]: Object.assign(Object.assign({}, objects), {blankNodes: [
        ...blankNodes,
        getPredicatesForBlankNode(quad.object, quadParseOptions)
      ]})
    }));
  }, predicates);
}
function getChainBlankNodes(quads) {
  const blankNodeSubjects = quads.map((quad) => quad.subject).filter(isBlankNode);
  const blankNodeObjects = quads.map((quad) => quad.object).filter(isBlankNode);
  function everyNodeTheSame(nodes) {
    return nodes.every((otherNode) => nodes.every((anotherNode) => otherNode.equals(anotherNode)));
  }
  const cycleBlankNodes = [];
  blankNodeObjects.forEach((blankNodeObject) => {
    cycleBlankNodes.push(...getCycleBlankNodes(blankNodeObject, quads));
  });
  const chainBlankNodes = blankNodeSubjects.concat(blankNodeObjects).filter((blankNode) => {
    if (cycleBlankNodes.some((cycleBlankNode) => cycleBlankNode.equals(blankNode))) {
      return false;
    }
    const subjectsWithThisNodeAsObject = quads.filter((quad) => quad.object.equals(blankNode)).map((quad) => quad.subject);
    return subjectsWithThisNodeAsObject.length > 0 && everyNodeTheSame(subjectsWithThisNodeAsObject);
  });
  return chainBlankNodes;
}
function toRdfJsQuads(dataset, options = {}) {
  var _a;
  const quads = [];
  const dataFactory = (_a = options.dataFactory) !== null && _a !== void 0 ? _a : dataModel;
  Object.keys(dataset.graphs).forEach((graphIri) => {
    const graph = dataset.graphs[graphIri];
    const graphNode = graphIri === "default" ? dataFactory.defaultGraph() : dataFactory.namedNode(graphIri);
    Object.keys(graph).forEach((subjectIri) => {
      const predicates = graph[subjectIri].predicates;
      const subjectNode = isBlankNodeId(subjectIri) ? dataFactory.blankNode(getBlankNodeValue(subjectIri)) : dataFactory.namedNode(subjectIri);
      quads.push(...subjectToRdfJsQuads(predicates, subjectNode, graphNode, options));
    });
  });
  return quads;
}
function subjectToRdfJsQuads(predicates, subjectNode, graphNode, options = {}) {
  var _a;
  const quads = [];
  const dataFactory = (_a = options.dataFactory) !== null && _a !== void 0 ? _a : dataModel;
  Object.keys(predicates).forEach((predicateIri) => {
    var _a2, _b, _c, _d;
    const predicateNode = dataFactory.namedNode(predicateIri);
    const langStrings = (_a2 = predicates[predicateIri].langStrings) !== null && _a2 !== void 0 ? _a2 : {};
    const namedNodes = (_b = predicates[predicateIri].namedNodes) !== null && _b !== void 0 ? _b : [];
    const literals = (_c = predicates[predicateIri].literals) !== null && _c !== void 0 ? _c : {};
    const blankNodes = (_d = predicates[predicateIri].blankNodes) !== null && _d !== void 0 ? _d : [];
    const literalTypes = Object.keys(literals);
    literalTypes.forEach((typeIri) => {
      const typeNode = dataFactory.namedNode(typeIri);
      const literalValues = literals[typeIri];
      literalValues.forEach((value) => {
        const literalNode = dataFactory.literal(value, typeNode);
        quads.push(dataFactory.quad(subjectNode, predicateNode, literalNode, graphNode));
      });
    });
    const locales = Object.keys(langStrings);
    locales.forEach((locale) => {
      const localeValues = langStrings[locale];
      localeValues.forEach((value) => {
        const langStringNode = dataFactory.literal(value, locale);
        quads.push(dataFactory.quad(subjectNode, predicateNode, langStringNode, graphNode));
      });
    });
    namedNodes.forEach((namedNodeIri) => {
      const node = dataFactory.namedNode(namedNodeIri);
      quads.push(dataFactory.quad(subjectNode, predicateNode, node, graphNode));
    });
    blankNodes.forEach((blankNodeIdOrPredicates) => {
      if (isBlankNodeId(blankNodeIdOrPredicates)) {
        const blankNode = dataFactory.blankNode(getBlankNodeValue(blankNodeIdOrPredicates));
        quads.push(dataFactory.quad(subjectNode, predicateNode, blankNode, graphNode));
      } else {
        const node = dataFactory.blankNode();
        const blankNodeObjectQuad = dataFactory.quad(subjectNode, predicateNode, node, graphNode);
        const blankNodeSubjectQuads = subjectToRdfJsQuads(blankNodeIdOrPredicates, node, graphNode);
        quads.push(blankNodeObjectQuad);
        quads.push(...blankNodeSubjectQuads);
      }
    });
  });
  return quads;
}
function getCycleBlankNodes(currentNode, quads, traversedBlankNodes = []) {
  if (traversedBlankNodes.find((traversedBlankNode) => traversedBlankNode.equals(currentNode)) !== void 0) {
    return traversedBlankNodes;
  }
  const blankNodeObjects = quads.filter((quad) => quad.subject.equals(currentNode) && isBlankNode(quad.object)).map((quad) => quad.object);
  if (blankNodeObjects.length === 0) {
    return [];
  }
  const nextTraversedNodes = [...traversedBlankNodes, currentNode];
  const cycleBlankNodeArrays = blankNodeObjects.map((nextNode) => getCycleBlankNodes(nextNode, quads, nextTraversedNodes));
  const allCycleBlankNodes = [];
  for (const cycleBlankNodes of cycleBlankNodeArrays) {
    allCycleBlankNodes.push(...cycleBlankNodes);
  }
  return allCycleBlankNodes;
}
function isBlankNode(term) {
  return term.termType === "BlankNode";
}

const getTurtleParser = () => {
  const onQuadCallbacks = [];
  const onCompleteCallbacks = [];
  const onErrorCallbacks = [];
  return {
    onQuad: (callback) => {
      onQuadCallbacks.push(callback);
    },
    onError: (callback) => {
      onErrorCallbacks.push(callback);
    },
    onComplete: (callback) => {
      onCompleteCallbacks.push(callback);
    },
    parse: async (source, resourceInfo) => {
      const parser = await getParser(getSourceUrl(resourceInfo));
      parser.parse(source, (error, quad, _prefixes) => {
        if (error) {
          onErrorCallbacks.forEach((callback) => callback(error));
        } else if (quad) {
          onQuadCallbacks.every((callback) => callback(quad));
        } else {
          onCompleteCallbacks.every((callback) => callback());
        }
      });
    }
  };
};
async function getParser(baseIri) {
  const n3 = await loadN3();
  return new n3.Parser({format: "text/turtle", baseIRI: baseIri});
}
async function triplesToTurtle(quads) {
  const n3 = await loadN3();
  const format = "text/turtle";
  const writer = new n3.Writer({format});
  const triples = quads.map((quad) => DataFactory$1.quad(quad.subject, quad.predicate, quad.object, void 0));
  writer.addQuads(triples);
  const writePromise = new Promise((resolve, reject) => {
    writer.end((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
  const rawTurtle = await writePromise;
  return rawTurtle;
}
async function loadN3() {
  const n3Module = await import('./index-8f467dca.js');
  if (typeof n3Module.default !== "undefined") {
    return n3Module.default;
  }
  return n3Module;
}

function internal_getReadableValue(value) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (isNamedNode(value)) {
    return `<${value.value}> (URL)`;
  }
  if (isLiteral(value)) {
    if (!isNamedNode(value.datatype)) {
      return `[${value.value}] (RDF/JS Literal of unknown type)`;
    }
    let val;
    switch (value.datatype.value) {
      case xmlSchemaTypes.boolean:
        val = (_b = (_a = deserializeBoolean(value.value)) === null || _a === void 0 ? void 0 : _a.valueOf()) !== null && _b !== void 0 ? _b : `Invalid data: \`${value.value}\``;
        return val + " (boolean)";
      case xmlSchemaTypes.dateTime:
        val = (_d = (_c = deserializeDatetime(value.value)) === null || _c === void 0 ? void 0 : _c.toUTCString()) !== null && _d !== void 0 ? _d : `Invalid data: \`${value.value}\``;
        return val + " (datetime)";
      case xmlSchemaTypes.decimal:
        val = (_f = (_e = deserializeDecimal(value.value)) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : `Invalid data: \`${value.value}\``;
        return val + " (decimal)";
      case xmlSchemaTypes.integer:
        val = (_h = (_g = deserializeInteger(value.value)) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : `Invalid data: \`${value.value}\``;
        return val + " (integer)";
      case xmlSchemaTypes.langString:
        return `"${value.value}" (${value.language} string)`;
      case xmlSchemaTypes.string:
        return `"${value.value}" (string)`;
      default:
        return `[${value.value}] (RDF/JS Literal of type: \`${value.datatype.value}\`)`;
    }
  }
  if (value.termType === "BlankNode") {
    return `[${value.value}] (RDF/JS BlankNode)`;
  }
  if (value.termType === "Quad") {
    return `??? (nested RDF* Quad)`;
  }
  if (value.termType === "Variable") {
    return `?${value.value} (RDF/JS Variable)`;
  }
  return value;
}
function internal_throwIfNotThing(thing) {
  if (!isThing(thing)) {
    throw new ThingExpectedError(thing);
  }
}
function internal_addAdditionsToChangeLog(solidDataset, additions) {
  const changeLog = hasChangelog(solidDataset) ? solidDataset.internal_changeLog : {additions: [], deletions: []};
  const [newAdditions, newDeletions] = additions.filter((addition) => !containsBlankNode(addition)).reduce(([additionsAcc, deletionsAcc], addition) => {
    const existingDeletion = deletionsAcc.find((deletion) => deletion.equals(addition));
    if (typeof existingDeletion !== "undefined") {
      return [
        additionsAcc,
        deletionsAcc.filter((deletion) => !deletion.equals(addition))
      ];
    }
    return [additionsAcc.concat(addition), deletionsAcc];
  }, [changeLog.additions, changeLog.deletions]);
  return freeze(Object.assign(Object.assign({}, solidDataset), {internal_changeLog: {
    additions: newAdditions,
    deletions: newDeletions
  }}));
}
function internal_addDeletionsToChangeLog(solidDataset, deletions) {
  const changeLog = hasChangelog(solidDataset) ? solidDataset.internal_changeLog : {additions: [], deletions: []};
  const [newAdditions, newDeletions] = deletions.filter((deletion) => !containsBlankNode(deletion)).reduce(([additionsAcc, deletionsAcc], deletion) => {
    const existingAddition = additionsAcc.find((addition) => addition.equals(deletion));
    if (typeof existingAddition !== "undefined") {
      return [
        additionsAcc.filter((addition) => !addition.equals(deletion)),
        deletionsAcc
      ];
    }
    return [additionsAcc, deletionsAcc.concat(deletion)];
  }, [changeLog.additions, changeLog.deletions]);
  return freeze(Object.assign(Object.assign({}, solidDataset), {internal_changeLog: {
    additions: newAdditions,
    deletions: newDeletions
  }}));
}
function internal_withChangeLog(solidDataset) {
  const newSolidDataset = hasChangelog(solidDataset) ? solidDataset : freeze(Object.assign(Object.assign({}, solidDataset), {internal_changeLog: {additions: [], deletions: []}}));
  return newSolidDataset;
}
function containsBlankNode(quad) {
  return quad.subject.termType === "BlankNode" || quad.object.termType === "BlankNode";
}

function getUrl(thing, property) {
  var _a, _b, _c;
  internal_throwIfNotThing(thing);
  if (!internal_isValidUrl(property)) {
    throw new ValidPropertyUrlExpectedError(property);
  }
  const predicateUrl = internal_toIriString(property);
  const firstUrl = (_c = (_b = (_a = thing.predicates[predicateUrl]) === null || _a === void 0 ? void 0 : _a.namedNodes) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null;
  if (firstUrl === null) {
    return null;
  }
  return isLocalNodeIri(firstUrl) ? `#${getLocalNodeName(firstUrl)}` : firstUrl;
}
const getIri = getUrl;
function getUrlAll(thing, property) {
  var _a, _b, _c;
  internal_throwIfNotThing(thing);
  if (!internal_isValidUrl(property)) {
    throw new ValidPropertyUrlExpectedError(property);
  }
  const predicateUrl = internal_toIriString(property);
  return (_c = (_b = (_a = thing.predicates[predicateUrl]) === null || _a === void 0 ? void 0 : _a.namedNodes) === null || _b === void 0 ? void 0 : _b.map((iri) => isLocalNodeIri(iri) ? `#${getLocalNodeName(iri)}` : iri)) !== null && _c !== void 0 ? _c : [];
}
const getIriAll = getUrlAll;
function getStringNoLocale(thing, property) {
  internal_throwIfNotThing(thing);
  const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.string);
  return literalString;
}
function getNamedNodeAll(thing, property) {
  const iriStrings = getIriAll(thing, property);
  return iriStrings.map((iriString) => DataFactory$1.namedNode(iriString));
}
function getLiteralAll(thing, property) {
  var _a, _b, _c, _d;
  internal_throwIfNotThing(thing);
  if (!internal_isValidUrl(property)) {
    throw new ValidPropertyUrlExpectedError(property);
  }
  const predicateIri = internal_toIriString(property);
  let literals = [];
  const langStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
  const locales = Object.keys(langStrings);
  for (const locale of locales) {
    const stringsInLocale = langStrings[locale];
    const localeLiterals = stringsInLocale.map((langString) => DataFactory$1.literal(langString, locale));
    literals = literals.concat(localeLiterals);
  }
  const otherLiterals = (_d = (_c = thing.predicates[predicateIri]) === null || _c === void 0 ? void 0 : _c.literals) !== null && _d !== void 0 ? _d : {};
  const dataTypes = Object.keys(otherLiterals);
  for (const dataType of dataTypes) {
    const values = otherLiterals[dataType];
    const typeNode = DataFactory$1.namedNode(dataType);
    const dataTypeLiterals = values.map((value) => DataFactory$1.literal(value, typeNode));
    literals = literals.concat(dataTypeLiterals);
  }
  return literals;
}
function getTermAll(thing, property) {
  var _a, _b;
  internal_throwIfNotThing(thing);
  const namedNodes = getNamedNodeAll(thing, property);
  const literals = getLiteralAll(thing, property);
  const predicateIri = internal_toIriString(property);
  const blankNodeValues = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.blankNodes) !== null && _b !== void 0 ? _b : [];
  const blankNodes = blankNodeValues.map((rawBlankNode) => {
    const blankNodeName = isBlankNodeId(rawBlankNode) ? getBlankNodeValue(rawBlankNode) : void 0;
    return DataFactory$1.blankNode(blankNodeName);
  });
  const terms = namedNodes.concat(literals).concat(blankNodes);
  return terms;
}
function getLiteralOfType(thing, property, literalType) {
  var _a, _b, _c, _d;
  if (!internal_isValidUrl(property)) {
    throw new ValidPropertyUrlExpectedError(property);
  }
  const predicateIri = internal_toIriString(property);
  return (_d = (_c = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.literals) === null || _b === void 0 ? void 0 : _b[literalType]) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : null;
}

function getThing(solidDataset, thingUrl, options = {}) {
  var _a;
  if (!internal_isValidUrl(thingUrl)) {
    throw new ValidThingUrlExpectedError(thingUrl);
  }
  const graph = typeof options.scope !== "undefined" ? internal_toIriString(options.scope) : "default";
  const thingsByIri = (_a = solidDataset.graphs[graph]) !== null && _a !== void 0 ? _a : {};
  const thingIri = internal_toIriString(thingUrl);
  const resolvedThingIri = isLocalNodeIri(thingIri) && hasServerResourceInfo(solidDataset) ? resolveLocalIri(getLocalNodeName(thingIri), getSourceUrl(solidDataset)) : thingIri;
  const thing = thingsByIri[resolvedThingIri];
  if (typeof thing === "undefined") {
    return null;
  }
  return thing;
}
function getThingAll(solidDataset, options = {}) {
  var _a;
  const graph = typeof options.scope !== "undefined" ? internal_toIriString(options.scope) : "default";
  const thingsByIri = (_a = solidDataset.graphs[graph]) !== null && _a !== void 0 ? _a : {};
  return Object.values(thingsByIri).filter((thing) => !isBlankNodeId(thing.url));
}
function setThing(solidDataset, thing) {
  var _a;
  const thingIri = isThingLocal(thing) && hasServerResourceInfo(solidDataset) ? resolveLocalIri(getLocalNodeName(thing.url), getSourceUrl(solidDataset)) : thing.url;
  const defaultGraph = solidDataset.graphs.default;
  const updatedDefaultGraph = freeze(Object.assign(Object.assign({}, defaultGraph), {[thingIri]: freeze(Object.assign(Object.assign({}, thing), {url: thingIri}))}));
  const updatedGraphs = freeze(Object.assign(Object.assign({}, solidDataset.graphs), {default: updatedDefaultGraph}));
  const subjectNode = DataFactory$1.namedNode(thingIri);
  const deletedThingPredicates = (_a = solidDataset.graphs.default[thingIri]) === null || _a === void 0 ? void 0 : _a.predicates;
  const deletions = typeof deletedThingPredicates !== "undefined" ? subjectToRdfJsQuads(deletedThingPredicates, subjectNode, DataFactory$1.defaultGraph()) : [];
  const additions = subjectToRdfJsQuads(thing.predicates, subjectNode, DataFactory$1.defaultGraph());
  return internal_addAdditionsToChangeLog(internal_addDeletionsToChangeLog(freeze(Object.assign(Object.assign({}, solidDataset), {graphs: updatedGraphs})), deletions), additions);
}
function createThing(options = {}) {
  var _a;
  if (typeof options.url !== "undefined") {
    const url = options.url;
    if (!internal_isValidUrl(url)) {
      throw new ValidThingUrlExpectedError(url);
    }
    const thing2 = freeze({
      type: "Subject",
      predicates: freeze({}),
      url
    });
    return thing2;
  }
  const name = (_a = options.name) !== null && _a !== void 0 ? _a : generateName();
  const localNodeIri = getLocalNodeIri(name);
  const thing = freeze({
    type: "Subject",
    predicates: freeze({}),
    url: localNodeIri
  });
  return thing;
}
function isThing(input) {
  return typeof input === "object" && input !== null && typeof input.type === "string" && input.type === "Subject";
}
function thingAsMarkdown(thing) {
  let thingAsMarkdown2 = "";
  if (isThingLocal(thing)) {
    thingAsMarkdown2 += `## Thing (no URL yet — identifier: \`#${getLocalNodeName(thing.url)}\`)
`;
  } else {
    thingAsMarkdown2 += `## Thing: ${thing.url}
`;
  }
  const predicateIris = Object.keys(thing.predicates);
  if (predicateIris.length === 0) {
    thingAsMarkdown2 += "\n<empty>\n";
  } else {
    for (const predicate of predicateIris) {
      thingAsMarkdown2 += `
Property: ${predicate}
`;
      const values = getTermAll(thing, predicate);
      values.forEach((value) => {
        thingAsMarkdown2 += `- ${internal_getReadableValue(value)}
`;
      });
    }
  }
  return thingAsMarkdown2;
}
function isThingLocal(thing) {
  return isLocalNodeIri(thing.url);
}
class ThingExpectedError extends SolidClientError {
  constructor(receivedValue) {
    const message = `Expected a Thing, but received: [${receivedValue}].`;
    super(message);
    this.receivedValue = receivedValue;
  }
}
class ValidPropertyUrlExpectedError extends SolidClientError {
  constructor(receivedValue) {
    const value = isNamedNode(receivedValue) ? receivedValue.value : receivedValue;
    const message = `Expected a valid URL to identify a property, but received: [${value}].`;
    super(message);
    this.receivedProperty = value;
  }
}
class ValidThingUrlExpectedError extends SolidClientError {
  constructor(receivedValue) {
    const value = isNamedNode(receivedValue) ? receivedValue.value : receivedValue;
    const message = `Expected a valid URL to identify a Thing, but received: [${value}].`;
    super(message);
    this.receivedValue = value;
  }
}
const generateName = () => {
  return Date.now().toString() + Math.random().toString().substring("0.".length);
};

function normalizeServerSideIri(iri) {
  const iriObj = new URL(iri);
  iriObj.hash = "";
  return iriObj.href;
}

function createSolidDataset() {
  return freeze({
    type: "Dataset",
    graphs: {
      default: {}
    }
  });
}
async function responseToSolidDataset(response, parseOptions = {}) {
  if (internal_isUnsuccessfulResponse(response)) {
    throw new FetchError(`Fetching the SolidDataset at [${response.url}] failed: [${response.status}] [${response.statusText}].`, response);
  }
  const resourceInfo = responseToResourceInfo(response);
  const parsers = Object.assign({"text/turtle": getTurtleParser()}, parseOptions.parsers);
  const contentType = getContentType(resourceInfo);
  if (contentType === null) {
    throw new Error(`Could not determine the content type of the Resource at [${getSourceUrl(resourceInfo)}].`);
  }
  const mimeType = contentType.split(";")[0];
  const parser = parsers[mimeType];
  if (typeof parser === "undefined") {
    throw new Error(`The Resource at [${getSourceUrl(resourceInfo)}] has a MIME type of [${mimeType}], but the only parsers available are for the following MIME types: [${Object.keys(parsers).join(", ")}].`);
  }
  const data = await response.text();
  const parsingPromise = new Promise((resolve, reject) => {
    let solidDataset = freeze({
      graphs: freeze({default: freeze({})}),
      type: "Dataset"
    });
    const quadsWithBlankNodes = [];
    const allQuads = [];
    parser.onError((error) => {
      reject(new Error(`Encountered an error parsing the Resource at [${getSourceUrl(resourceInfo)}] with content type [${contentType}]: ${error}`));
    });
    parser.onQuad((quad) => {
      allQuads.push(quad);
      if (quad.subject.termType === "BlankNode" || quad.object.termType === "BlankNode") {
        quadsWithBlankNodes.push(quad);
      } else {
        solidDataset = addRdfJsQuadToDataset(solidDataset, quad);
      }
    });
    parser.onComplete(async () => {
      const maxBlankNodesToDetectChainsFor = 20;
      const chainBlankNodes = quadsWithBlankNodes.length <= maxBlankNodesToDetectChainsFor ? getChainBlankNodes(quadsWithBlankNodes) : [];
      const quadsWithoutChainBlankNodeSubjects = quadsWithBlankNodes.filter((quad) => chainBlankNodes.every((chainBlankNode) => !chainBlankNode.equals(quad.subject)));
      solidDataset = quadsWithoutChainBlankNodeSubjects.reduce((datasetAcc, quad) => addRdfJsQuadToDataset(datasetAcc, quad, {
        otherQuads: allQuads,
        chainBlankNodes
      }), solidDataset);
      const solidDatasetWithResourceInfo = freeze(Object.assign(Object.assign({}, solidDataset), resourceInfo));
      resolve(solidDatasetWithResourceInfo);
    });
    parser.parse(data, resourceInfo);
  });
  return await parsingPromise;
}
async function getSolidDataset(url, options = internal_defaultFetchOptions) {
  var _a;
  url = internal_toIriString(url);
  const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
  const parserContentTypes = Object.keys((_a = options.parsers) !== null && _a !== void 0 ? _a : {});
  const acceptedContentTypes = parserContentTypes.length > 0 ? parserContentTypes.join(", ") : "text/turtle";
  const response = await config.fetch(url, {
    headers: {
      Accept: acceptedContentTypes
    }
  });
  if (internal_isUnsuccessfulResponse(response)) {
    throw new FetchError(`Fetching the Resource at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
  }
  const solidDataset = await responseToSolidDataset(response, options);
  return solidDataset;
}
async function prepareSolidDatasetUpdate(solidDataset) {
  const deleteStatement = solidDataset.internal_changeLog.deletions.length > 0 ? `DELETE DATA {${(await triplesToTurtle(solidDataset.internal_changeLog.deletions.map(getNamedNodesForLocalNodes))).trim()}};` : "";
  const insertStatement = solidDataset.internal_changeLog.additions.length > 0 ? `INSERT DATA {${(await triplesToTurtle(solidDataset.internal_changeLog.additions.map(getNamedNodesForLocalNodes))).trim()}};` : "";
  return {
    method: "PATCH",
    body: `${deleteStatement} ${insertStatement}`,
    headers: {
      "Content-Type": "application/sparql-update"
    }
  };
}
async function prepareSolidDatasetCreation(solidDataset) {
  return {
    method: "PUT",
    body: await triplesToTurtle(toRdfJsQuads(solidDataset).map(getNamedNodesForLocalNodes)),
    headers: {
      "Content-Type": "text/turtle",
      "If-None-Match": "*",
      Link: `<${ldp.Resource}>; rel="type"`
    }
  };
}
async function saveSolidDatasetAt(url, solidDataset, options = internal_defaultFetchOptions) {
  url = internal_toIriString(url);
  const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
  const datasetWithChangelog = internal_withChangeLog(solidDataset);
  const requestInit = isUpdate(datasetWithChangelog, url) ? await prepareSolidDatasetUpdate(datasetWithChangelog) : await prepareSolidDatasetCreation(datasetWithChangelog);
  const response = await config.fetch(url, requestInit);
  if (internal_isUnsuccessfulResponse(response)) {
    const diagnostics = isUpdate(datasetWithChangelog, url) ? "The changes that were sent to the Pod are listed below.\n\n" + changeLogAsMarkdown(datasetWithChangelog) : "The SolidDataset that was sent to the Pod is listed below.\n\n" + solidDatasetAsMarkdown(datasetWithChangelog);
    throw new FetchError(`Storing the Resource at [${url}] failed: [${response.status}] [${response.statusText}].

` + diagnostics, response);
  }
  const resourceInfo = Object.assign(Object.assign({}, internal_parseResourceInfo(response)), {isRawData: false});
  const storedDataset = freeze(Object.assign(Object.assign({}, solidDataset), {internal_changeLog: {additions: [], deletions: []}, internal_resourceInfo: resourceInfo}));
  const storedDatasetWithResolvedIris = resolveLocalIrisInSolidDataset(storedDataset);
  return storedDatasetWithResolvedIris;
}
async function deleteSolidDataset(solidDataset, options = internal_defaultFetchOptions) {
  const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
  const url = hasResourceInfo(solidDataset) ? internal_toIriString(getSourceUrl(solidDataset)) : internal_toIriString(solidDataset);
  const response = await config.fetch(url, {method: "DELETE"});
  if (internal_isUnsuccessfulResponse(response)) {
    throw new FetchError(`Deleting the SolidDataset at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
  }
}
function isSourceIriEqualTo(dataset, iri) {
  return normalizeServerSideIri(dataset.internal_resourceInfo.sourceIri) === normalizeServerSideIri(iri);
}
function isUpdate(solidDataset, url) {
  return hasChangelog(solidDataset) && hasResourceInfo(solidDataset) && typeof solidDataset.internal_resourceInfo.sourceIri === "string" && isSourceIriEqualTo(solidDataset, url);
}
function getContainedResourceUrlAll(solidDataset) {
  const container = getThing(solidDataset, getSourceUrl(solidDataset));
  return container !== null ? getIriAll(container, ldp.contains) : [];
}
function solidDatasetAsMarkdown(solidDataset) {
  let readableSolidDataset = "";
  if (hasResourceInfo(solidDataset)) {
    readableSolidDataset += `# SolidDataset: ${getSourceUrl(solidDataset)}
`;
  } else {
    readableSolidDataset += `# SolidDataset (no URL yet)
`;
  }
  const things = getThingAll(solidDataset);
  if (things.length === 0) {
    readableSolidDataset += "\n<empty>\n";
  } else {
    things.forEach((thing) => {
      readableSolidDataset += "\n" + thingAsMarkdown(thing);
      if (hasChangelog(solidDataset)) {
        readableSolidDataset += "\n" + getReadableChangeLogSummary(solidDataset, thing) + "\n";
      }
    });
  }
  return readableSolidDataset;
}
function changeLogAsMarkdown(solidDataset) {
  if (!hasResourceInfo(solidDataset)) {
    return "This is a newly initialized SolidDataset, so there is no source to compare it to.";
  }
  if (!hasChangelog(solidDataset) || solidDataset.internal_changeLog.additions.length === 0 && solidDataset.internal_changeLog.deletions.length === 0) {
    return `## Changes compared to ${getSourceUrl(solidDataset)}

This SolidDataset has not been modified since it was fetched from ${getSourceUrl(solidDataset)}.
`;
  }
  let readableChangeLog = `## Changes compared to ${getSourceUrl(solidDataset)}
`;
  const changeLogsByThingAndProperty = sortChangeLogByThingAndProperty(solidDataset);
  Object.keys(changeLogsByThingAndProperty).forEach((thingUrl) => {
    readableChangeLog += `
### Thing: ${thingUrl}
`;
    const changeLogByProperty = changeLogsByThingAndProperty[thingUrl];
    Object.keys(changeLogByProperty).forEach((propertyUrl) => {
      readableChangeLog += `
Property: ${propertyUrl}
`;
      const deleted = changeLogByProperty[propertyUrl].deleted;
      const added = changeLogByProperty[propertyUrl].added;
      if (deleted.length > 0) {
        readableChangeLog += "- Removed:\n";
        deleted.forEach((deletedValue) => readableChangeLog += `  - ${internal_getReadableValue(deletedValue)}
`);
      }
      if (added.length > 0) {
        readableChangeLog += "- Added:\n";
        added.forEach((addedValue) => readableChangeLog += `  - ${internal_getReadableValue(addedValue)}
`);
      }
    });
  });
  return readableChangeLog;
}
function sortChangeLogByThingAndProperty(solidDataset) {
  const changeLogsByThingAndProperty = {};
  solidDataset.internal_changeLog.deletions.forEach((deletion) => {
    var _a, _b;
    var _c;
    const subjectNode = isLocalNode(deletion.subject) ? resolveIriForLocalNode(deletion.subject, getSourceUrl(solidDataset)) : deletion.subject;
    if (!isNamedNode(subjectNode) || !isNamedNode(deletion.predicate)) {
      return;
    }
    const thingUrl = internal_toIriString(subjectNode);
    const propertyUrl = internal_toIriString(deletion.predicate);
    (_a = changeLogsByThingAndProperty[thingUrl]) !== null && _a !== void 0 ? _a : changeLogsByThingAndProperty[thingUrl] = {};
    (_b = (_c = changeLogsByThingAndProperty[thingUrl])[propertyUrl]) !== null && _b !== void 0 ? _b : _c[propertyUrl] = {
      added: [],
      deleted: []
    };
    changeLogsByThingAndProperty[thingUrl][propertyUrl].deleted.push(deletion.object);
  });
  solidDataset.internal_changeLog.additions.forEach((addition) => {
    var _a, _b;
    var _c;
    const subjectNode = isLocalNode(addition.subject) ? resolveIriForLocalNode(addition.subject, getSourceUrl(solidDataset)) : addition.subject;
    if (!isNamedNode(subjectNode) || !isNamedNode(addition.predicate)) {
      return;
    }
    const thingUrl = internal_toIriString(subjectNode);
    const propertyUrl = internal_toIriString(addition.predicate);
    (_a = changeLogsByThingAndProperty[thingUrl]) !== null && _a !== void 0 ? _a : changeLogsByThingAndProperty[thingUrl] = {};
    (_b = (_c = changeLogsByThingAndProperty[thingUrl])[propertyUrl]) !== null && _b !== void 0 ? _b : _c[propertyUrl] = {
      added: [],
      deleted: []
    };
    changeLogsByThingAndProperty[thingUrl][propertyUrl].added.push(addition.object);
  });
  return changeLogsByThingAndProperty;
}
function getReadableChangeLogSummary(solidDataset, thing) {
  const subject = DataFactory$1.namedNode(thing.url);
  const nrOfAdditions = solidDataset.internal_changeLog.additions.reduce((count, addition) => addition.subject.equals(subject) ? count + 1 : count, 0);
  const nrOfDeletions = solidDataset.internal_changeLog.deletions.reduce((count, deletion) => deletion.subject.equals(subject) ? count + 1 : count, 0);
  const additionString = nrOfAdditions === 1 ? "1 new value added" : nrOfAdditions + " new values added";
  const deletionString = nrOfDeletions === 1 ? "1 value removed" : nrOfDeletions + " values removed";
  return `(${additionString} / ${deletionString})`;
}
function getNamedNodesForLocalNodes(quad) {
  const subject = isNamedNode(quad.subject) ? getNamedNodeFromLocalNode(quad.subject) : quad.subject;
  const object = isNamedNode(quad.object) ? getNamedNodeFromLocalNode(quad.object) : quad.object;
  return DataFactory$1.quad(subject, quad.predicate, object, quad.graph);
}
function getNamedNodeFromLocalNode(node) {
  if (isLocalNodeIri(node.value)) {
    return DataFactory$1.namedNode("#" + getLocalNodeName(node.value));
  }
  return node;
}
function resolveLocalIrisInSolidDataset(solidDataset) {
  const resourceIri = getSourceUrl(solidDataset);
  const defaultGraph = solidDataset.graphs.default;
  const thingIris = Object.keys(defaultGraph);
  const updatedDefaultGraph = thingIris.reduce((graphAcc, thingIri) => {
    const resolvedThing = resolveLocalIrisInThing(graphAcc[thingIri], resourceIri);
    const resolvedThingIri = isLocalNodeIri(thingIri) ? `${resourceIri}#${getLocalNodeName(thingIri)}` : thingIri;
    const updatedGraph = Object.assign({}, graphAcc);
    delete updatedGraph[thingIri];
    updatedGraph[resolvedThingIri] = resolvedThing;
    return freeze(updatedGraph);
  }, defaultGraph);
  const updatedGraphs = freeze(Object.assign(Object.assign({}, solidDataset.graphs), {default: updatedDefaultGraph}));
  return freeze(Object.assign(Object.assign({}, solidDataset), {graphs: updatedGraphs}));
}
function resolveLocalIrisInThing(thing, baseIri) {
  const predicateIris = Object.keys(thing.predicates);
  const updatedPredicates = predicateIris.reduce((predicatesAcc, predicateIri) => {
    var _a;
    const namedNodes = (_a = predicatesAcc[predicateIri].namedNodes) !== null && _a !== void 0 ? _a : [];
    if (namedNodes.every((namedNode) => !isLocalNodeIri(namedNode))) {
      return predicatesAcc;
    }
    const updatedNamedNodes = freeze(namedNodes.map((namedNode) => isLocalNodeIri(namedNode) ? `${baseIri}#${getLocalNodeName(namedNode)}` : namedNode));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, predicatesAcc[predicateIri]), {namedNodes: updatedNamedNodes}));
    return freeze(Object.assign(Object.assign({}, predicatesAcc), {[predicateIri]: updatedPredicate}));
  }, thing.predicates);
  return freeze(Object.assign(Object.assign({}, thing), {predicates: updatedPredicates, url: isLocalNodeIri(thing.url) ? `${baseIri}#${getLocalNodeName(thing.url)}` : thing.url}));
}

const addStringNoLocale = (thing, property, value) => {
  internal_throwIfNotThing(thing);
  return addLiteralOfType(thing, property, value, xmlSchemaTypes.string);
};
function addLiteralOfType(thing, property, value, type) {
  var _a, _b, _c;
  internal_throwIfNotThing(thing);
  if (!internal_isValidUrl(property)) {
    throw new ValidPropertyUrlExpectedError(property);
  }
  const predicateIri = internal_toIriString(property);
  const existingPredicate = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
  const existingLiterals = (_b = existingPredicate.literals) !== null && _b !== void 0 ? _b : {};
  const existingValuesOfType = (_c = existingLiterals[type]) !== null && _c !== void 0 ? _c : [];
  const updatedValuesOfType = freeze(existingValuesOfType.concat(value));
  const updatedLiterals = freeze(Object.assign(Object.assign({}, existingLiterals), {[type]: updatedValuesOfType}));
  const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicate), {literals: updatedLiterals}));
  const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), {[predicateIri]: updatedPredicate}));
  const updatedThing = freeze(Object.assign(Object.assign({}, thing), {predicates: updatedPredicates}));
  return updatedThing;
}

export { Buffer as B, _polyfillNode_buffer as _, getSolidDataset as a, getStringNoLocale as b, getThingAll as c, deleteSolidDataset as d, addStringNoLocale as e, createSolidDataset as f, getContainedResourceUrlAll as g, createThing as h, isContainer as i, setThing as j, getIri as k, getThing as l, saveSolidDatasetAt as s };
