import {h} from "../../snowpack/pkg/preact.js";
import {Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, withStyles} from "../../snowpack/pkg/@material-ui/core.js";
import PersonIcon from "../../snowpack/pkg/@material-ui/icons/Person.js";
import PeopleIcon from "../../snowpack/pkg/@material-ui/icons/People.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
export function ActiveUserWidget() {
  const active_user_count = 0 + 0;
  const classes = use_styles();
  const [user_list_is_open, set_user_list_is_open] = useState(false);
  const handleClickOpen = () => {
    set_user_list_is_open(true);
  };
  const handleClose = (value) => {
    set_user_list_is_open(false);
  };
  if (active_user_count <= 0)
    return null;
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(IconButton, {
    "aria-label": `${active_user_count}  Active users`,
    className: classes.button,
    onClick: handleClickOpen,
    size: "small"
  }, /* @__PURE__ */ h(StyledBadge, {
    badgeContent: active_user_count,
    color: "secondary",
    overlap: "rectangle",
    max: 10
  }, active_user_count == 1 && /* @__PURE__ */ h(PersonIcon, {
    className: classes.icon
  }), active_user_count > 1 && /* @__PURE__ */ h(PeopleIcon, {
    className: classes.icon
  }))), /* @__PURE__ */ h(Dialog, {
    open: user_list_is_open,
    onClose: handleClose,
    scroll: "paper"
  }, /* @__PURE__ */ h(DialogTitle, null, "Active Users"), /* @__PURE__ */ h(DialogContent, null, /* @__PURE__ */ h(List, {
    dense: true
  }, /* @__PURE__ */ h(ListItem, null, /* @__PURE__ */ h(ListItemAvatar, null, /* @__PURE__ */ h(Avatar, null, /* @__PURE__ */ h(PersonIcon, null))), /* @__PURE__ */ h(ListItemText, {
    primary: "username1",
    secondary: "user1@email.com"
  })), /* @__PURE__ */ h(ListItem, null, /* @__PURE__ */ h(ListItemAvatar, null, /* @__PURE__ */ h(Avatar, null, /* @__PURE__ */ h(PersonIcon, null))), /* @__PURE__ */ h(ListItemText, {
    primary: "username2",
    secondary: "user2@email.com"
  })))), /* @__PURE__ */ h(DialogActions, null, /* @__PURE__ */ h(Button, {
    onClick: handleClose
  }, "Close"))));
}
const StyledBadge = withStyles((theme) => ({
  badge: {
    top: 2,
    right: "-0.42em",
    zIndex: 1
  }
}))(Badge);
const use_styles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    marginRight: "1em",
    border: `1px ${theme.palette.divider} solid`
  },
  icon: {
    position: "relative",
    zIndex: 10
  }
}));
