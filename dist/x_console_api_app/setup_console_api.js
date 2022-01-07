import {is_defined} from "../shared/utils/is_defined.js";
import {create_wcomponent} from "../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {
  wcomponent_is_causal_link,
  wcomponent_is_plain_connection
} from "../wcomponent/interfaces/SpecialisedObjects.js";
function get_current_kv() {
  const state = get_state();
  const current_kv = state.derived.current_composed_knowledge_view;
  if (!current_kv)
    throw new Error(`Lacking current_composed_knowledge_view`);
  return current_kv;
}
function get_wcomponents_by_id() {
  const state = get_state();
  return state.specialised_objects.wcomponents_by_id;
}
function get_connection_map(args = {}) {
  const current_kv = get_current_kv();
  const wcomponents_by_id = get_wcomponents_by_id();
  const {causal_only = true} = args;
  const visible_ids = new Set(Object.keys(current_kv.composed_visible_wc_id_map));
  const connection_ids = Array.from(causal_only ? current_kv.wc_ids_by_type.causal_link : current_kv.wc_ids_by_type.any_link);
  const visible_connection_ids = connection_ids.filter((id) => visible_ids.has(id));
  const connections = visible_connection_ids.map((id) => wcomponents_by_id[id]).filter(wcomponent_is_plain_connection).filter((wc) => wc.from_id && wc.to_id).filter((wc) => wcomponents_by_id[wc.from_id] && wcomponents_by_id[wc.to_id]);
  const node_ids = new Set();
  const node_ids_connections_map = {};
  connections.forEach((wc) => {
    node_ids.add(wc.from_id);
    node_ids.add(wc.to_id);
    const tos = node_ids_connections_map[wc.from_id] || {};
    node_ids_connections_map[wc.from_id] = tos;
    const values = tos[wc.to_id] || [];
    tos[wc.to_id] = values;
    let value = 1;
    if (wcomponent_is_causal_link(wc))
      value = wc.effect_when_true ?? 1;
    values.push(value);
  });
  return {node_ids_connections_map, node_ids};
}
function get_connection_matrix(args = {}) {
  const {node_ids_connections_map, node_ids} = get_connection_map(args);
  const matrix = [];
  const row_1 = [""];
  matrix.push(row_1);
  Array.from(node_ids).forEach((from_id) => row_1.push(from_id));
  Array.from(node_ids).forEach((to_id) => {
    const new_row = [to_id];
    Array.from(node_ids).forEach((from_id) => {
      const values = (node_ids_connections_map[from_id] || {})[to_id] || [];
      new_row.push(values);
    });
    matrix.push(new_row);
  });
  return matrix;
}
function get_component_id_to_label_ids_map() {
  const current_kv = get_current_kv();
  const wcomponents_by_id = get_wcomponents_by_id();
  const visible_ids = Object.keys(current_kv.composed_visible_wc_id_map);
  const visible_components = visible_ids.map((id) => wcomponents_by_id[id]).filter(is_defined);
  const component_id_to_label_ids_map = {};
  visible_components.forEach((wc) => {
    if (!wc.label_ids || wc.label_ids.length === 0)
      return;
    component_id_to_label_ids_map[wc.id] = wc.label_ids;
  });
  return component_id_to_label_ids_map;
}
function get_component_id_to_label_names_map() {
  const wcomponents_by_id = get_wcomponents_by_id();
  const component_id_to_label_ids_map = get_component_id_to_label_ids_map();
  const label_id_to_title_map = {};
  const component_id_to_label_names_map = {};
  Object.entries(component_id_to_label_ids_map).forEach(([component_id, label_ids]) => {
    const label_names = label_ids.map((label_id) => {
      const wcomponent_label = wcomponents_by_id[label_id];
      if (!wcomponent_label)
        return "";
      const label_name = label_id_to_title_map[label_id] || wcomponent_label.title;
      label_id_to_title_map[label_id] = label_name;
      return label_name;
    });
    component_id_to_label_names_map[component_id] = label_names;
  });
  return component_id_to_label_names_map;
}
function convert_matrix_component_ids(matrix, converter) {
  const connection_matrix_using_label_names = matrix.map((row) => {
    return row.map((cell) => {
      if (typeof cell !== "string")
        return cell;
      if (!cell)
        return "";
      return converter(cell);
    });
  });
  return connection_matrix_using_label_names;
}
function matrix_component_ids_to_labels(component_id_to_label_names_map, matrix) {
  const component_id_to_compound_label_name = {};
  const compound_compound_label_name_count = {};
  const connection_matrix_using_label_names = convert_matrix_component_ids(matrix, (cell) => {
    let compound_label_name = component_id_to_compound_label_name[cell] || "";
    if (!compound_label_name) {
      const label_names = component_id_to_label_names_map[cell] || [];
      compound_label_name = label_names.join(",");
      const count = (compound_compound_label_name_count[compound_label_name] || 0) + 1;
      compound_compound_label_name_count[compound_label_name] = count;
      compound_label_name += `_${count}`;
      component_id_to_compound_label_name[cell] = compound_label_name;
    }
    return compound_label_name;
  });
  return connection_matrix_using_label_names;
}
function matrix_component_ids_to_titles(wcomponents_by_id, matrix) {
  const connection_matrix_using_component_titles = convert_matrix_component_ids(matrix, (cell) => {
    return wcomponents_by_id[cell]?.title || "";
  });
  return connection_matrix_using_component_titles;
}
function matrix_to_csv(matrix) {
  const csv = [];
  matrix.forEach((row) => {
    const row_csv = [];
    row.forEach((cell) => {
      if (typeof cell === "string")
        row_csv.push(cell);
      else {
        if (cell.length === 0)
          row_csv.push("");
        else if (cell.length === 1)
          row_csv.push((cell[0] || 0).toString());
        else
          row_csv.push(JSON.stringify(cell));
      }
    });
    csv.push(row_csv.join(",") + "\n");
  });
  return csv.join("");
}
function get_current_visible_graph() {
  return {
    get_connection_map,
    get_connection_matrix,
    get_component_id_to_label_names_map
  };
}
export function setup_console_api() {
  const console_api = {
    get_current_visible_graph,
    matrix_component_ids_to_labels,
    matrix_component_ids_to_titles,
    matrix_to_csv,
    get_current_kv,
    get_wcomponents_by_id,
    create_wcomponent
  };
  window.console_api = console_api;
}
function get_state() {
  return window.debug_state;
}
