import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {
  get_summary_for_single_VAP_set,
  get_details_for_single_VAP_set,
  get_details2_for_single_VAP_set
} from "./common.js";
import {factory_render_list_content} from "../../form/editable_list/render_list_content.js";
import {ExpandableListWithAddButton} from "../../form/editable_list/ExpandableListWithAddButton.js";
import {create_new_VAP_set_version} from "./utils.js";
const map_state = (state) => {
  return {
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _ValueAndPredictionSetOlderVersions(props) {
  const {VAPs_represent, older_VAP_sets, create_item, update_item, delete_item, editing} = props;
  const item_descriptor = "Older version";
  const make_new_version = useMemo(() => () => {
    const new_versioned_VAP_set = create_new_VAP_set_version(props.current_VAP_set, props.creation_context);
    create_item(new_versioned_VAP_set);
  }, [props.current_VAP_set, props.creation_context, create_item]);
  const content = useMemo(() => factory_render_list_content({
    items: older_VAP_sets,
    get_id,
    debug_item_descriptor: item_descriptor,
    item_props: {
      get_created_at,
      get_custom_created_at,
      get_summary: get_summary_for_single_VAP_set(VAPs_represent, true),
      get_details: get_details_for_single_VAP_set(VAPs_represent),
      get_details2: get_details2_for_single_VAP_set(VAPs_represent, editing),
      extra_class_names: "value_and_prediction_set",
      crud: {
        create_item,
        update_item,
        delete_item
      },
      delete_button_text: "Delete Older Set of Value & Predictions"
    }
  }), [older_VAP_sets, item_descriptor, VAPs_represent, editing, create_item, update_item, delete_item]);
  return /* @__PURE__ */ h(ExpandableListWithAddButton, {
    items_count: older_VAP_sets.length,
    item_descriptor,
    new_item_descriptor: "Version",
    content,
    on_click_new_item: make_new_version
  });
}
export const ValueAndPredictionSetOlderVersions = connector(_ValueAndPredictionSetOlderVersions);
const get_id = (item) => item.id;
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
