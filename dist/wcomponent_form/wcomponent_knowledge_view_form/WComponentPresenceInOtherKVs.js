import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Link} from "../../sharedf/Link.js";
import {lefttop_to_xy} from "../../state/display_options/display.js";
import {get_current_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
const map_state = (state, own_props) => {
  const {wcomponent_id} = own_props;
  const current_knowledge_view = get_current_knowledge_view_from_state(state);
  const knowledge_view_entry = current_knowledge_view && current_knowledge_view.wc_id_map[wcomponent_id];
  const all_knowledge_views = state.derived.knowledge_views;
  return {
    knowledge_view_id: current_knowledge_view && current_knowledge_view.id,
    knowledge_view_entry,
    all_knowledge_views
  };
};
const connector = connect(map_state);
function _WComponentPresenceInOtherKVs(props) {
  const {knowledge_view_id, wcomponent_id, knowledge_view_entry} = props;
  const other_knowledge_views = props.all_knowledge_views.filter(({id}) => id !== knowledge_view_id).filter(({wc_id_map}) => {
    const entry = wc_id_map[wcomponent_id];
    return entry && !entry.blocked && !entry.passthrough;
  });
  if (other_knowledge_views.length === 0)
    return null;
  const not_present = !knowledge_view_entry || knowledge_view_entry.blocked || knowledge_view_entry.passthrough;
  return /* @__PURE__ */ h("div", null, not_present ? "Present" : "Also", " in:", other_knowledge_views.map((kv) => {
    const entry = kv.wc_id_map[props.wcomponent_id];
    const pos = lefttop_to_xy(entry, true);
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Link, {
      route: void 0,
      sub_route: void 0,
      item_id: void 0,
      args: {subview_id: kv.id, ...pos}
    }, kv.title));
  }));
}
export const WComponentPresenceInOtherKVs = connector(_WComponentPresenceInOtherKVs);
