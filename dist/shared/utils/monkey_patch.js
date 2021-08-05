export {};
if (!Array.prototype.first) {
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function first() {
      return this[0];
    }
  });
}
if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function last() {
      return this[this.length - 1];
    }
  });
}
if (!Array.prototype.find_last) {
  Object.defineProperty(Array.prototype, "find_last", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function find_last(predicate) {
      for (let index = this.length - 1; index >= 0; --index) {
        if (predicate(this[index]))
          return this[index];
      }
      return void 0;
    }
  });
}
