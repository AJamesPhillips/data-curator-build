import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Box, Breadcrumbs, MenuItem, Select, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import {AutocompleteText, OPTION_NONE_ID} from "../form/Autocomplete/AutocompleteText.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  const kv_id = state.routing.args.subview_id;
  return {
    ready_for_reading: state.sync.ready_for_reading,
    presenting: state.display_options.consumption_formatting,
    view: state.routing.args.view,
    kv_id,
    nested_kv_ids_map: state.derived.nested_knowledge_view_ids
  };
};
const map_dispatch = {
  toggle_consumption_formatting: ACTIONS.display.toggle_consumption_formatting,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ViewsBreadcrumb(props) {
  if (!props.ready_for_reading)
    return null;
  const {kv_id, nested_kv_ids_map} = props;
  let nested_kv = nested_kv_ids_map.map[kv_id];
  const levels = [];
  let last_parent_id = OPTION_NONE_ID;
  while (nested_kv) {
    const entries = nested_kv.child_ids.map((id) => nested_kv_ids_map.map[id]).filter(is_defined);
    if (entries.length) {
      const options = entries.map(calc_if_is_hidden);
      levels.unshift({
        options,
        selected_id: last_parent_id,
        parent_id: nested_kv.id
      });
    }
    last_parent_id = nested_kv.id;
    nested_kv = nested_kv.parent_id !== void 0 ? nested_kv_ids_map.map[nested_kv.parent_id] : void 0;
  }
  const top_level_options = nested_kv_ids_map.top_ids.map((id) => nested_kv_ids_map.map[id]).filter(is_defined).map(calc_if_is_hidden);
  levels.unshift({options: top_level_options, selected_id: last_parent_id, parent_id: void 0});
  return /* @__PURE__ */ h(Breadcrumbs, null, /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Select, {
    label: /* @__PURE__ */ h(Typography, {
      noWrap: true
    }, "View Type:"),
    name: "select_view",
    value: props.view
  }, view_options.map((opt) => /* @__PURE__ */ h(MenuItem, {
    value: opt.id,
    selected: opt.id === props.view,
    onPointerDown: (e) => {
      e.stopImmediatePropagation();
      props.change_route({args: {view: opt.id}});
    }
  }, opt.title)))), levels.map((level) => /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: level.parent_id !== void 0,
    show_none_when_none: true,
    selected_option_id: level.selected_id,
    options: level.options,
    on_change: (subview_id) => props.change_route({args: {subview_id: subview_id || level.parent_id}}),
    on_choose_same: (subview_id) => props.change_route({args: {subview_id: subview_id || level.parent_id}}),
    force_editable: true,
    threshold_minimum_score: false
  }))));
}
export const ViewsBreadcrumb = connector(_ViewsBreadcrumb);
const view_options = [
  {id: "knowledge", title: "Knowledge"},
  {id: "priorities", title: "Priorities"},
  {id: "priorities_list", title: "Priorities list"},
  {id: "actions_list", title: "Actions list"}
];
function calc_if_is_hidden(entry) {
  const is_hidden = entry.sort_type === "hidden" || entry.sort_type === "archived";
  const color = entry.ERROR_is_circular ? pink : void 0;
  return {id: entry.id, title: entry.title, is_hidden, color};
}
const pink = {r: 231, g: 190, b: 201, a: 1};
