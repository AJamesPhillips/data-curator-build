import {h} from "../../snowpack/pkg/preact.js";
import {Button} from "../sharedf/Button.js";
import {
  conditionally_expand_selected_components,
  conditionally_contract_selected_components,
  conditionally_select_all_components,
  conditionally_select_forward_causal_components,
  conditionally_select_source_causal_components,
  conditionally_select_interconnections
} from "../state/specialised_objects/meta_wcomponents/selecting/helpers.js";
import {get_store} from "../state/store.js";
export function SelectionControlSidePanel(props) {
  const store = get_store();
  return /* @__PURE__ */ h("div", {
    className: "side_panel"
  }, /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Expand towards causes (backwards)",
    fullWidth: true,
    onClick: () => conditionally_select_source_causal_components(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + s + c")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Expand towards effects (forwards)",
    fullWidth: true,
    onClick: () => conditionally_select_forward_causal_components(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + s + f")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Select all components",
    fullWidth: true,
    onClick: () => conditionally_select_all_components(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + a")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Expand selection (in all directions)",
    fullWidth: true,
    onClick: () => conditionally_expand_selected_components(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + s + e")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Contract selection (in all directions)",
    fullWidth: true,
    onClick: () => conditionally_contract_selected_components(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + s + d")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h(Button, {
    value: "Select components inbetween",
    fullWidth: true,
    onClick: () => conditionally_select_interconnections(store)
  }), /* @__PURE__ */ h("div", {
    className: "description"
  }, "ctrl + s + i     Only selects the immediate components inbetween.  e.g. if A---B-->C---D-->E, the selecting selecting node A and node C followed by this command will also select connection B.  But if only node A and node E are selected, then this command will not do anything.")));
}
