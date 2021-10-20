export function pub_sub_factory(middleware = {}) {
  const all_subscribers = {};
  function pub(topic, message) {
    const maybe_middleware_function = middleware[topic];
    if (maybe_middleware_function) {
      const result = maybe_middleware_function(message);
      if (!result.continue)
        return;
      message = result.message;
    }
    const maybe_subscribers = all_subscribers[topic];
    const subscribers = maybe_subscribers === void 0 ? [] : maybe_subscribers;
    subscribers.forEach((subscriber) => {
      setTimeout(() => subscriber(message), 0);
    });
  }
  function sub(topic, subscriber) {
    const maybe_subscribers = all_subscribers[topic];
    const subscribers = maybe_subscribers === void 0 ? [] : maybe_subscribers;
    subscribers.push(subscriber);
    all_subscribers[topic] = subscribers;
    return unsubscribe_factory(topic, subscriber);
  }
  function unsubscribe_factory(topic, subscriber) {
    return () => {
      const maybe_subscribers = all_subscribers[topic];
      const subscribers = maybe_subscribers === void 0 ? [] : maybe_subscribers;
      const new_subscribers = subscribers.filter((s) => s !== subscriber);
      all_subscribers[topic] = new_subscribers;
    };
  }
  return {pub, sub};
}
