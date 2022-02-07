import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {
  wcomponent_has_legitimate_non_empty_state_VAP_sets,
  wcomponent_has_validity_predictions,
  wcomponent_is_action,
  wcomponent_is_goal,
  wcomponent_is_judgement_or_objective,
  wcomponent_is_plain_connection
} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
const map_state = (state) => {
  return {
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
  };
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _WComponentBackReferences(props) {
  const {wcomponent_id, wcomponents_by_id, knowledge_views_by_id} = props;
  const [show_back_references, set_show_back_references] = useState(false);
  const [other_wcomponents, set_other_wcomponents] = useState([]);
  useEffect(() => {
    let relevant_wcomponents = [];
    if (show_back_references) {
      relevant_wcomponents = Object.values(wcomponents_by_id).filter((wc) => !wc.deleted_at).filter((wc) => {
        return wc.title.includes(wcomponent_id) || wc.description.includes(wcomponent_id) || (wc.label_ids || []).includes(wcomponent_id) || (wcomponent_is_goal(wc) || wcomponent_is_action(wc)) && (wc.parent_goal_or_action_ids || []).includes(wcomponent_id) || wcomponent_is_judgement_or_objective(wc) && wc.judgement_target_wcomponent_id === wcomponent_id || wcomponent_has_legitimate_non_empty_state_VAP_sets(wc) && wc.values_and_prediction_sets.find((vap_set) => {
          return vap_set.entries.find((vap) => (vap.explanation || "").includes(wcomponent_id));
        }) || wcomponent_has_validity_predictions(wc) && wc.validity.find((prediction) => {
          return (prediction.explanation || "").includes(wcomponent_id);
        }) || wcomponent_is_plain_connection(wc) && (wc.from_id === wcomponent_id || wc.to_id === wcomponent_id);
      });
    }
    set_other_wcomponents(relevant_wcomponents);
  }, [wcomponent_id, wcomponents_by_id, show_back_references]);
  if (!show_back_references)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
      value: "Show back references",
      onClick: () => set_show_back_references(true)
    }));
  if (other_wcomponents.length === 0)
    return /* @__PURE__ */ h("div", null, "No back references");
  const created_at_ms = new Date().getTime();
  const sim_ms = created_at_ms;
  return /* @__PURE__ */ h("div", null, "Back references:", other_wcomponents.map((wcomponent) => {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Link, {
      route: void 0,
      sub_route: void 0,
      item_id: wcomponent.id,
      args: void 0
    }, /* @__PURE__ */ h(Markdown, null, get_title({rich_text: true, wcomponent, wcomponents_by_id, knowledge_views_by_id, wc_id_to_counterfactuals_map: void 0, created_at_ms, sim_ms}))));
  }));
}
export const WComponentBackReferences = connector(_WComponentBackReferences);
