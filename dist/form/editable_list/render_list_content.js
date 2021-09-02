import {h} from "../../../snowpack/pkg/preact.js";
import {upsert_entry, remove_from_list_by_predicate} from "../../utils/list.js";
import {EditableListEntry} from "./EditableListEntry.js";
export function factory_render_list_content(own_props) {
  const {
    items,
    get_id,
    update_items,
    item_top_props,
    debug_item_descriptor = ""
  } = own_props;
  const render_list_content = (list_content_props) => {
    const {
      disable_partial_collapsed,
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
      ...item_top_props,
      expanded: expanded_item_rows,
      disable_collapsable: disable_partial_collapsed,
      on_change: (item2) => {
        const predicate_by_id = (other) => get_id(item2) === get_id(other);
        const new_items = upsert_entry(items, item2, predicate_by_id, debug_item_descriptor);
        update_items(new_items);
      },
      delete_button_text: "Delete Value & Prediction",
      delete_item: () => {
        const predicate_by_id = (other) => get_id(item) === get_id(other);
        const new_items = remove_from_list_by_predicate(items, predicate_by_id);
        update_items(new_items);
      }
    }))));
  };
  return render_list_content;
}
