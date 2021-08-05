import {h} from "../../_snowpack/pkg/preact.js";
import {LabelsList} from "../labels/LabelsList.js";
import {Link} from "../sharedf/Link.js";
export function StatementListEntry(props) {
  return [
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(Link, {
      route: "statements",
      sub_route: null,
      item_id: props.statement.id,
      args: void 0,
      on_pointer_down: props.on_click
    }, props.statement.content)),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(LabelsList, {
      labels: props.statement.labels
    }))
  ];
}
