import {h} from "../../../_snowpack/pkg/preact.js";
import {
  create_new_VAP_set_version
} from "./utils.js";
import {ExpandableListWithAddButton} from "../../form/editable_list/ExpandableListWithAddButton.js";
import {
  get_summary_for_single_VAP_set,
  get_details_for_single_VAP_set,
  get_details2_for_single_VAP_set
} from "./common.js";
import {factory_render_list_content} from "../../form/editable_list/render_list_content.js";
export function ValueAndPredictionSetOlderVersions(props) {
  const make_new_version = () => {
    const new_versioned_VAP_set = create_new_VAP_set_version(props.versioned_VAP_set, props.creation_context);
    props.update_versioned_VAP_set(new_versioned_VAP_set);
  };
  const items = props.versioned_VAP_set.older;
  const item_descriptor = "Older version";
  return /* @__PURE__ */ h(ExpandableListWithAddButton, {
    items_count: items.length,
    item_descriptor,
    new_item_descriptor: "Version",
    content: factory_render_list_content({
      items,
      get_id,
      update_items: (older) => {
        props.update_versioned_VAP_set({...props.versioned_VAP_set, older});
      },
      debug_item_descriptor: item_descriptor,
      item_top_props: {
        get_created_at,
        get_custom_created_at,
        get_summary: get_summary_for_single_VAP_set(props.VAPs_represent, true, void 0),
        get_details: get_details_for_single_VAP_set(props.VAPs_represent),
        get_details2: get_details2_for_single_VAP_set(props.VAPs_represent, props.editing),
        extra_class_names: "value_and_prediction_set"
      }
    }),
    on_click_new_item: make_new_version
  });
}
const get_id = (item) => item.id;
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
