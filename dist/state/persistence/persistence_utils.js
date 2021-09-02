export function persist_state_object(key, obj) {
  localStorage.setItem("persisted_" + key, JSON.stringify(obj));
}
export function get_persisted_state_object(key) {
  try {
    return JSON.parse(localStorage.getItem("persisted_" + key) || "{}");
  } catch (e) {
    return {};
  }
}
