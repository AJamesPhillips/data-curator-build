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
  }, " Beta "))), /* @__PURE__ */ h(Box, {
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
  }, /* @__PURE__ */ h("strong", null, action_text))), /* @__PURE__ */ h("h3", null, "What is ", /* @__PURE__ */ h("strong", null, "Data Curator"), "?"), /* @__PURE__ */ h("p", null, "DataCurator is a tool to map and manage complex problems."), /* @__PURE__ */ h("p", null, "Data is messy, and the more types of data you need the messier it gets. DataCurator helps you to understand complex problems by breaking down large, disparate, and overlapping sets of information into modular component parts."), /* @__PURE__ */ h("p", null, "Navigating a complex system requires gathering and interpreting a variety of data from a diverse range of sources: quantitative and qualitative data from different kinds of surveys and studies, research and insights from numerous experts in different fields, sets of goals and priorities from different stakeholders."), /* @__PURE__ */ h("p", null, "DataCurator allows you to build a usable, shareable model of a complex system to help you organize successful interventions."), /* @__PURE__ */ h("h3", null, "How does it work?"), /* @__PURE__ */ h("p", null, "DataCurator visualizes connections between different types of data. You can put all your different types of information into one place, then isolate certain components and identify relationships and patterns across the full range of data."), /* @__PURE__ */ h("p", null, "There are two dimensions of time built into the tool: one that lets you track your time within the tool itself, allowing you to check what you did when; and one that lets you plan interventions at simulated timescales."), /* @__PURE__ */ h("p", null, "DataCurator allows you to plan for the uncertainty built into potential interventions. Uncertainty is inherent to complex systems: numbers may be inaccurate, people may behave differently than expected, circumstances can change rapidly. Planning a successful intervention requires accounting for various potential outcomes. With DataCurator you can enter a potential event in the simulated timescale of your planned intervention, then assign uncertainty to specific values."), /* @__PURE__ */ h("p", null, "For example, you might say that if a positive test rate is at or below 3% it's not a problem, but if it gets above that level different scenarios emerge."), /* @__PURE__ */ h("p", null, "DataCurator aims to facilitate and encourage more precise and systematic recording of all the key elements we use to create models: the definitions, statuses, processes, assumptions, and imagined potential outcomes, based on all the information you have."), /* @__PURE__ */ h("h3", null, "Who is it for?"), /* @__PURE__ */ h("p", null, "DataCurator is for anyone trying to understand a complex system and intervene in it, who has a lot of information to understand and interpret."), /* @__PURE__ */ h("p", null, "Use it for simple note-taking and organizing, or model and plan an entire intervention. Choose key indicators to simplify the map or use the goal-priority view to keep your goals on track."), /* @__PURE__ */ h("h3", null, "How do I get started?"), /* @__PURE__ */ h("p", null, "Click on the ", /* @__PURE__ */ h("a", {
    href: "/app/"
  }, "button"), " above or ", /* @__PURE__ */ h("a", {
    href: "https://www.youtube.com/playlist?list=PLdbIJ7BPHJ_lHTDvBE8PhpLccPNq4Mu7E"
  }, "watch the video tutorial series")), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("iframe", {
    width: "560",
    height: "315",
    src: "https://www.youtube.com/embed/videoseries?list=PLdbIJ7BPHJ_lHTDvBE8PhpLccPNq4Mu7E",
    title: "YouTube video player",
    frameBorder: "0",
    ...{allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"},
    allowFullScreen: true
  })), /* @__PURE__ */ h("h3", null, "Who built it?"), /* @__PURE__ */ h("p", null, "DataCurator is a ", /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/projects/datacurator/"
  }, "CCI project"), " supported by ", /* @__PURE__ */ h("a", {
    href: "https://centerofci.org/about/"
  }, "our generous funders"), "."), /* @__PURE__ */ h("h3", null, "I have an idea, question or I have found a bug!"), /* @__PURE__ */ h("p", null, "Please post any requests for ", /* @__PURE__ */ h("a", {
    href: "https://github.com/centerofci/DataCurator/discussions/categories/q-a"
  }, "support or questions here"), " or email us at webadmin at centerofci dot org . For any bugs please ", /* @__PURE__ */ h("a", {
    href: "https://github.com/centerofci/DataCurator/issues"
  }, "post here"), "."), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("a", {
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
