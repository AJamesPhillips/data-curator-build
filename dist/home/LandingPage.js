import {h} from "../../snowpack/pkg/preact.js";
import ChevronRightIcon from "../../snowpack/pkg/@material-ui/icons/ChevronRight.js";
import "./LandingPage.css.proxy.js";
import {Box, Button, Container, makeStyles, ThemeProvider, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import {DefaultTheme} from "../ui_themes/material_default.js";
export function LandingPage() {
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
  }, /* @__PURE__ */ h("h2", null, "Welcome!"), /* @__PURE__ */ h(Box, {
    className: `${classes.animated_icon_container} animated_icon_container`
  }, /* @__PURE__ */ h(Button, {
    component: "span",
    variant: "text",
    size: "small",
    endIcon: /* @__PURE__ */ h(ChevronRightIcon, {
      className: classes.animated_icon
    })
  }, "Click here!"), /* @__PURE__ */ h(Button, {
    component: "a",
    href: "/app/",
    variant: "contained",
    color: "secondary",
    disableElevation: true,
    size: "large"
  }, /* @__PURE__ */ h("strong", null, "Get Started"))), /* @__PURE__ */ h("h3", null, "What is ", /* @__PURE__ */ h("strong", null, "Data Curator"), "?"), /* @__PURE__ */ h("p", null, "DataCurator enables you to map complex systems, then plan, communicate and navigate successful interventions in them for the benefit all lives."), /* @__PURE__ */ h("p", null, "DataCurator allows you to build, and share your mental models of the world. It aims to facilitate and encourage more precise and systematic recording of all the key elements of these world models: the definitions, state, processes, assumptions, and imagined potential outcomes into the future, based on the past and present."), /* @__PURE__ */ h("p", null, "This is a ", /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/projects/datacurator/"
  }, "CCI project"), " supported by our generous funders.")), /* @__PURE__ */ h(Box, {
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
  animated_icon_container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  animated_icon: {
    animationName: "bounce_pointer",
    animationDuration: "0.7777777s",
    animationIterationCount: "2.5",
    animationTtimingFunction: "ease-in-out"
  }
}));
