import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {Box, IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import {
  get_current_composed_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {lefttop_to_xy, screen_height, screen_width} from "../state/display_options/display.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {calculate_if_components_on_screen} from "./calculate_if_components_on_screen.js";
import {bound_zoom, SCALE_BY} from "./zoom_utils.js";
import {NODE_HEIGHT_APPROX, NODE_WIDTH} from "./position_utils.js";
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
    selected_wcomponent_ids_set: state.meta_wcomponents.selected_wcomponent_ids_set
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
    have_finished_drawing_attention
  } = props;
  const {position, go_to_datetime_ms} = useMemo(() => calculate_spatial_temporal_position_to_move_to(props.current_composed_knowledge_view, props.wcomponents_by_id, props.initial_wcomponent_id, props.selected_wcomponent_ids_set, props.created_at_ms, props.disable_if_not_present), [
    props.current_composed_knowledge_view,
    props.wcomponents_by_id,
    props.initial_wcomponent_id,
    props.selected_wcomponent_ids_set,
    props.created_at_ms,
    props.disable_if_not_present
  ]);
  const move = !position ? void 0 : () => props.move(go_to_datetime_ms, position);
  const draw_attention_to_move_to_wcomponent_button = props.allow_drawing_attention && position && !components_on_screen;
  return /* @__PURE__ */ h(MoveToItemButton, {
    move,
    draw_attention: draw_attention_to_move_to_wcomponent_button,
    have_finished_drawing_attention
  });
}
export const MoveToWComponentButton = connector(_MoveToWComponentButton);
function calculate_spatial_temporal_position_to_move_to(current_composed_knowledge_view, wcomponents_by_id, initial_wcomponent_id, selected_wcomponent_ids_set, created_at_ms, disable_if_not_present) {
  let wcomponent_created_at_ms = void 0;
  let position = void 0;
  const {composed_wc_id_map, wc_ids_by_type} = current_composed_knowledge_view || {};
  if (composed_wc_id_map) {
    const wcomponent = wcomponents_by_id[initial_wcomponent_id];
    wcomponent_created_at_ms = wcomponent && get_created_at_ms(wcomponent);
    let view_entry = composed_wc_id_map[initial_wcomponent_id];
    let zoom = SCALE_BY;
    if (!view_entry && !disable_if_not_present && wc_ids_by_type) {
      const {any_node} = wc_ids_by_type;
      selected_wcomponent_ids_set = new Set(selected_wcomponent_ids_set);
      selected_wcomponent_ids_set.delete(initial_wcomponent_id);
      const ids = selected_wcomponent_ids_set.size ? selected_wcomponent_ids_set : any_node;
      let min_left = Number.POSITIVE_INFINITY;
      let max_left = Number.NEGATIVE_INFINITY;
      let min_top = Number.POSITIVE_INFINITY;
      let max_top = Number.NEGATIVE_INFINITY;
      ids.forEach((wcomponent_id) => {
        const wcomponent2 = wcomponents_by_id[wcomponent_id];
        const an_entry = composed_wc_id_map[wcomponent_id];
        if (!wcomponent2 || !an_entry)
          return;
        min_left = Math.min(min_left, an_entry.left);
        max_left = Math.max(max_left, an_entry.left);
        min_top = Math.min(min_top, an_entry.top);
        max_top = Math.max(max_top, an_entry.top);
        wcomponent_created_at_ms = get_created_at_ms(wcomponent2);
      });
      min_left -= NODE_WIDTH;
      max_left += NODE_WIDTH;
      min_top -= NODE_HEIGHT_APPROX * 2;
      max_top += NODE_HEIGHT_APPROX;
      view_entry = {
        left: (min_left + max_left) / 2,
        top: (min_top + max_top) / 2
      };
      const total_width = max_left - min_left;
      const total_height = max_top - min_top;
      const zoom_width = screen_width(false) / total_width * SCALE_BY;
      const zoom_height = screen_height() / total_height * SCALE_BY;
      zoom = Math.min(zoom_width, zoom_height);
      zoom = bound_zoom(Math.min(SCALE_BY, zoom));
    }
    if (wcomponent_created_at_ms) {
      created_at_ms = Math.max(created_at_ms, wcomponent_created_at_ms);
    }
    if (view_entry) {
      position = lefttop_to_xy({...view_entry, zoom}, true);
    }
  }
  return {position, go_to_datetime_ms: created_at_ms};
}
export function MoveToItemButton(props) {
  const {
    move,
    draw_attention,
    have_finished_drawing_attention = () => {
    }
  } = props;
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 2,
    title: move ? "Move to component(s)" : "No component(s) present"
  }, /* @__PURE__ */ h(IconButton, {
    size: "small",
    onClick: move,
    disabled: !move
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null))), /* @__PURE__ */ h("div", {
    className: move && draw_attention ? "pulsating_circle" : "",
    ref: (e) => setTimeout(() => {
      e?.classList.remove("pulsating_circle");
      have_finished_drawing_attention();
    }, 1e4)
  }));
}
