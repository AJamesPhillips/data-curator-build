import {h} from "../snowpack/pkg/preact.js";
import {AppBar, Box, CssBaseline, makeStyles, ThemeProvider, Toolbar} from "../snowpack/pkg/@material-ui/core.js";
import "./App.css.proxy.js";
import {MainAreaRouter} from "./layout/MainAreaRouter.js";
import {AppMenuItemsContainer} from "./layout/AppMenuItemsContainer.js";
import {SidePanel} from "./side_panel/SidePanel.js";
import {ViewsBreadcrumb} from "./views/ViewsBreadcrumb.js";
import {DefaultTheme} from "./ui_themes/material_default.js";
import {ViewOptions} from "./views/ViewOptions.js";
import {StorageInfo} from "./sync/storage_type/StorageInfo.js";
import {UserInfo} from "./sync/user_info/UserInfo.js";
import {BackupInfo} from "./sync/sync_backup_info/BackupInfo.js";
import {SyncInfo} from "./sync/sync_backup_info/SyncInfo.js";
function App() {
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      justifyContent: "space-between",
      flexWrap: "wrap",
      [theme.breakpoints.up("md")]: {
        flexWrap: "nowrap"
      }
    },
    toolbar_section: {
      display: "inherit",
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      marginRight: 5,
      "&:last-child": {marginRight: 0},
      "&:empty": {display: "none"}
    },
    toolbar_item: {
      marginRight: 5,
      "&:last-child": {marginRight: 0}
    },
    grow: {
      flexGrow: 1
    },
    small_full_width: {
      [theme.breakpoints.down("sm")]: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "100%",
        margin: 0
      }
    }
  }));
  const classes = useStyles();
  return /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(CssBaseline, null), /* @__PURE__ */ h(Box, {
    id: "app",
    className: "app"
  }, /* @__PURE__ */ h(Box, {
    component: "header",
    zIndex: 100
  }, /* @__PURE__ */ h(AppBar, {
    position: "static"
  }, /* @__PURE__ */ h(Toolbar, {
    variant: "dense",
    className: classes.toolbar
  }, /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_section} ${classes.grow} ${classes.small_full_width}`
  }, /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(ViewOptions, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item} ${classes.grow}`
  }, /* @__PURE__ */ h(ViewsBreadcrumb, null))), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_section} ${classes.small_full_width}`,
    justifyContent: "flex-end"
  }, /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(BackupInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(SyncInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(StorageInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(UserInfo, null)))))), /* @__PURE__ */ h(Box, {
    component: "main",
    position: "relative",
    zIndex: 1
  }, /* @__PURE__ */ h(Box, {
    id: "app_content"
  }, /* @__PURE__ */ h(MainAreaRouter, null)), /* @__PURE__ */ h(Box, {
    component: "aside",
    id: "side_panel",
    bgcolor: "#fafafa",
    p: 5,
    mt: 1,
    position: "relative",
    zIndex: 10
  }, /* @__PURE__ */ h(AppMenuItemsContainer, null), /* @__PURE__ */ h(SidePanel, null))), /* @__PURE__ */ h(Box, {
    component: "footer"
  })));
}
export default App;
