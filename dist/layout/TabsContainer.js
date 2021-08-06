import {Box, Button, Menu, MenuItem} from "../../snowpack/pkg/@material-ui/core.js";
import MenuIcon from "../../snowpack/pkg/@material-ui/icons/Menu.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ALLOWED_ROUTES} from "../state/routing/interfaces.js";
import {Tab} from "./Tab.js";
const map_state = (state) => ({
  route: state.routing.route,
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _TabsContainer(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [show_all_routes, set_show_all_routes] = useState(!!localStorage.getItem("show_all_tabs"));
  localStorage.setItem("show_all_tabs", show_all_routes ? "1" : "");
  let routes = ALLOWED_ROUTES;
  if (!show_all_routes) {
    const hide_routes = new Set([
      "objects",
      "patterns",
      "perceptions",
      "statements",
      "about",
      "creation_context"
    ]);
    routes = routes.filter((r) => !hide_routes.has(r) || props.editing && r === "creation_context");
  }
  return /* @__PURE__ */ h(Box, {
    mb: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "end"
  }, /* @__PURE__ */ h(Button, {
    onClick: handleClick,
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
    component: "strong"
  }, route_to_text(props.route)), /* @__PURE__ */ h(MenuIcon, null))), /* @__PURE__ */ h(Menu, {
    anchorEl,
    id: "select_tab",
    onClose: handleClose,
    open: Boolean(anchorEl),
    keepMounted: true
  }, routes.map((route) => /* @__PURE__ */ h(MenuItem, {
    onClick: handleClose
  }, /* @__PURE__ */ h(Tab, {
    id: route,
    on_pointer_down: handleClose
  }))), /* @__PURE__ */ h(MenuItem, {
    onClick: () => set_show_all_routes(!show_all_routes)
  }, show_all_routes ? "Hide" : "Show", " all options")));
}
export const TabsContainer = connector(_TabsContainer);
function route_to_text(route) {
  if (route === "wcomponents")
    return "Components";
  else
    return route.replaceAll("_", " ");
}
