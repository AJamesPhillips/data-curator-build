import {h} from "../../_snowpack/pkg/preact.js";
import {PatternAttributeListEntry, PatternAttributeListHeader} from "./PatternAttributeListEntry.js";
export function PatternAttributesList(props) {
  return /* @__PURE__ */ h("table", null, /* @__PURE__ */ h(PatternAttributeListHeader, null), props.attributes.map((attribute, i) => /* @__PURE__ */ h("tr", null, /* @__PURE__ */ h(PatternAttributeListEntry, {
    attribute,
    editable: false
  }))));
}
