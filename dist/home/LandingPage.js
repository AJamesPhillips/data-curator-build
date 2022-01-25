import {h} from "../../snowpack/pkg/preact.js";
import ChevronRightIcon from "../../snowpack/pkg/@material-ui/icons/ChevronRight.js";
import "./LandingPage.css.proxy.js";
import {Box, Button, Container, makeStyles, ThemeProvider, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import {DefaultTheme} from "../ui_themes/material_default.js";
import {get_supabase} from "../supabase/get_supabase.js";
import {get_persisted_state_object} from "../state/persistence/persistence_utils.js";
export function LandingPage() {
  const supabase = get_supabase();
  const {has_signed_in_at_least_once} = get_persisted_state_object("user_info");
  const session = supabase.auth.session();
  const action_text = session || has_signed_in_at_least_once ? "Go to app" : "Get Started";
  const classes = use_styles();
  return /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(Container, {
    maxWidth: "md",
    className: classes.root
  }, /* @__PURE__ */ h(Box, {
    component: "header",
    className: classes.header
  }, /* @__PURE__ */ h(Typography, {
    component: "span",
    variant: "h3",
    className: classes.icon
  }), /* @__PURE__ */ h(Typography, {
    component: "h1",
    variant: "h3",
    className: classes.title
  }, "Data Curator", /* @__PURE__ */ h(Typography, {
    component: "sup",
    className: classes.version
  }, " Alpha "))), /* @__PURE__ */ h(Box, {
    component: "main"
  }, /* @__PURE__ */ h("h2", null, "Welcome!"), /* @__PURE__ */ h("div", {
    className: classes.get_started_button_container
  }, /* @__PURE__ */ h("div", {
    className: classes.animated_icon_container
  }, /* @__PURE__ */ h("span", {
    className: classes.click_here_text
  }, "Click here!"), /* @__PURE__ */ h(ChevronRightIcon, {
    className: classes.animated_icon
  })), /* @__PURE__ */ h(Button, {
    component: "a",
    href: "/app/",
    variant: "contained",
    color: "secondary",
    disableElevation: true,
    size: "large"
  }, /* @__PURE__ */ h("strong", null, action_text))), /* @__PURE__ */ h("h3", null, "What is ", /* @__PURE__ */ h("strong", null, "Data Curator"), "?"), /* @__PURE__ */ h("p", null, "DataCurator enables you to map and understand complex systems before helping you plan, communicate and navigate successful interventions in them."), /* @__PURE__ */ h("p", null, "DataCurator allows you to build, and share your mental models of the world. It aims to facilitate and encourage more precise and systematic recording of all the key elements of these world models: the definitions, state, processes, assumptions, and imagined potential outcomes into the future, based on the past and present."), /* @__PURE__ */ h("p", null, "This is a ", /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/projects/datacurator/"
  }, "CCI project"), " supported by ", /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/about/"
  }, "our generous funders"), "."), /* @__PURE__ */ h("p", null, "Please post any ", /* @__PURE__ */ h("a", {
    href: "https://github.com/centerofci/DataCurator/discussions/categories/q-a"
  }, "support or questions here"), ". For any bugs please ", /* @__PURE__ */ h("a", {
    href: "https://github.com/centerofci/DataCurator/issues"
  }, "post here"), "."), /* @__PURE__ */ h("a", {
    href: "/app/#wcomponents/&storage_location=16&subview_id=b97c6b8e-b920-4a10-b446-b84588eebd56&view=knowledge&x=8&y=-1909&zoom=12"
  }, /* @__PURE__ */ h("img", {
    src: "/image_1.png",
    style: {maxWidth: "100%"}
  })), /* @__PURE__ */ h("div", null, "Example screenshot of the ", /* @__PURE__ */ h("a", {
    href: "/app/#wcomponents/&storage_location=16&subview_id=b97c6b8e-b920-4a10-b446-b84588eebd56&view=knowledge&x=8&y=-1909&zoom=12"
  }, "Foresight Obesity model in DataCurator")), /* @__PURE__ */ h("p", {
    style: {textAlign: "center"}
  }, /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/about/"
  }, /* @__PURE__ */ h("img", {
    src: "/cci_logo.svg",
    style: {width: 120, marginTop: 40}
  })))), /* @__PURE__ */ h(Box, {
    component: "footer"
  })));
}
const use_styles = makeStyles((theme) => ({
  root: {
    marginTop: 25
  },
  version: {
    color: "#a00",
    fontWeight: "bold"
  },
  header: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    display: "inline-block",
    minWidth: "1em",
    maxWidth: "10vw",
    height: "1em",
    overflow: "hidden",
    marginRight: "0.25em",
    "&:empty": {
      display: "none"
    }
  },
  img: {
    display: "block",
    maxHeight: "100%"
  },
  title: {
    fontWeight: "bold",
    flexGrow: 1,
    flexShrink: 1,
    minHeight: "100%"
  },
  get_started_button_container: {
    display: "flex"
  },
  animated_icon_container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    margin: "auto 0"
  },
  click_here_text: {
    margin: "auto 0",
    cursor: "default"
  },
  animated_icon: {
    animationName: "bounce_pointer",
    animationDuration: "0.7777777s",
    animationIterationCount: "2.5",
    animationTtimingFunction: "ease-in-out"
  }
}));
