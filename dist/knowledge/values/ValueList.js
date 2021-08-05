import {h} from "../../../_snowpack/pkg/preact.js";
import {useMemo} from "../../../_snowpack/pkg/preact/hooks.js";
import {get_new_value_id} from "../../shared/utils/ids.js";
import {EditableList} from "../../form/editable_list/EditableList.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {get_new_created_ats} from "../../shared/utils/datetime.js";
export function ValueList(props) {
  const item_top_props = useMemo(() => {
    const props2 = {
      get_created_at,
      get_custom_created_at,
      get_summary,
      get_details
    };
    return props2;
  }, []);
  return /* @__PURE__ */ h(EditableList, {
    items: props.values,
    item_descriptor: "Value",
    get_id,
    item_top_props,
    prepare_new_item: prepare_new_item(props.creation_context),
    update_items: (items) => props.update_values(items),
    disable_collapsed: true
  });
}
const get_id = (item) => item.id;
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
const prepare_new_item = (creation_context) => () => {
  const created_ats = get_new_created_ats(creation_context);
  return {
    id: get_new_value_id(),
    ...created_ats,
    value: "",
    start_datetime: created_ats.custom_created_at || created_ats.created_at,
    description: ""
  };
};
function get_summary(item, on_change) {
  return /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Value:   ", /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "value...",
    value: item.value || "",
    conditional_on_change: (new_value) => {
      const value = new_value && new_value.trim();
      if (on_change)
        on_change({...item, value});
    }
  }));
}
function get_details(item, on_change) {
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", null, "Description: ", /* @__PURE__ */ h(EditableText, {
    placeholder: "Description...",
    value: item.description,
    conditional_on_change: on_change && ((new_d) => on_change({...item, description: new_d}))
  })));
}
