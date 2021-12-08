import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {GenericData} from "./generic_data/GenericData.js";
export function DataApp() {
  const [view, set_view] = useState("generic_data");
  const view_spaces = view === "spaces";
  const view_generic_data = view === "generic_data";
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("button", {
    onClick: () => set_view("generic_data"),
    style: {backgroundColor: view_generic_data ? "white" : ""}
  }, "Data")), /* @__PURE__ */ h("br", null), view_generic_data && /* @__PURE__ */ h(GenericData, null));
}
