import {prepare_new_VAP, prepare_new_VAP_set} from "../../../knowledge/multiple_values/utils.js";
import {get_new_wcomponent_object} from "../../../shared/wcomponent/get_new_wcomponent_object.js";
import {test} from "../../../shared/utils/test.js";
import {update_substate, update_subsubstate} from "../../../utils/update_state.js";
import {is_upsert_wcomponent, is_delete_wcomponent} from "./actions.js";
import {tidy_wcomponent} from "./tidy_wcomponent.js";
import {bulk_editing_wcomponents_reducer} from "./bulk_edit/reducer.js";
import {VAPsType} from "../../../shared/wcomponent/interfaces/generic_value.js";
export const wcomponents_reducer = (state, action) => {
  if (is_upsert_wcomponent(action)) {
    const wcomponent = tidy_wcomponent(action.wcomponent);
    const wcomponent_id = wcomponent.id;
    state = update_subsubstate(state, "specialised_objects", "wcomponents_by_id", wcomponent_id, wcomponent);
  }
  if (is_delete_wcomponent(action)) {
    const {wcomponent_id} = action;
    const map = {...state.specialised_objects.wcomponents_by_id};
    const existing = map[wcomponent_id];
    if (existing) {
      delete map[wcomponent_id];
      state = update_substate(state, "specialised_objects", "wcomponents_by_id", map);
    }
  }
  state = bulk_editing_wcomponents_reducer(state, action);
  return state;
};
function run_tests() {
  console.log("running tests of tidy_wcomponent");
  const sort_list = false;
  const dt1 = new Date("2021-05-12");
  const dt2 = new Date("2021-05-13");
  const creation_context = {use_creation_context: false, creation_context: {
    label_ids: []
  }};
  let wcomponent;
  let VAPs;
  let tidied;
  let tidied_VAPs;
  wcomponent = get_new_wcomponent_object({type: "statev2", subtype: "other"}, creation_context);
  wcomponent.values_and_prediction_sets = [
    {...prepare_new_VAP_set(VAPsType.undefined, [], creation_context), id: "vps2", created_at: dt2, custom_created_at: void 0},
    {...prepare_new_VAP_set(VAPsType.undefined, [], creation_context), id: "vps1", created_at: dt1, custom_created_at: void 0}
  ];
  tidied = tidy_wcomponent(wcomponent);
  test(tidied.values_and_prediction_sets.map(({id}) => id), ["vps1", "vps2"], sort_list);
  wcomponent = get_new_wcomponent_object({type: "statev2", subtype: "other"}, creation_context);
  VAPs = [
    {...prepare_new_VAP(), id: "VAP1", relative_probability: 5},
    {...prepare_new_VAP(), id: "VAP2", relative_probability: 0}
  ];
  wcomponent.values_and_prediction_sets = [
    {...prepare_new_VAP_set(VAPsType.undefined, [], creation_context), entries: VAPs}
  ];
  tidied = tidy_wcomponent(wcomponent);
  test(tidied.values_and_prediction_sets[0].entries.map(({probability}) => probability), [1, 0], sort_list);
  wcomponent = {...wcomponent, subtype: "boolean"};
  tidied = tidy_wcomponent(wcomponent);
  tidied_VAPs = tidied.values_and_prediction_sets[0].entries;
  test(tidied_VAPs.map(({relative_probability: rp}) => rp), [5, 0], sort_list);
  test(tidied_VAPs.map(({probability}) => probability), [1, 0], sort_list);
  VAPs = [
    {...prepare_new_VAP(), id: "VAP1", relative_probability: 5, probability: 0},
    {...prepare_new_VAP(), id: "VAP2", relative_probability: 0, probability: 1}
  ];
  let values_and_prediction_sets = [
    {...prepare_new_VAP_set(VAPsType.undefined, [], creation_context), entries: VAPs}
  ];
  wcomponent = {...wcomponent, subtype: "boolean", values_and_prediction_sets};
  tidied = tidy_wcomponent(wcomponent);
  tidied_VAPs = tidied.values_and_prediction_sets[0].entries;
  test(tidied_VAPs.map(({relative_probability: rp}) => rp), [5, 0], sort_list);
  test(tidied_VAPs.map(({probability}) => probability), [0, 1], sort_list);
}
