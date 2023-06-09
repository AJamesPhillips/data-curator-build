import {h} from "../../snowpack/pkg/preact.js";
import {LabelV2} from "./LabelV2.js";
export function LabelsListV2(props) {
  return /* @__PURE__ */ h("div", {
    style: {display: "flex", flexWrap: "wrap"}
  }, (props.label_ids || []).map((id) => /* @__PURE__ */ h(LabelV2, {
    wcomponent_id: id
  })));
}
