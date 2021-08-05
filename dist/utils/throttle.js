export function throttle(func, delay) {
  let timeout = void 0;
  const cancel = () => {
    if (timeout)
      clearTimeout(timeout);
  };
  let pending_args = void 0;
  const throttled = (...args) => {
    cancel();
    pending_args = args;
    timeout = setTimeout(() => {
      func(...args);
      pending_args = void 0;
    }, delay);
  };
  const flush = () => {
    cancel();
    if (pending_args) {
      func(...pending_args);
      pending_args = void 0;
    }
  };
  return {throttled, cancel, flush};
}
