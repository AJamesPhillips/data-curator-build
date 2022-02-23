import {h} from "../../snowpack/pkg/preact.js";
import AddIcon from "../../snowpack/pkg/@material-ui/icons/Add.js";
import "./AddNewActionButton.css.proxy.js";
import {Button} from "../sharedf/Button.js";
import {create_wcomponent} from "../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {get_next_available_wc_map_position} from "../knowledge_view/utils/next_wc_map_position.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {set_action_VAP_set_state} from "../wcomponent_form/values_and_predictions/handle_update_VAP_sets.js";
import {ACTION_VALUE_POSSIBILITY_ID} from "../wcomponent/value/parse_value.js";
import {update_value_possibilities_with_VAPSets} from "../wcomponent/CRUD_helpers/update_possibilities_with_VAPSets.js";
const map_state = (state) => ({
  creation_context: state.creation_context
});
const connector = connect(map_state);
function _AddNewActionButton(props) {
  const {
    most_recent_action_id,
    composed_knowledge_view,
    wcomponents_by_id,
    base_id,
    list_type,
    creation_context
  } = props;
  if (!composed_knowledge_view)
    return null;
  const {id: knowledge_view_id, composed_wc_id_map} = composed_knowledge_view;
  function handle_click() {
    const next_action_position = get_next_available_wc_map_position(composed_wc_id_map, most_recent_action_id, wcomponents_by_id) || {left: 0, top: 0};
    let values_and_prediction_sets = [];
    const is_todo = list_type === "todo";
    const is_in_progress = list_type === "in_progress";
    const is_done = list_type === "done";
    if (is_in_progress || is_done) {
      values_and_prediction_sets = set_action_VAP_set_state({
        existing_value_possibilities: void 0,
        orig_values_and_prediction_sets: [],
        base_id,
        creation_context,
        action_value_possibility_id: ACTION_VALUE_POSSIBILITY_ID.action_in_progress
      });
      if (is_done) {
        let datetime = new Date();
        const one_hour_in_milliseconds = 3600 * 1e3;
        datetime = new Date(datetime.getTime() - one_hour_in_milliseconds);
        values_and_prediction_sets[0].datetime.value = datetime;
      }
    }
    if (is_done) {
      values_and_prediction_sets = set_action_VAP_set_state({
        existing_value_possibilities: void 0,
        orig_values_and_prediction_sets: values_and_prediction_sets,
        base_id,
        creation_context,
        action_value_possibility_id: ACTION_VALUE_POSSIBILITY_ID.action_completed
      });
    }
    const value_possibilities = update_value_possibilities_with_VAPSets(void 0, values_and_prediction_sets);
    create_wcomponent({
      wcomponent: {
        base_id,
        type: "action",
        values_and_prediction_sets,
        value_possibilities,
        todo_index: is_todo ? new Date().getTime() : void 0
      },
      add_to_knowledge_view: {
        id: knowledge_view_id,
        position: next_action_position
      }
    });
  }
  return /* @__PURE__ */ h(Button, {
    className: "add_new_action_button",
    fullWidth: false,
    onClick: (e) => handle_click()
  }, /* @__PURE__ */ h(AddIcon, null));
}
export const AddNewActionButton = connector(_AddNewActionButton);
