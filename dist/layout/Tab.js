import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {Link} from "../sharedf/Link.js";
import {CreationContextTabTitle} from "../creation_context/CreationContextTabTitle.js";
import {ViewsTabTitle} from "../views/ViewsTabTitle.js";
import {FilterContextTabTitle} from "../filter_context/FilterContextTabTitle.js";
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
    return /* @__PURE__ */ h(ViewsTabTitle, null);
  else if (id === "perceptions")
    return "Perceptions";
  else if (id === "wcomponents")
    return "Components";
  else if (id === "about")
    return "About";
  else
    return "?" + id;
}
const map_state = (state) => ({current_route: state.routing.route});
const connector = connect(map_state);
function _Tab(props) {
  const title = get_title(props.id);
  return /* @__PURE__ */ h(Link, {
    route: props.id,
    sub_route: null,
    item_id: null,
    args: void 0,
    on_pointer_down: props.on_pointer_down
  }, title);
}
export const Tab = connector(_Tab);
