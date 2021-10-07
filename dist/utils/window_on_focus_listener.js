const window_on_focus_listeners = [];
export function setup_window_on_focus_listener() {
  window.addEventListener("focus", function() {
    window_on_focus_listeners.forEach((listener) => listener());
  }, false);
}
export function register_window_on_focus_listener(listener) {
  window_on_focus_listeners.push(listener);
}
