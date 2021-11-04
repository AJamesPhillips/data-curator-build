import {
  calculate_canvas_x_for_wcomponent_temporal_uncertainty,
  DEFAULT_DATETIME_LINE_CONFIG
} from "../../../knowledge_view/datetime_line.js";
import {is_uuid_v4} from "../../../shared/utils/ids.js";
import {is_defined} from "../../../shared/utils/is_defined.js";
import {sort_list} from "../../../shared/utils/sort.js";
import {get_created_at_ms, get_sim_datetime_ms} from "../../../shared/utils_datetime/utils_datetime.js";
import {set_union} from "../../../utils/set.js";
import {update_substate} from "../../../utils/update_state.js";
import {
  wcomponent_can_render_connection,
  wcomponent_is_counterfactual_v2,
  wcomponent_is_prioritisation,
  wcomponent_is_plain_connection
} from "../../../wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_ids_by_type} from "../../derived/get_wcomponent_ids_by_type.js";
import {
  get_base_knowledge_view,
  get_nested_knowledge_view_ids,
  sort_nested_knowledge_map_ids_by_priority_then_title,
  get_wcomponents_from_state
} from "../accessors.js";
export const knowledge_views_derived_reducer = (initial_state, state) => {
  const one_or_more_knowledge_views_changed = initial_state.specialised_objects.knowledge_views_by_id !== state.specialised_objects.knowledge_views_by_id;
  if (one_or_more_knowledge_views_changed) {
    state = update_derived_knowledge_view_state(state);
  }
  let initial_kv_id = initial_state.routing.args.subview_id;
  initial_kv_id = is_uuid_v4(initial_kv_id) ? initial_kv_id : "";
  let current_kv_id = state.routing.args.subview_id;
  current_kv_id = is_uuid_v4(current_kv_id) ? current_kv_id : "";
  const kv_object_id_changed = initial_kv_id !== current_kv_id;
  if (kv_object_id_changed) {
    state = update_substate(state, "derived", "current_composed_knowledge_view", void 0);
  }
  const initial_kv = get_knowledge_view(initial_state, initial_kv_id);
  const current_kv = get_knowledge_view(state, current_kv_id);
  const kv_object_changed = initial_kv !== current_kv;
  const one_or_more_wcomponents_changed = initial_state.specialised_objects.wcomponents_by_id !== state.specialised_objects.wcomponents_by_id;
  const composed_kv_needs_update = kv_object_changed || one_or_more_wcomponents_changed;
  const created_at_changed = initial_state.routing.args.created_at_ms !== state.routing.args.created_at_ms;
  const filters_changed = created_at_changed || initial_state.filter_context !== state.filter_context || one_or_more_wcomponents_changed;
  const display_time_marks_changed = initial_state.display_options.display_time_marks !== state.display_options.display_time_marks;
  const ephemeral_overrides_might_have_changed = created_at_changed || display_time_marks_changed;
  if (current_kv) {
    if (composed_kv_needs_update) {
      let current_composed_knowledge_view = update_current_composed_knowledge_view_state(state, current_kv);
      current_composed_knowledge_view = update_filters(state, current_composed_knowledge_view);
      current_composed_knowledge_view = add_ephemeral_overrides_to_wc_id_map(state, current_composed_knowledge_view);
      state = update_substate(state, "derived", "current_composed_knowledge_view", current_composed_knowledge_view);
    } else if (filters_changed) {
      const current_composed_knowledge_view = update_filters(state, state.derived.current_composed_knowledge_view);
      state = update_substate(state, "derived", "current_composed_knowledge_view", current_composed_knowledge_view);
    } else if (ephemeral_overrides_might_have_changed) {
      let {current_composed_knowledge_view} = state.derived;
      current_composed_knowledge_view = update_ephemeral_overrides_of_current_composed_kv(current_composed_knowledge_view, display_time_marks_changed, state, current_kv);
      state = update_substate(state, "derived", "current_composed_knowledge_view", current_composed_knowledge_view);
    }
  }
  return state;
};
function update_derived_knowledge_view_state(state) {
  const {knowledge_views_by_id} = state.specialised_objects;
  const knowledge_views = sort_list(Object.values(knowledge_views_by_id), ({title}) => title, "ascending");
  const base_knowledge_view = get_base_knowledge_view(knowledge_views);
  const nested_knowledge_view_ids = get_nested_knowledge_view_ids(knowledge_views);
  sort_nested_knowledge_map_ids_by_priority_then_title(nested_knowledge_view_ids);
  state = {
    ...state,
    derived: {
      ...state.derived,
      knowledge_views,
      base_knowledge_view,
      nested_knowledge_view_ids
    }
  };
  return state;
}
function get_knowledge_view(state, id) {
  return state.specialised_objects.knowledge_views_by_id[id];
}
function update_current_composed_knowledge_view_state(state, current_kv) {
  const {knowledge_views_by_id, wcomponents_by_id} = state.specialised_objects;
  return calculate_composed_knowledge_view({
    knowledge_view: current_kv,
    knowledge_views_by_id,
    wcomponents_by_id
  });
}
export function calculate_composed_knowledge_view(args) {
  const {knowledge_view, knowledge_views_by_id, wcomponents_by_id} = args;
  const foundational_knowledge_views = get_foundational_knowledge_views(knowledge_view, knowledge_views_by_id);
  const {
    composed_wc_id_map,
    composed_blocked_wc_id_map
  } = get_composed_wc_id_map(foundational_knowledge_views, wcomponents_by_id);
  const overlapping_wc_ids = get_overlapping_wc_ids(composed_wc_id_map, wcomponents_by_id);
  const non_deleted_wcomponent_ids = Object.keys(composed_wc_id_map);
  const wc_ids_by_type = get_wcomponent_ids_by_type(wcomponents_by_id, non_deleted_wcomponent_ids);
  const wcomponents = non_deleted_wcomponent_ids.map((id) => wcomponents_by_id[id]).filter(is_defined);
  const wcomponent_nodes = wcomponents.filter(is_wcomponent_node);
  const wcomponent_connections = wcomponents.filter(wcomponent_can_render_connection);
  const wc_id_to_counterfactuals_v2_map = get_wc_id_to_counterfactuals_v2_map({
    wc_ids_by_type,
    wcomponents_by_id
  });
  const wc_id_to_active_counterfactuals_v2_map = get_wc_id_to_counterfactuals_v2_map({
    wc_ids_by_type,
    wcomponents_by_id,
    active_counterfactual_ids: knowledge_view.active_counterfactual_v2_ids
  });
  const prioritisations = get_prioritisations(wc_ids_by_type.prioritisation, wcomponents_by_id);
  const datetime_lines_config = get_composed_datetime_lines_config(foundational_knowledge_views, true);
  const current_composed_knowledge_view = {
    composed_visible_wc_id_map: {},
    ...knowledge_view,
    composed_wc_id_map,
    composed_blocked_wc_id_map,
    overlapping_wc_ids,
    wcomponent_nodes,
    wcomponent_connections,
    wc_id_to_counterfactuals_v2_map,
    wc_id_to_active_counterfactuals_v2_map,
    wc_ids_by_type,
    prioritisations,
    filters: {
      wc_ids_excluded_by_any_filter: new Set(),
      wc_ids_excluded_by_filters: new Set(),
      wc_ids_excluded_by_created_at_datetime_filter: new Set()
    },
    composed_datetime_line_config: datetime_lines_config
  };
  delete current_composed_knowledge_view.wc_id_map;
  return current_composed_knowledge_view;
}
export function get_foundational_knowledge_views(knowledge_view, knowledge_views_by_id, include_self = true) {
  const {foundation_knowledge_view_ids = []} = knowledge_view;
  const foundation_knowledge_views = foundation_knowledge_view_ids.map((id) => knowledge_views_by_id[id]).filter(is_defined);
  if (include_self)
    foundation_knowledge_views.push(knowledge_view);
  return foundation_knowledge_views;
}
export function get_composed_wc_id_map(foundation_knowledge_views, wcomponents_by_id) {
  let composed_wc_id_map = {};
  foundation_knowledge_views.forEach((foundational_kv) => {
    Object.entries(foundational_kv.wc_id_map).forEach(([id, entry]) => {
      delete composed_wc_id_map[id];
      composed_wc_id_map[id] = entry;
    });
  });
  remove_deleted_wcomponents(composed_wc_id_map, wcomponents_by_id);
  const result = partition_wc_id_map_on_blocked_component(composed_wc_id_map);
  composed_wc_id_map = result.composed_wc_id_map;
  const composed_blocked_wc_id_map = result.composed_blocked_wc_id_map;
  return {composed_wc_id_map, composed_blocked_wc_id_map};
}
function remove_deleted_wcomponents(composed_wc_id_map, wcomponents_by_id) {
  Object.keys(composed_wc_id_map).forEach((id) => {
    const wcomponent = wcomponents_by_id[id];
    if (!wcomponent)
      delete composed_wc_id_map[id];
    else if (wcomponent.deleted_at)
      delete composed_wc_id_map[id];
  });
}
function partition_wc_id_map_on_blocked_component(composed_wc_id_map) {
  const composed_blocked_wc_id_map = {};
  Object.entries(composed_wc_id_map).forEach(([wcomponent_id, entry]) => {
    if (entry.deleted) {
      composed_blocked_wc_id_map[wcomponent_id] = entry;
      delete composed_wc_id_map[wcomponent_id];
    }
  });
  return {composed_wc_id_map, composed_blocked_wc_id_map};
}
const invalid_node_types = new Set([
  "causal_link",
  "relation_link"
]);
const is_wcomponent_node = (wcomponent) => !invalid_node_types.has(wcomponent.type);
function get_wc_id_to_counterfactuals_v2_map(args) {
  const map = {};
  const active_counterfactual_ids = args.active_counterfactual_ids ? new Set(args.active_counterfactual_ids) : false;
  args.wc_ids_by_type.counterfactualv2.forEach((id) => {
    if (active_counterfactual_ids && !active_counterfactual_ids.has(id))
      return;
    const counterfactual_v2 = args.wcomponents_by_id[id];
    if (!wcomponent_is_counterfactual_v2(counterfactual_v2))
      return;
    const {target_wcomponent_id, target_VAP_set_id} = counterfactual_v2;
    if (!target_wcomponent_id || !target_VAP_set_id)
      return;
    const counterfactuals_by_attribute = map[target_wcomponent_id] || {VAP_sets: {}};
    map[target_wcomponent_id] = counterfactuals_by_attribute;
    const counterfactual_v2s = counterfactuals_by_attribute.VAP_sets[target_VAP_set_id] || [];
    counterfactual_v2s.push(counterfactual_v2);
    counterfactuals_by_attribute.VAP_sets[target_VAP_set_id] = counterfactual_v2s;
  });
  return map;
}
function get_prioritisations(prioritisation_ids, wcomponents_by_id) {
  const prioritisations = Array.from(prioritisation_ids).map((id) => wcomponents_by_id[id]).filter(wcomponent_is_prioritisation);
  return sort_list(prioritisations, (p) => get_sim_datetime_ms(p) || Number.POSITIVE_INFINITY, "descending");
}
export function get_composed_datetime_lines_config(foundation_knowledge_views, use_defaults) {
  let config = {};
  if (use_defaults) {
    config = {...DEFAULT_DATETIME_LINE_CONFIG};
  }
  foundation_knowledge_views.forEach((foundational_kv) => {
    const {datetime_line_config} = foundational_kv;
    if (!datetime_line_config)
      return;
    config.time_origin_ms = datetime_line_config.time_origin_ms ?? config.time_origin_ms;
    config.time_origin_x = datetime_line_config.time_origin_x ?? config.time_origin_x;
    config.time_scale = datetime_line_config.time_scale ?? config.time_scale;
    config.time_line_number = datetime_line_config.time_line_number ?? config.time_line_number;
    config.time_line_spacing_days = datetime_line_config.time_line_spacing_days ?? config.time_line_spacing_days;
  });
  return config;
}
function update_filters(state, current_composed_knowledge_view) {
  if (!current_composed_knowledge_view)
    return void 0;
  const {composed_wc_id_map} = current_composed_knowledge_view;
  const current_wc_ids = Object.keys(composed_wc_id_map);
  const wcomponents_on_kv = get_wcomponents_from_state(state, current_wc_ids).filter(is_defined);
  let wc_ids_to_exclude = [];
  if (state.filter_context.apply_filter) {
    const {
      exclude_by_label_ids: exclude_by_label_ids_list,
      include_by_label_ids: include_by_label_ids_list,
      exclude_by_component_types: exclude_by_component_types_list,
      include_by_component_types: include_by_component_types_list
    } = state.filter_context.filters;
    const exclude_by_label_ids = new Set(exclude_by_label_ids_list);
    const exclude_by_component_types = new Set(exclude_by_component_types_list);
    const include_by_component_types = new Set(include_by_component_types_list);
    wc_ids_to_exclude = wcomponents_on_kv.filter((wcomponent) => {
      const {label_ids = [], type} = wcomponent;
      const applied_ids = new Set(label_ids);
      const labels__should_exclude = !!label_ids.find((label_id) => exclude_by_label_ids.has(label_id));
      const labels__lacks_include = !!include_by_label_ids_list.find((label_id) => !applied_ids.has(label_id));
      const types__should_exclude = exclude_by_component_types.has(type);
      const types__lacks_include = include_by_component_types.size > 0 && !include_by_component_types.has(type);
      const should_exclude = labels__should_exclude || labels__lacks_include || types__should_exclude || types__lacks_include;
      return should_exclude;
    }).map(({id}) => id);
  }
  const wc_ids_excluded_by_filters = new Set(wc_ids_to_exclude);
  const {created_at_ms} = state.routing.args;
  const component_ids_excluded_by_created_at = wcomponents_on_kv.filter((kv) => get_created_at_ms(kv) > created_at_ms).map(({id}) => id);
  const wc_ids_excluded_by_created_at_datetime_filter = new Set(component_ids_excluded_by_created_at);
  const wc_ids_excluded_by_any_filter = set_union(wc_ids_excluded_by_filters, wc_ids_excluded_by_created_at_datetime_filter);
  const composed_visible_wc_id_map = {...composed_wc_id_map};
  wc_ids_excluded_by_any_filter.forEach((id) => {
    delete composed_visible_wc_id_map[id];
  });
  return {
    ...current_composed_knowledge_view,
    composed_visible_wc_id_map,
    filters: {
      wc_ids_excluded_by_any_filter,
      wc_ids_excluded_by_filters,
      wc_ids_excluded_by_created_at_datetime_filter
    }
  };
}
function get_overlapping_wc_ids(composed_wc_id_map, wcomponents_by_id) {
  const map = {};
  const entries = {};
  const overlapping_coord_keys = new Set();
  Object.entries(composed_wc_id_map).forEach(([wcomponent_id, entry]) => {
    if (wcomponent_is_plain_connection(wcomponents_by_id[wcomponent_id]))
      return;
    const coord_key = `${entry.left},${entry.top}`;
    const ids = entries[coord_key] || [];
    ids.push(wcomponent_id);
    entries[coord_key] = ids;
    if (ids.length > 1)
      overlapping_coord_keys.add(coord_key);
  });
  overlapping_coord_keys.forEach((coord_key) => {
    const overlapping_wcomponent_ids = entries[coord_key];
    overlapping_wcomponent_ids.forEach((id, index) => {
      const i = index + 1;
      map[id] = [...overlapping_wcomponent_ids.slice(i), ...overlapping_wcomponent_ids.slice(0, i)];
    });
  });
  return map;
}
function update_ephemeral_overrides_of_current_composed_kv(current_composed_knowledge_view, display_time_marks_changed, state, current_kv) {
  if (!current_composed_knowledge_view)
    return void 0;
  if (display_time_marks_changed && !state.display_options.display_time_marks) {
    const {knowledge_views_by_id, wcomponents_by_id} = state.specialised_objects;
    const foundational_knowledge_views = get_foundational_knowledge_views(current_kv, knowledge_views_by_id);
    const composed_wc_id_maps = get_composed_wc_id_map(foundational_knowledge_views, wcomponents_by_id);
    current_composed_knowledge_view = {
      ...current_composed_knowledge_view,
      ...composed_wc_id_maps
    };
  } else {
    current_composed_knowledge_view = add_ephemeral_overrides_to_wc_id_map(state, current_composed_knowledge_view);
  }
  return current_composed_knowledge_view;
}
function add_ephemeral_overrides_to_wc_id_map(state, current_composed_knowledge_view) {
  if (!current_composed_knowledge_view)
    return void 0;
  const {display_time_marks} = state.display_options;
  const {wc_ids_by_type, composed_wc_id_map, composed_datetime_line_config} = current_composed_knowledge_view;
  const {time_origin_ms, time_origin_x, time_scale} = composed_datetime_line_config;
  const {wcomponents_by_id} = state.specialised_objects;
  const {created_at_ms} = state.routing.args;
  if (!display_time_marks || time_origin_ms === void 0)
    return current_composed_knowledge_view;
  const new_map = {...composed_wc_id_map};
  let changed = false;
  Array.from(wc_ids_by_type.has_single_datetime).forEach((wcomponent_id) => {
    const existing_entry = composed_wc_id_map[wcomponent_id];
    if (!existing_entry)
      return;
    const left = calculate_canvas_x_for_wcomponent_temporal_uncertainty({
      wcomponent_id,
      wcomponents_by_id,
      created_at_ms,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    if (left === void 0 || existing_entry.left === left)
      return;
    changed = true;
    new_map[wcomponent_id] = {...existing_entry, left};
  });
  return !changed ? current_composed_knowledge_view : {
    ...current_composed_knowledge_view,
    composed_wc_id_map: new_map
  };
}
