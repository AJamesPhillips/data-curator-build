import {h} from "../../../_snowpack/pkg/preact.js";
import {SelectPattern} from "../../patterns/SelectPattern.js";
export function ObjectBulkImportModel(props) {
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "text",
    value: props.name,
    onChange: handle_event(props.on_change("name")),
    placeholder: "Name"
  }), /* @__PURE__ */ h("input", {
    type: "text",
    value: props.table_id,
    onChange: handle_event(props.on_change("table_id")),
    placeholder: "Table ID"
  }), /* @__PURE__ */ h("input", {
    type: "text",
    value: props.view_id,
    onChange: handle_event(props.on_change("view_id")),
    placeholder: "View ID"
  }), /* @__PURE__ */ h(SelectPattern, {
    pattern_id: props.pattern_id,
    disabled: false,
    on_change_pattern: (item) => props.on_change("pattern_id")(item.id)
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "X",
    onClick: props.delete
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
const handle_event = (on_change) => (e) => on_change(e.currentTarget.value);
