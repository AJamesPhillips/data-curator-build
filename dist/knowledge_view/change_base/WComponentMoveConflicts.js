import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Link} from "../../sharedf/Link.js";
import {lefttop_to_xy} from "../../state/display_options/display.js";
import {get_title} from "../../wcomponent_derived/rich_text/get_rich_text.js";
const map_state = (state) => ({
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
});
const connector = connect(map_state);
function _WComponentMoveConflicts(props) {
  const {wcomponents_move_conflicts, wcomponents_by_id, knowledge_views_by_id} = props;
  const created_at_ms = new Date().getTime();
  const sim_ms = created_at_ms;
  return /* @__PURE__ */ h("div", null, Object.entries(wcomponents_move_conflicts || {}).map(([wc_id, conflicts], index) => {
    const wcomponent = wcomponents_by_id[wc_id];
    const wcomponent_title = wcomponent && get_title({rich_text: true, wcomponent, wcomponents_by_id, knowledge_views_by_id, wc_id_to_counterfactuals_map: void 0, created_at_ms, sim_ms}) || wc_id;
    return /* @__PURE__ */ h("div", {
      key: wc_id
    }, /* @__PURE__ */ h(Link, {
      route: "wcomponents",
      sub_route: void 0,
      item_id: wc_id,
      args: void 0
    }, 'Component "', wcomponent_title, '" in:'), /* @__PURE__ */ h("ul", null, conflicts.map((conflict) => {
      const knowledge_view = knowledge_views_by_id[conflict.kv_id];
      const knowledge_view_title = knowledge_view?.title || conflict.kv_id;
      const position_for_middle_of_screen = lefttop_to_xy(conflict, true);
      return /* @__PURE__ */ h("li", null, /* @__PURE__ */ h(Link, {
        route: "wcomponents",
        sub_route: void 0,
        item_id: wc_id,
        args: {subview_id: conflict.kv_id, ...position_for_middle_of_screen}
      }, "    ", knowledge_view_title));
    })));
  }));
}
export const WComponentMoveConflicts = connector(_WComponentMoveConflicts);
