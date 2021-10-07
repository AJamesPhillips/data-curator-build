import {h} from "../../../snowpack/pkg/preact.js";
import {EditableListEntry} from "./EditableListEntry.js";
export function factory_render_list_content(own_props) {
  const {
    items,
    get_id,
    item_props,
    debug_item_descriptor = ""
  } = own_props;
  const render_list_content = (list_content_props) => {
    const {
      expanded_items,
      expanded_item_rows
    } = list_content_props;
    return /* @__PURE__ */ h("div", {
      style: {display: expanded_items ? "" : "none", cursor: "initial"},
      onClick: (e) => e.stopPropagation()
    }, items.map((item, index) => /* @__PURE__ */ h("div", {
      key: get_id(item)
    }, /* @__PURE__ */ h("hr", {
      className: "entries_horizontal_dividers"
    }), /* @__PURE__ */ h(EditableListEntry, {
      item,
      ...item_props,
      expanded: expanded_item_rows
    }))));
  };
  return render_list_content;
}
