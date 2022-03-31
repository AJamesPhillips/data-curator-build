import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {calculate_zoom_to_contain_group} from "../canvas/calculate_spatial_temporal_position_to_move_to.js";
import {MoveToItemButton} from "../canvas/MoveToItemButton.js";
import {calculate_canvas_x_for_datetime, default_time_origin_parameters} from "../knowledge_view/datetime_line.js";
import {get_uncertain_datetime} from "../shared/uncertainty/datetime.js";
import {ACTIONS} from "../state/actions.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const prioritisations = kv?.prioritisations;
  const composed_datetime_line_config = kv?.composed_datetime_line_config;
  return {
    prioritisations,
    time_origin_ms: composed_datetime_line_config?.time_origin_ms,
    time_origin_x: composed_datetime_line_config?.time_origin_x,
    time_scale: composed_datetime_line_config?.time_scale
  };
};
const map_dispatch = {
  change_display_at_created_datetime: ACTIONS.display_at_created_datetime.change_display_at_created_datetime,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _PrioritiesContentControls(props) {
  const [allow_drawing_attention, set_allow_drawing_attention] = useState(true);
  const {prioritisations = []} = props;
  const {time_origin_ms, time_origin_x, time_scale} = default_time_origin_parameters(props);
  let x_min = calculate_canvas_x_for_datetime({
    datetime: new Date(),
    time_origin_ms,
    time_origin_x,
    time_scale
  });
  let x_max = x_min;
  const y = 140;
  prioritisations.forEach((prioritisation) => {
    const uncertain_datetime = get_uncertain_datetime(prioritisation.datetime);
    if (!uncertain_datetime)
      return;
    const x = calculate_canvas_x_for_datetime({
      datetime: uncertain_datetime,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    x_min = Math.min(x_min, x);
    x_max = Math.max(x_max, x);
  });
  x_min -= 100;
  x_max += 200;
  const zoom = calculate_zoom_to_contain_group({min_left: x_min, max_left: x_max, min_top: y, max_top: y}, {display_side_panel: false, display_time_sliders: false}).zoom;
  const position = {x: x_min, y, zoom};
  const components_on_screen = true;
  const draw_attention = allow_drawing_attention && position && !components_on_screen;
  return /* @__PURE__ */ h("div", {
    style: {borderTop: "thin solid rgb(206, 206, 206)"}
  }, /* @__PURE__ */ h(MoveToItemButton, {
    move: () => props.change_route({args: position}),
    draw_attention,
    have_finished_drawing_attention: () => set_allow_drawing_attention(false),
    enable_spacebar_move_to_shortcut: true
  }));
}
export const PrioritiesContentControls = connector(_PrioritiesContentControls);
