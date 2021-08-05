import {h} from "../../_snowpack/pkg/preact.js";
import {Link} from "../sharedf/Link.js";
import {ObjectLabels} from "./ObjectLabels.js";
import {object_content} from "./object_content.js";
export function ObjectListEntry(props) {
  return [
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(Link, {
      route: "objects",
      sub_route: null,
      item_id: props.object.id,
      args: void 0,
      on_pointer_down: props.on_click
    }, object_content({object: props.object}))),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(ObjectLabels, {
      object: props.object
    }))
  ];
}
