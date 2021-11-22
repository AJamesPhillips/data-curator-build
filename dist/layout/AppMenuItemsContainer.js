import {Box, Button, Menu, MenuItem as MaterialMenuItem} from "../../snowpack/pkg/@material-ui/core.js";
import MenuIcon from "../../snowpack/pkg/@material-ui/icons/Menu.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {ALLOWED_ROUTES} from "../state/routing/interfaces.js";
import {AppMenuItem, CustomisableAppMenuItem} from "./AppMenuItem.js";
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
  return /* @__PURE__ */ h(Box, {
    mb: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "end"
  }, /* @__PURE__ */ h(Button, {
    "aria-controls": "select_tab",
    fullWidth: true,
    "aria-haspopup": "true"
  }, /* @__PURE__ */ h(Box, {
    component: "span",
    width: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "start",
    alignContent: "stretch"
  }, /* @__PURE__ */ h(Box, {
    component: "strong",
    onClick: () => {
      props.change_route({route: props.route, item_id: null, sub_route: null});
    }
  }, route_to_text(props.route)), /* @__PURE__ */ h(MenuIcon, {
    onClick: handleClick
  }))), /* @__PURE__ */ h(Menu, {
    anchorEl,
    id: "select_tab",
    onClose: handleClose,
    open: Boolean(anchorEl),
    keepMounted: true
  }, routes.map((route) => /* @__PURE__ */ h(AppMenuItem, {
    id: route,
    on_pointer_down: handleClose
  })), /* @__PURE__ */ h(CustomisableAppMenuItem, {
    on_pointer_down: () => {
      handleClose();
      props.set_show_help_menu({show: true});
    }
  }, "Help"), /* @__PURE__ */ h(MaterialMenuItem, {
    onClick: () => set_show_all_routes(!show_all_routes),
    style: {display: "flex", justifyContent: "flex-start", padding: "0.5em"}
  }, show_all_routes ? "Hide" : "Show", " all options")));
}
export const AppMenuItemsContainer = connector(_AppMenuItemsContainer);
function route_to_text(route) {
  if (route === "wcomponents")
    return "Components";
  else
    return route.replaceAll("_", " ");
}
