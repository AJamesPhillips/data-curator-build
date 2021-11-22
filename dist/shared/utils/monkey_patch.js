export {};
if (!Array.prototype.first) {
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function first(that) {
      return that[0];
    }
  });
}
if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function last(that) {
      return that[that.length - 1];
    }
  });
}
if (!Array.prototype.find_last) {
  Object.defineProperty(Array.prototype, "find_last", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function find_last(that, predicate) {
      for (let index = that.length - 1; index >= 0; --index) {
        if (predicate(that[index]))
          return that[index];
      }
      return void 0;
    }
  });
}
