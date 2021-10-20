export function throttle(func, delay_ms) {
  let timeout = void 0;
  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
  };
  let pending_args = void 0;
  const throttled = (...args) => {
    cancel();
    pending_args = args;
    timeout = setTimeout(() => {
      func(...args);
      pending_args = void 0;
    }, delay_ms);
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
export function min_throttle(func, delay_ms) {
  let timeout = void 0;
  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
  };
  let pending_args = {args: void 0};
  let next_call_at_ms = void 0;
  const throttled = (...args) => {
    pending_args.args = args;
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...pending_args.args);
        pending_args.args = void 0;
        timeout = void 0;
      }, delay_ms);
      next_call_at_ms = performance.now() + delay_ms;
    }
    return next_call_at_ms;
  };
  let will_flush = void 0;
  const flush = () => {
    if (!will_flush) {
      will_flush = new Promise((resolve) => {
        setTimeout(() => {
          cancel();
          will_flush = void 0;
          if (pending_args.args) {
            const args = pending_args.args;
            pending_args.args = void 0;
            resolve(func(...args));
          }
          resolve(void 0);
        }, 0);
      });
    }
    return will_flush;
  };
  return {throttled, cancel, flush};
}
