import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import FilterCenterFocusIcon from "../../_snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {lefttop_to_xy} from "../state/display_options/display.js";
import {Box, IconButton} from "../../_snowpack/pkg/@material-ui/core.js";
import {get_created_at_ms} from "../shared/wcomponent/utils_datetime.js";
const map_state = (state, own_props) => {
  const {wcomponent_id} = own_props;
  let go_to_datetime_ms = state.routing.args.created_at_ms;
  let position = void 0;
  if (wcomponent_id) {
    const wcomponent = get_wcomponent_from_state(state, wcomponent_id);
    if (wcomponent) {
      const wcomponent_created_at_ms = get_created_at_ms(wcomponent);
      go_to_datetime_ms = Math.max(go_to_datetime_ms, wcomponent_created_at_ms);
    }
    const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
    const composed_knowledge_view_entry = current_composed_knowledge_view && current_composed_knowledge_view.composed_wc_id_map[wcomponent_id];
    if (composed_knowledge_view_entry) {
      position = {
        ...composed_knowledge_view_entry,
        zoom: 100
      };
    }
  }
  return {
    go_to_datetime_ms,
    position: lefttop_to_xy(position, true)
  };
};
const map_dispatch = {
  move: (datetime_ms, position) => ACTIONS.routing.change_route({
    args: {
      created_at_ms: datetime_ms,
      ...position
    }
  })
};
const connector = connect(map_state, map_dispatch);
function _MoveToWComponentButton(props) {
  const {wcomponent_id, position, go_to_datetime_ms} = props;
  const moveable = wcomponent_id && position;
  const move = () => moveable && props.move(go_to_datetime_ms, position);
  return /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 2,
    title: moveable ? "" : "No components present"
  }, /* @__PURE__ */ h(IconButton, {
    size: "small",
    onClick: move,
    disabled: !moveable
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null)));
}
export const MoveToWComponentButton = connector(_MoveToWComponentButton);
