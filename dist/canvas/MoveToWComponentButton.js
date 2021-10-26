import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {Box, IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import {
  get_current_composed_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {lefttop_to_xy} from "../state/display_options/display.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {calculate_if_components_on_screen} from "./calculate_if_components_on_screen.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
const map_state = (state, own_props) => {
  const initial_wcomponent_id = own_props.wcomponent_id || state.routing.item_id || "";
  let components_on_screen = void 0;
  if (own_props.allow_drawing_attention) {
    components_on_screen = calculate_if_components_on_screen(state);
  }
  return {
    initial_wcomponent_id,
    created_at_ms: state.routing.args.created_at_ms,
    components_on_screen,
    composed_visible_wc_id_map: get_current_composed_knowledge_view_from_state(state)?.composed_visible_wc_id_map,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id
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
  const {
    components_on_screen,
    have_finished_drawing_attention = () => {
    }
  } = props;
  const {position, go_to_datetime_ms} = useMemo(() => calculate_spatial_temporal_position_to_move_to(props.composed_visible_wc_id_map, props.wcomponents_by_id, props.initial_wcomponent_id, props.created_at_ms), [props.composed_visible_wc_id_map, props.wcomponents_by_id, props.initial_wcomponent_id, props.created_at_ms]);
  const move = () => position && props.move(go_to_datetime_ms, position);
  const draw_attention_to_move_to_wcomponent_button = props.allow_drawing_attention && position && !components_on_screen;
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 2,
    title: position ? "Move to component(s)" : "No components present"
  }, /* @__PURE__ */ h(IconButton, {
    size: "small",
    onClick: move,
    disabled: !position
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null))), /* @__PURE__ */ h("div", {
    className: draw_attention_to_move_to_wcomponent_button ? "pulsating_circle" : "",
    ref: (e) => setTimeout(() => {
      e?.classList.remove("pulsating_circle");
      have_finished_drawing_attention();
    }, 1e4)
  }));
}
export const MoveToWComponentButton = connector(_MoveToWComponentButton);
function calculate_spatial_temporal_position_to_move_to(composed_visible_wc_id_map, wcomponents_by_id, initial_wcomponent_id, go_to_datetime_ms) {
  let wcomponent_created_at_ms = void 0;
  let position = void 0;
  if (composed_visible_wc_id_map) {
    let wcomponent = wcomponents_by_id[initial_wcomponent_id];
    wcomponent_created_at_ms = wcomponent && get_created_at_ms(wcomponent);
    let view_entry = composed_visible_wc_id_map[initial_wcomponent_id];
    if (!view_entry) {
      Object.entries(composed_visible_wc_id_map).find(([wcomponent_id, an_entry]) => {
        wcomponent = wcomponents_by_id[wcomponent_id];
        wcomponent_created_at_ms = wcomponent && get_created_at_ms(wcomponent);
        view_entry = an_entry;
        return true;
      });
    }
    if (wcomponent_created_at_ms) {
      go_to_datetime_ms = Math.max(go_to_datetime_ms, wcomponent_created_at_ms);
    }
    if (view_entry) {
      position = lefttop_to_xy({...view_entry, zoom: 100}, true);
    }
  }
  return {position, go_to_datetime_ms};
}
