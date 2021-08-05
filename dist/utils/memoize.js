import {performance_logger} from "./performance.js";
export function memoize(func, opts = {}) {
  const {
    cache_limit = 2,
    name = func.name
  } = opts;
  let cache = [];
  function in_cache(args_new) {
    return cache.find((cache_entry) => {
      let matches_all = true;
      if (args_new.length !== cache_entry.args.length)
        return false;
      cache_entry.args.forEach((cached_arg, index) => matches_all = matches_all && cached_arg === args_new[index]);
      return matches_all;
    });
  }
  return (...args) => {
    const cached_hit = in_cache(args);
    if (cached_hit) {
      performance_logger(`Cache hit "${name}"`);
      return cached_hit.result;
    }
    performance_logger(`Cache miss "${name}"`);
    const new_result = func(...args);
    cache.push({args, result: new_result});
    cache = cache.slice(-cache_limit);
    return new_result;
  };
}
export function factory_memoize_object() {
  let cache = void 0;
  return function memoize_object(new_object) {
    if (!cache || Object.keys(cache).length !== Object.keys(new_object).length) {
      cache = new_object;
    } else {
      for (const key in cache) {
        if (cache[key] !== new_object[key]) {
          cache = new_object;
          break;
        }
      }
    }
    return cache;
  };
}
