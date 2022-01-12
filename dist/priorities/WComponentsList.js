import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {ACTIONS} from "../state/actions.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
const map_state = (state) => {
  return {wcomponents_by_id: state.specialised_objects.wcomponents_by_id};
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _WComponentsList(props) {
  const {wcomponent_ids = [], wcomponents_by_id} = props;
  const wcomponents = wcomponent_ids.map((id) => wcomponents_by_id[id]).filter(is_defined);
  const wc_id_to_counterfactuals_map = {};
  const created_at_ms = new Date().getTime();
  const sim_ms = created_at_ms;
  return /* @__PURE__ */ h("table", {
    class: "list"
  }, /* @__PURE__ */ h("tbody", null, wcomponents.map((wcomponent) => /* @__PURE__ */ h("tr", {
    style: {cursor: "pointer"},
    onClick: () => props.change_route({item_id: wcomponent.id})
  }, get_title({
    rich_text: true,
    wcomponent,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map,
    created_at_ms,
    sim_ms
  })))));
}
export const WComponentsList = connector(_WComponentsList);
