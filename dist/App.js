import {h} from "../snowpack/pkg/preact.js";
import {useEffect} from "../snowpack/pkg/preact/hooks.js";
import {connect} from "../snowpack/pkg/react-redux.js";
import clsx from "../snowpack/pkg/clsx.js";
import {AppBar, Box, CssBaseline, Drawer, makeStyles, ThemeProvider, Toolbar, Typography} from "../snowpack/pkg/@material-ui/core.js";
import "./App.css.proxy.js";
import {MainAreaRouter} from "./layout/MainAreaRouter.js";
import {AppMenuItemsContainer} from "./layout/AppMenuItemsContainer.js";
import {SidePanel} from "./side_panel/SidePanel.js";
import {ViewsBreadcrumb} from "./views/ViewsBreadcrumb.js";
import {DefaultTheme} from "./ui_themes/material_default.js";
import {ViewOptions} from "./views/ViewOptions.js";
import {StorageInfo} from "./sync/storage_location/StorageInfo.js";
import {UserInfo} from "./sync/user_info/UserInfo.js";
import {SyncInfo} from "./sync/SyncInfo.js";
import {HelpMenu} from "./help_menu/HelpMenu.js";
import {ActiveCreatedAtFilterWarning} from "./sharedf/ActiveCreatedAtFilterWarning.js";
import {ActiveCreationContextWarning} from "./sharedf/ActiveCreationContextWarning.js";
import {ActiveFilterWarning} from "./sharedf/ActiveFilterWarning.js";
import {SidePanelOrMenuButton} from "./side_panel/SidePanelOrMenuButton.js";
import {Modal} from "./modal/Modal.js";
import {get_store} from "./state/store.js";
import {check_and_handle_connection_and_session} from "./sync/user_info/window_focus_session_check.js";
import {date_to_string} from "./form/datetime_utils.js";
import {ActiveUserWidget} from "./sharedf/ActiveUserWidget.js";
import {SIDE_PANEL_WIDTH} from "./side_panel/width.js";
const map_state = (state) => ({
  display_side_panel: state.controls.display_side_panel,
  animate_connections: state.display_options.animate_connections,
  network_functional: state.sync.network_functional,
  network_function_last_checked: state.sync.network_function_last_checked
});
const connector = connect(map_state);
function App(props) {
  const classes = use_styles();
  useEffect(() => {
    if (props.network_functional)
      return;
    setTimeout(() => check_and_handle_connection_and_session(get_store()), 1e3);
  }, [props.network_functional, props.network_function_last_checked]);
  return /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(CssBaseline, null), !props.network_functional && /* @__PURE__ */ h(Modal, {
    title: "",
    size: "small",
    child: /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Typography, {
      id: "modal-modal-title",
      variant: "h6",
      component: "h2"
    }, "Reconnecting..."), /* @__PURE__ */ h(Typography, {
      id: "modal-modal-description",
      sx: {mt: 2}
    }, "Last attempt: ", date_to_string({date: props.network_function_last_checked, time_resolution: "second"})))
  }), /* @__PURE__ */ h(Box, {
    id: "app",
    className: classes.root
  }, /* @__PURE__ */ h(AppBar, {
    elevation: 1,
    id: "header",
    position: "fixed",
    className: classes.app_bar
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
  }, /* @__PURE__ */ h(ActiveCreatedAtFilterWarning, null), /* @__PURE__ */ h(ActiveFilterWarning, null), /* @__PURE__ */ h(ActiveCreationContextWarning, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(ActiveUserWidget, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(SyncInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(StorageInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(UserInfo, null)), /* @__PURE__ */ h(Box, {
    className: `${classes.toolbar_item}`
  }, /* @__PURE__ */ h(SidePanelOrMenuButton, null))))), /* @__PURE__ */ h(Box, {
    id: "app_content",
    component: "div",
    className: clsx(classes.content, {
      [classes.content_with_open_side_panel]: props.display_side_panel,
      animate_connections: props.animate_connections
    })
  }, /* @__PURE__ */ h(MainAreaRouter, null)), /* @__PURE__ */ h(Drawer, {
    anchor: "right",
    className: classes.drawer,
    open: props.display_side_panel,
    variant: "persistent"
  }, /* @__PURE__ */ h(Box, {
    component: "aside",
    className: classes.side_panel,
    id: "side_panel"
  }, /* @__PURE__ */ h(Box, {
    id: "side_panel_content",
    className: classes.side_panel_content
  }, /* @__PURE__ */ h(AppMenuItemsContainer, null), /* @__PURE__ */ h(SidePanel, null)))), /* @__PURE__ */ h(Box, {
    className: classes.help_popup
  }, /* @__PURE__ */ h(HelpMenu, null))));
}
export default connector(App);
const use_styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex"
  },
  app_bar: {
    marginRight: 0,
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    transition: theme.transitions.create(["all"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.drawer + 1
  },
  app_bar_with_open_side_panel: {},
  content: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    marginRight: -SIDE_PANEL_WIDTH,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  content_with_open_side_panel: {
    marginRight: 0,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: SIDE_PANEL_WIDTH,
    flexShrink: 0
  },
  side_panel: {
    backgroundColor: theme.palette.background.paper,
    width: SIDE_PANEL_WIDTH,
    position: "relative",
    paddingTop: 50
  },
  side_panel_content: {
    marginTop: 10,
    padding: 10
  },
  sidebar_toolbar: {
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  toolbar: {
    flexGrow: 1,
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
  help_popup: {
    position: "relative",
    zIndex: theme.zIndex.drawer + 1
  },
  small_full_width: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "100%",
      margin: 0
    }
  },
  grow: {flexGrow: 1},
  hide: {display: "none"},
  warning_icon: {color: theme.palette.warning.main}
}));
