import {Button, Menu, MenuItem as MaterialMenuItem} from "../../snowpack/pkg/@material-ui/core.js";
import MenuIcon from "../../snowpack/pkg/@material-ui/icons/Menu.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {ALLOWED_ROUTES} from "../state/routing/interfaces.js";
import {AppMenuItem, CustomisableAppMenuItem} from "./AppMenuItem.js";
import {route_to_text} from "./route_to_text.js";
const map_state = (state) => ({
  route: state.routing.route,
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  set_show_help_menu: ACTIONS.display.set_show_help_menu,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
const hide_routes = new Set([
  "objects",
  "patterns",
  "perceptions",
  "statements"
]);
const base_allowed_routes = ALLOWED_ROUTES.filter((r) => !hide_routes.has(r));
function _AppMenuItemsContainer(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handle_menu_icon_click = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handle_menu_close = () => {
    setAnchorEl(null);
  };
  const [show_all_routes, set_show_all_routes] = useState(false);
  let routes = base_allowed_routes;
  if (!show_all_routes) {
    const hide_routes2 = new Set([
      "about",
      "creation_context"
    ]);
    routes = routes.filter((r) => !hide_routes2.has(r) || props.editing && r === "creation_context");
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    style: {display: "flex", flexDirection: "row"}
  }, /* @__PURE__ */ h(Button, {
    style: {display: "flex", flex: 1}
  }, /* @__PURE__ */ h("b", {
    style: {width: "100%", display: "flex"},
    onClick: () => {
      props.change_route({route: props.route, item_id: null, sub_route: null});
    }
  }, route_to_text(props.route))), /* @__PURE__ */ h(Button, {
    "aria-controls": "select_tab",
    "aria-haspopup": "true",
    style: {display: "flex", flex: 1, justifyContent: "end"},
    onClick: handle_menu_icon_click
  }, /* @__PURE__ */ h(MenuIcon, null))), /* @__PURE__ */ h(Menu, {
    anchorEl,
    id: "select_tab",
    onClose: handle_menu_close,
    open: Boolean(anchorEl),
    keepMounted: true
  }, routes.map((route) => /* @__PURE__ */ h(AppMenuItem, {
    id: route,
    on_pointer_down: handle_menu_close
  })), /* @__PURE__ */ h(CustomisableAppMenuItem, {
    on_pointer_down: () => {
      handle_menu_close();
      props.set_show_help_menu({show: true});
    }
  }, "Help"), /* @__PURE__ */ h(MaterialMenuItem, {
    onClick: () => set_show_all_routes(!show_all_routes),
    style: {display: "flex", justifyContent: "flex-start", padding: "0.5em"}
  }, show_all_routes ? "Hide extra" : "Show all", " options")));
}
export const AppMenuItemsContainer = connector(_AppMenuItemsContainer);
