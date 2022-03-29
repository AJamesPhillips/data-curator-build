import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {Box, IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {
  get_current_composed_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {calculate_if_components_on_screen} from "./calculate_if_components_on_screen.js";
import {
  calculate_all_display_combinations_of_spatial_temporal_position_to_move_to
} from "./calculate_spatial_temporal_position_to_move_to.js";
import {get_actually_display_time_sliders} from "../state/controls/accessors.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
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
    current_composed_knowledge_view: get_current_composed_knowledge_view_from_state(state),
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    selected_wcomponent_ids_set: state.meta_wcomponents.selected_wcomponent_ids_set,
    display_side_panel: state.controls.display_side_panel,
    display_time_sliders: get_actually_display_time_sliders(state)
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
    have_finished_drawing_attention,
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    selected_wcomponent_ids_set,
    created_at_ms,
    disable_if_not_present,
    display_side_panel,
    display_time_sliders
  } = props;
  const {
    positions_no_sidepanel_or_timesliders,
    positions_sidepanel_no_timesliders,
    positions_timesliders_no_sidepanel,
    positions_with_sidepanel_or_timesliders,
    go_to_datetime_ms
  } = useMemo(() => calculate_all_display_combinations_of_spatial_temporal_position_to_move_to({
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    selected_wcomponent_ids_set,
    created_at_ms,
    disable_if_not_present
  }), [
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    selected_wcomponent_ids_set,
    created_at_ms,
    disable_if_not_present
  ]);
  const positions = display_side_panel || display_time_sliders ? display_side_panel && display_time_sliders ? positions_with_sidepanel_or_timesliders : display_side_panel ? positions_sidepanel_no_timesliders : positions_timesliders_no_sidepanel : positions_no_sidepanel_or_timesliders;
  let next_position_index = 0;
  const move = positions.length === 0 ? void 0 : () => {
    let position = positions[next_position_index++];
    if (!position) {
      next_position_index = 0;
      position = positions[next_position_index++];
    }
    props.move(go_to_datetime_ms, position);
  };
  const draw_attention_to_move_to_wcomponent_button = props.allow_drawing_attention && positions.length > 0 && !components_on_screen;
  return /* @__PURE__ */ h(MoveToItemButton, {
    move,
    draw_attention: draw_attention_to_move_to_wcomponent_button,
    have_finished_drawing_attention,
    enable_spacebar_move_to_shortcut: !props.wcomponent_id
  });
}
export const MoveToWComponentButton = connector(_MoveToWComponentButton);
export function MoveToItemButton(props) {
  const {
    move,
    draw_attention,
    have_finished_drawing_attention = () => {
    }
  } = props;
  useEffect(() => {
    if (!props.enable_spacebar_move_to_shortcut)
      return;
    return pub_sub.global_keys.sub("key_down", (e) => {
      if (move && e.key === " " && !e.user_is_editing_text) {
        move();
      }
    });
  }, [props.enable_spacebar_move_to_shortcut]);
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: move ? "Move to component(s)" : "No component(s) present"
  }, /* @__PURE__ */ h("span", null, /* @__PURE__ */ h(IconButton, {
    size: "medium",
    onClick: move,
    disabled: !move
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null)))), /* @__PURE__ */ h("div", {
    className: move && draw_attention ? "pulsating_circle" : "",
    ref: (e) => setTimeout(() => {
      e?.classList.remove("pulsating_circle");
      have_finished_drawing_attention();
    }, 1e4)
  }));
}
