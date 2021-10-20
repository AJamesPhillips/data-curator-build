import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {Box, IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {lefttop_to_xy} from "../state/display_options/display.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
const map_state = (state, own_props) => {
  let {wcomponent_id} = own_props;
  let go_to_datetime_ms = state.routing.args.created_at_ms;
  let position = void 0;
  if (wcomponent_id) {
    const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
    let view_entry = current_composed_knowledge_view && current_composed_knowledge_view.composed_wc_id_map[wcomponent_id];
    if (!view_entry) {
      const an_id_entry = current_composed_knowledge_view && Object.entries(current_composed_knowledge_view.composed_wc_id_map)[0];
      wcomponent_id = an_id_entry && an_id_entry[0];
      view_entry = an_id_entry && an_id_entry[1];
    }
    const wcomponent = wcomponent_id && get_wcomponent_from_state(state, wcomponent_id);
    if (wcomponent) {
      const wcomponent_created_at_ms = get_created_at_ms(wcomponent);
      go_to_datetime_ms = Math.max(go_to_datetime_ms, wcomponent_created_at_ms);
    }
    if (view_entry) {
      position = {
        ...view_entry,
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
  const {position, go_to_datetime_ms} = props;
  const move = () => position && props.move(go_to_datetime_ms, position);
  return /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 2,
    title: position ? "Move to component(s)" : "No components present"
  }, /* @__PURE__ */ h(IconButton, {
    size: "small",
    onClick: move,
    disabled: !position
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null)));
}
export const MoveToWComponentButton = connector(_MoveToWComponentButton);
