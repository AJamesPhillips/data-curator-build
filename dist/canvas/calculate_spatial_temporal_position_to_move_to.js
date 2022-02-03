import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {
  get_screen_width,
  lefttop_to_xy,
  get_visible_screen_height
} from "../state/display_options/display.js";
import {NODE_WIDTH, node_height_approx} from "./position_utils.js";
import {SCALE_BY, bound_zoom} from "./zoom_utils.js";
export function calculate_spatial_temporal_position_to_move_to(args) {
  const {
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    disable_if_not_present,
    display_side_panel,
    display_time_sliders
  } = args;
  let {created_at_ms, selected_wcomponent_ids_set} = args;
  let wcomponent_created_at_ms = void 0;
  let positions = [];
  if (current_composed_knowledge_view) {
    const {composed_wc_id_map, composed_visible_wc_id_map, wc_ids_by_type} = current_composed_knowledge_view;
    const initial_wcomponent = wcomponents_by_id[initial_wcomponent_id];
    wcomponent_created_at_ms = initial_wcomponent && get_created_at_ms(initial_wcomponent);
    const {any_node} = wc_ids_by_type;
    selected_wcomponent_ids_set = new Set(selected_wcomponent_ids_set);
    selected_wcomponent_ids_set.delete(initial_wcomponent_id);
    const result = get_wcomponent_group_positions_and_last_created_at({
      initial_wcomponent,
      disable_if_not_present,
      composed_visible_wc_id_map,
      selected_wcomponent_ids_set,
      wcomponents_by_id,
      composed_wc_id_map,
      display_side_panel,
      display_time_sliders,
      any_node
    });
    positions = result.positions;
    if (result.wcomponent_created_at_ms) {
      wcomponent_created_at_ms = Math.max(result.wcomponent_created_at_ms, wcomponent_created_at_ms || 0);
    }
    if (wcomponent_created_at_ms) {
      created_at_ms = Math.max(created_at_ms, wcomponent_created_at_ms);
    }
  }
  return {
    positions,
    go_to_datetime_ms: created_at_ms
  };
}
export function calculate_all_display_combinations_of_spatial_temporal_position_to_move_to(args) {
  const {
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    selected_wcomponent_ids_set,
    created_at_ms,
    disable_if_not_present
  } = args;
  const calc_position_args = {
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    selected_wcomponent_ids_set,
    created_at_ms,
    disable_if_not_present
  };
  const {
    positions: positions_no_sidepanel_or_timesliders,
    go_to_datetime_ms
  } = calculate_spatial_temporal_position_to_move_to({
    ...calc_position_args,
    display_side_panel: false,
    display_time_sliders: false
  });
  const positions_sidepanel_no_timesliders = calculate_spatial_temporal_position_to_move_to({
    ...calc_position_args,
    display_side_panel: true,
    display_time_sliders: false
  }).positions;
  const positions_timesliders_no_sidepanel = calculate_spatial_temporal_position_to_move_to({
    ...calc_position_args,
    display_side_panel: false,
    display_time_sliders: true
  }).positions;
  const positions_with_sidepanel_or_timesliders = calculate_spatial_temporal_position_to_move_to({
    ...calc_position_args,
    display_side_panel: true,
    display_time_sliders: true
  }).positions;
  return {
    positions_no_sidepanel_or_timesliders,
    positions_sidepanel_no_timesliders,
    positions_timesliders_no_sidepanel,
    positions_with_sidepanel_or_timesliders,
    go_to_datetime_ms
  };
}
function get_wcomponent_group_positions_and_last_created_at(args) {
  const {
    initial_wcomponent,
    disable_if_not_present,
    composed_visible_wc_id_map,
    selected_wcomponent_ids_set,
    wcomponents_by_id,
    composed_wc_id_map,
    display_side_panel,
    display_time_sliders,
    any_node
  } = args;
  let positions = [];
  let wcomponent_created_at_ms = void 0;
  const display_args = {display_side_panel, display_time_sliders};
  const view_entry = composed_wc_id_map[initial_wcomponent?.id || ""];
  if (initial_wcomponent && view_entry) {
    let {left, top, s} = view_entry;
    const size = s ?? 1;
    left += NODE_WIDTH * size * 0.5;
    top += node_height_approx(!!initial_wcomponent.summary_image) * size * 0.5;
    const position_and_zoom = lefttop_to_xy({left, top, zoom: SCALE_BY}, true, display_args);
    positions.push(position_and_zoom);
  } else if (!disable_if_not_present && composed_visible_wc_id_map) {
    let ids = ids_on_map(selected_wcomponent_ids_set, composed_visible_wc_id_map);
    let result = calculate_position_groups_with_zoom(ids, wcomponents_by_id, composed_wc_id_map, display_args);
    if (result.position_groups.length === 0) {
      ids = ids_on_map(any_node, composed_visible_wc_id_map);
      result = calculate_position_groups_with_zoom(ids, wcomponents_by_id, composed_wc_id_map, display_args);
    }
    wcomponent_created_at_ms = result.wcomponent_created_at_ms;
    positions = result.position_groups.map((group) => {
      debugger;
      return lefttop_to_xy({
        left: (group.min_left + group.max_left) / 2,
        top: (group.min_top + group.max_top) / 2,
        zoom: group.zoom
      }, true, display_args);
    });
  }
  return {positions, wcomponent_created_at_ms};
}
function calculate_position_groups_with_zoom(ids, wcomponents_by_id, composed_wc_id_map, display_args) {
  const position_groups = [];
  const single_node_height = node_height_approx(false);
  let wcomponent_created_at_ms;
  const ids_list = Array.from(ids);
  for (let i = 0; i < ids_list.length; ++i) {
    const wcomponent_id = ids_list[i];
    if (!wcomponent_id)
      continue;
    const wcomponent = wcomponents_by_id[wcomponent_id];
    const an_entry = composed_wc_id_map[wcomponent_id];
    if (!wcomponent || !an_entry)
      continue;
    const size = an_entry.s ?? 1;
    const node_height = node_height_approx(!!wcomponent.summary_image);
    const component_min_left = an_entry.left - NODE_WIDTH;
    const component_max_left = an_entry.left + NODE_WIDTH * size + NODE_WIDTH;
    const component_min_top = an_entry.top - node_height;
    const component_max_top = an_entry.top + node_height * size;
    const fit = position_groups.find((group) => {
      const candidate_group = {
        min_left: Math.min(group.min_left, component_min_left),
        max_left: Math.max(group.max_left, component_max_left),
        min_top: Math.min(group.min_top, component_min_top),
        max_top: Math.max(group.max_top, component_max_top)
      };
      const {zoom, fits} = calculate_zoom_to_contain_group(candidate_group, display_args);
      if (!fits)
        return false;
      group.min_left = candidate_group.min_left;
      group.max_left = candidate_group.max_left;
      group.min_top = candidate_group.min_top;
      group.max_top = candidate_group.max_top;
      group.zoom = zoom;
      return true;
    });
    if (!fit) {
      if (position_groups.length > 10)
        break;
      const new_group = {
        min_left: component_min_left,
        max_left: component_max_left,
        min_top: component_min_top,
        max_top: component_max_top,
        zoom: SCALE_BY
      };
      position_groups.push(new_group);
    }
    wcomponent_created_at_ms = get_created_at_ms(wcomponent);
  }
  return {position_groups, wcomponent_created_at_ms};
}
export function calculate_zoom_to_contain_group(group, display_args) {
  const total_width = group.max_left - group.min_left;
  const total_height = group.max_top - group.min_top;
  const zoom_width = get_screen_width(display_args.display_side_panel) / total_width * SCALE_BY;
  const zoom_height = get_visible_screen_height(display_args.display_time_sliders) / total_height * SCALE_BY;
  const raw_zoom = Math.min(zoom_width, zoom_height);
  const bounded_zoom = bound_zoom(Math.min(SCALE_BY, raw_zoom));
  return {zoom: bounded_zoom, fits: raw_zoom >= bounded_zoom};
}
function ids_on_map(ids, map) {
  const filtered_ids = new Set(ids);
  ids.forEach((id) => {
    if (map[id])
      return;
    filtered_ids.delete(id);
  });
  return filtered_ids;
}
