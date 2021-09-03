import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MenuItem as MaterialMenuItem} from "../../snowpack/pkg/@material-ui/core.js";
import {Link} from "../sharedf/Link.js";
import {CreationContextTabTitle} from "../creation_context/CreationContextTabTitle.js";
import {FilterContextTabTitle} from "../filter_context/FilterContextTabTitle.js";
import {ACTIONS} from "../state/actions.js";
function get_title(id) {
  if (id === "filter")
    return /* @__PURE__ */ h(FilterContextTabTitle, null);
  else if (id === "display")
    return "Display options";
  else if (id === "statements")
    return "Statements";
  else if (id === "objects")
    return "Objects";
  else if (id === "patterns")
    return "Patterns";
  else if (id === "creation_context")
    return /* @__PURE__ */ h(CreationContextTabTitle, null);
  else if (id === "views")
    return "Views";
  else if (id === "perceptions")
    return "Perceptions";
  else if (id === "wcomponents")
    return "Components";
  else if (id === "about")
    return "About";
  else if (id === "search")
    return "Search";
  else
    return "?" + id;
}
const map_state = (state) => ({current_route: state.routing.route});
const map_dispatch = {change_route: ACTIONS.routing.change_route};
const connector = connect(map_state, map_dispatch);
function _AppMenuItem(props) {
  const title = get_title(props.id);
  return /* @__PURE__ */ h(MaterialMenuItem, {
    style: "display:flex; justify-content:flex-start; padding:0.5em;",
    onPointerDown: (e) => {
      e.stopImmediatePropagation();
      props.change_route({route: props.id, sub_route: null, item_id: null});
      props.on_pointer_down();
    }
  }, /* @__PURE__ */ h(Link, {
    route: props.id,
    sub_route: null,
    item_id: null,
    args: void 0,
    on_pointer_down: props.on_pointer_down
  }, title));
}
export const AppMenuItem = connector(_AppMenuItem);
