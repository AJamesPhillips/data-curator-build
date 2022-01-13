import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {AutoAwesomeMotionIcon} from "../../sharedf/icons/AutoAwesomeMotionIcon.js";
import {ACTIONS} from "../../state/actions.js";
import {get_overlapping_wcomponent_ids} from "../../state/derived/accessor.js";
const map_state = (state, own_props) => ({
  overlapping_wcomponent_ids: get_overlapping_wcomponent_ids(state, own_props.wcomponent_id)
});
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _OverlappingNodesHandle(props) {
  const {overlapping_wcomponent_ids, set_highlighted_wcomponent, change_route} = props;
  const overlapping_node_number = overlapping_wcomponent_ids?.length || 0;
  const hidden = overlapping_node_number === 0;
  const class_name = "node_handle overlapping_nodes" + (hidden ? " hidden " : "");
  const title = overlapping_node_number ? `${overlapping_node_number - 1} other nodes at this location` : "";
  const select_next_node = useMemo(() => {
    if (!overlapping_wcomponent_ids)
      return void 0;
    return (e) => {
      e.stopImmediatePropagation();
      set_highlighted_wcomponent({id: props.wcomponent_id, highlighted: false});
      change_route({item_id: overlapping_wcomponent_ids[0]});
    };
  }, [change_route, overlapping_wcomponent_ids]);
  return /* @__PURE__ */ h("div", {
    className: class_name,
    title,
    onClick: select_next_node
  }, /* @__PURE__ */ h(AutoAwesomeMotionIcon, {
    fontSize: "small"
  }));
}
export const OverlappingNodesHandle = connector(_OverlappingNodesHandle);
