import {h} from "../../_snowpack/pkg/preact.js";
import {useState} from "../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
const map_dispatch = {
  noop: () => ({type: "noop"}),
  toggle_consumption_formatting: () => ACTIONS.display.toggle_consumption_formatting({})
};
const connector = connect(null, map_dispatch);
function _DebugMemory(props) {
  const [i, set_i] = useState(0);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("button", {
    onPointerDown: () => call(set_i, i, props.noop, 1)
  }, "noop"), /* @__PURE__ */ h("button", {
    onPointerDown: () => call(set_i, i, props.toggle_consumption_formatting, 1)
  }, "toggle"), /* @__PURE__ */ h("button", {
    onPointerDown: () => call(set_i, i, props.noop, 99)
  }, "noop 99"), /* @__PURE__ */ h("button", {
    onPointerDown: () => call(set_i, i, props.toggle_consumption_formatting, 99)
  }, "toggle 99"), /* @__PURE__ */ h("div", null, "Iteration: ", i, /* @__PURE__ */ h("br", null), "Memory total: ", Math.round(performance.memory.totalJSHeapSize / 1e6), /* @__PURE__ */ h("br", null), "Used: ", Math.round(performance.memory.usedJSHeapSize / 1e6)));
}
export const DebugMemory = connector(_DebugMemory);
const call = async (set_i, i, func, num) => {
  while (num > 0) {
    num--;
    set_i(++i);
    func();
    await wait(10);
  }
};
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
