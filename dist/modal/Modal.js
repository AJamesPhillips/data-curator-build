import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import "./Modal.css.proxy.js";
function map_state(state, own_props) {
  const is_escape = state.global_keys.last_key === "Escape";
  const {last_key_time_stamp = 0} = state.global_keys;
  const should_close = is_escape && last_key_time_stamp > own_props.time_stamp_first_rendered;
  return {should_close};
}
const connector = connect(map_state);
function _ModalCore(props) {
  if (props.should_close)
    setTimeout(() => props.on_close(), 0);
  return /* @__PURE__ */ h("div", {
    id: "modal_background",
    onClick: () => props.on_close()
  }, /* @__PURE__ */ h("div", {
    id: "modal_container",
    onClick: (e) => e.stopPropagation()
  }, props.title, /* @__PURE__ */ h("div", {
    id: "modal_close",
    onClick: () => props.on_close()
  }, /* @__PURE__ */ h("span", null, "X")), props.child()));
}
const ModalCore = connector(_ModalCore);
export function Modal(props) {
  const time_stamp_first_rendered = performance.now();
  return /* @__PURE__ */ h(ModalCore, {
    ...props,
    time_stamp_first_rendered
  });
}
