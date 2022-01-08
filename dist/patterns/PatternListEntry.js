import {h} from "../../snowpack/pkg/preact.js";
import {Link} from "../sharedf/Link.js";
export function PatternListEntry(props) {
  return [
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(Link, {
      route: "patterns",
      sub_route: null,
      item_id: props.pattern.id,
      args: void 0
    }, props.pattern.name)),
    /* @__PURE__ */ h("td", null)
  ];
}
