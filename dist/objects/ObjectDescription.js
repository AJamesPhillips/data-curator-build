import {h} from "../../snowpack/pkg/preact.js";
import {ObjectLabels} from "./ObjectLabels.js";
import {object_content} from "./object_content.js";
export function ObjectDescription(props) {
  return /* @__PURE__ */ h("div", null, object_content({object: props.object}), /* @__PURE__ */ h(ObjectLabels, {
    object: props.object
  }));
}
