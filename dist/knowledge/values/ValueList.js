import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import {get_new_value_id} from "../../shared/utils/ids.js";
import {EditableList} from "../../form/editable_list/EditableList.js";
import {get_new_created_ats} from "../../shared/utils/datetime.js";
export function ValueList(props) {
  const item_props = useMemo(() => ({
    get_created_at,
    get_custom_created_at,
    get_summary,
    get_details,
    crud: {
      update_item: () => {
      },
      create_item: () => {
      }
    }
  }), []);
  return /* @__PURE__ */ h(EditableList, {
    items: props.values,
    item_descriptor: "Value",
    get_id,
    item_props,
    prepare_new_item: () => prepare_new_item(props.base_id),
    disable_collapsed: true
  });
}
const get_id = (item) => item.id;
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
const prepare_new_item = (base_id) => {
  const created_ats = get_new_created_ats();
  return {
    id: get_new_value_id(),
    ...created_ats,
    base_id,
    value: "",
    start_datetime: created_ats.custom_created_at || created_ats.created_at,
    description: ""
  };
};
function get_summary(item, crud) {
  return /* @__PURE__ */ h(TextField, {
    size: "small",
    label: "Value",
    variant: "outlined",
    value: item.value
  });
}
function get_details(item, crud) {
  return /* @__PURE__ */ h(TextField, {
    size: "small",
    label: "Description",
    variant: "outlined",
    value: item.description
  });
}
