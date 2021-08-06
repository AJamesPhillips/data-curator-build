import {h} from "../snowpack/pkg/preact.js";
import {AppBar, Box, CssBaseline, ThemeProvider, Toolbar} from "../snowpack/pkg/@material-ui/core.js";
import "./App.css.proxy.js";
import {MainAreaRouter} from "./layout/MainAreaRouter.js";
import {TabsContainer} from "./layout/TabsContainer.js";
import {SidePanel} from "./side_panel/SidePanel.js";
import {ViewsBreadcrumb} from "./views/ViewsBreadcrumb.js";
import {DefaultTheme} from "./ui_themes/material_default.js";
function App() {
  return /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(CssBaseline, null), /* @__PURE__ */ h(Box, {
    id: "app",
    className: "app"
  }, /* @__PURE__ */ h(Box, {
    component: "header",
    zIndex: 1
  }, /* @__PURE__ */ h(AppBar, {
    position: "static"
  }, /* @__PURE__ */ h(Toolbar, {
    variant: "dense"
  }, /* @__PURE__ */ h(ViewsBreadcrumb, null)))), /* @__PURE__ */ h(Box, {
    component: "main"
  }, /* @__PURE__ */ h(Box, {
    id: "app_content"
  }, /* @__PURE__ */ h(MainAreaRouter, null)), /* @__PURE__ */ h(Box, {
    id: "side_panel",
    component: "aside",
    p: 5,
    mt: 1
  }, /* @__PURE__ */ h(TabsContainer, null), /* @__PURE__ */ h(SidePanel, null))), /* @__PURE__ */ h(Box, {
    component: "footer"
  })));
}
export default App;
