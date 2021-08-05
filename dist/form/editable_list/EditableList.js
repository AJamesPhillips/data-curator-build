import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import {ExpandableListWithAddButton} from "./ExpandableListWithAddButton.js";
import {NewItemForm} from "./NewItemForm.js";
import {factory_render_list_content} from "./render_list_content.js";
export function EditableList(props) {
  const [new_item, set_new_item] = useState(void 0);
  const render_list_content = factory_render_list_content({
    items: props.items,
    get_id: props.get_id,
    update_items: props.update_items,
    item_top_props: props.item_top_props,
    debug_item_descriptor: props.item_descriptor
  });
  return /* @__PURE__ */ h(ExpandableListWithAddButton, {
    items_count: props.items.length,
    on_click_new_item: () => {
      const item = props.prepare_new_item();
      set_new_item(item);
    },
    content: (list_content_props) => {
      return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(NewItemForm, {
        new_item,
        set_new_item,
        item_top_props: props.item_top_props,
        item_descriptor: props.item_descriptor,
        add_item: (new_item2) => {
          props.update_items([...props.items, new_item2]);
          set_new_item(void 0);
        }
      }), render_list_content(list_content_props));
    },
    ...props
  });
}
