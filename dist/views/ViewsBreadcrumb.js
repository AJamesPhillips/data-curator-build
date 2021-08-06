import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import Breadcrumbs from "../../snowpack/pkg/@material-ui/core/Breadcrumbs.js";
import ToggleButton from "../../snowpack/pkg/@material-ui/lab/ToggleButton.js";
import ToggleButtonGroup from "../../snowpack/pkg/@material-ui/lab/ToggleButtonGroup.js";
import EditIcon from "../../snowpack/pkg/@material-ui/icons/Edit.js";
import PresentToAllIcon from "../../snowpack/pkg/@material-ui/icons/PresentToAll.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  const kv_id = state.routing.args.subview_id;
  return {
    ready: state.sync.ready,
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
function navigate_view(event, props) {
  const select_el = event.currentTarget;
  if (!select_el)
    return;
  const view = select_el.value;
  props.change_route({args: {view}});
}
function _ViewsBreadcrumb(props) {
  if (!props.ready)
    return null;
  const {kv_id, nested_kv_ids_map} = props;
  let nested_kv = nested_kv_ids_map.map[kv_id];
  const levels = [];
  let deepest_level = true;
  let last_parent_id = "";
  while (nested_kv) {
    const entries = nested_kv.child_ids.map((id) => nested_kv_ids_map.map[id]).filter(is_defined);
    if (entries.length) {
      const options = entries.map(calc_if_is_hidden);
      levels.unshift({
        options,
        selected_id: last_parent_id,
        allow_none: deepest_level
      });
    }
    deepest_level = false;
    last_parent_id = nested_kv.id;
    nested_kv = nested_kv.parent_id !== void 0 ? nested_kv_ids_map.map[nested_kv.parent_id] : void 0;
  }
  const top_level_options = nested_kv_ids_map.top_ids.map((id) => nested_kv_ids_map.map[id]).filter(is_defined).map(calc_if_is_hidden);
  levels.unshift({options: top_level_options, selected_id: last_parent_id, allow_none: false});
  return /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, /* @__PURE__ */ h(ToggleButtonGroup, {
    size: "small",
    exclusive: true,
    onChange: props.toggle_consumption_formatting,
    value: props.presenting ? "presenting" : "editing",
    "aria-label": "text formatting"
  }, /* @__PURE__ */ h(ToggleButton, {
    value: "editing",
    "aria-label": "Editing"
  }, /* @__PURE__ */ h(EditIcon, null)), /* @__PURE__ */ h(ToggleButton, {
    value: "presenting",
    "aria-label": "Presenting"
  }, /* @__PURE__ */ h(PresentToAllIcon, null))), /* @__PURE__ */ h(Breadcrumbs, {
    "aria-label": "breadcrumb",
    style: {margin: "auto 0 auto 10px"}
  }, /* @__PURE__ */ h("label", null, "View Type: ", /* @__PURE__ */ h("select", {
    name: "select_view",
    onChange: (e) => navigate_view(e, props)
  }, view_options.map((opt) => /* @__PURE__ */ h("option", {
    value: opt.id,
    selected: opt.id === props.view
  }, opt.title)))), levels.map((level) => /* @__PURE__ */ h(AutocompleteText, {
    allow_none: level.allow_none,
    selected_option_id: level.selected_id,
    options: level.options,
    on_change: (subview_id) => props.change_route({args: {subview_id}}),
    on_choose_same: (subview_id) => props.change_route({args: {subview_id}}),
    always_allow_editing: true
  }))));
}
export const ViewsBreadcrumb = connector(_ViewsBreadcrumb);
const view_options = [
  {id: "knowledge", title: "Knowledge"},
  {id: "priorities", title: "Priorities"},
  {id: "priorities_list", title: "Priorities list"}
];
function calc_if_is_hidden(entry) {
  const is_hidden = entry.sort_type === "hidden" || entry.sort_type === "archived";
  const color = entry.ERROR_is_circular ? pink : void 0;
  return {id: entry.id, title: entry.title, is_hidden, color};
}
const pink = {r: 231, g: 190, b: 201, a: 1};
