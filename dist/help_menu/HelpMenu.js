import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {Accordion, AccordionDetails, AccordionSummary, Box, makeStyles, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import ExpandMoreIcon from "../../snowpack/pkg/@material-ui/icons/ExpandMore.js";
import "./HelpMenu.css.proxy.js";
import {Modal} from "../modal/Modal.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  return {show: state.display_options.show_help_menu};
};
const map_dispatch = {
  set_show_help_menu: ACTIONS.display.set_show_help_menu
};
const connector = connect(map_state, map_dispatch);
function _HelpMenu(props) {
  const [expanded, set_expanded] = useState("kbd-shortcuts");
  const handle_change = (panel) => (event, new_expanded) => {
    set_expanded(new_expanded ? panel : false);
  };
  if (!props.show)
    return null;
  return /* @__PURE__ */ h(Modal, {
    size: "medium",
    title: "",
    on_close: () => props.set_show_help_menu({show: false}),
    child: /* @__PURE__ */ h(Box, {
      p: 10
    }, /* @__PURE__ */ h(Typography, {
      component: "h1",
      variant: "h5"
    }, "Tips for using DataCurator"), /* @__PURE__ */ h(Accordion, {
      expanded: expanded === "kbd-shortcuts",
      onChange: handle_change("kbd-shortcuts"),
      expandIcon: /* @__PURE__ */ h(ExpandMoreIcon, null)
    }, /* @__PURE__ */ h(AccordionSummary, null, /* @__PURE__ */ h(Typography, {
      component: "h2",
      variant: "h6"
    }, "Commands / shortcuts")), /* @__PURE__ */ h(AccordionDetails, null, /* @__PURE__ */ h(Box, null, "These shortcuts only work when you are not editing a text field.  Some may only work when you are on the Map (Knowledge) canvas view.", shortcuts.map((args) => /* @__PURE__ */ h(ShortcutCommand, {
      ...args
    }))))), /* @__PURE__ */ h(Accordion, {
      expanded: expanded === "linking-tips",
      onChange: handle_change("linking-tips")
    }, /* @__PURE__ */ h(AccordionSummary, null, /* @__PURE__ */ h(Typography, {
      component: "h2",
      variant: "h6"
    }, " Tips on Linking")), /* @__PURE__ */ h(AccordionDetails, null, /* @__PURE__ */ h(Box, null, tips_on_linking.map((tip) => /* @__PURE__ */ h(Typography, {
      component: "p",
      paragraph: true
    }, tip))))), /* @__PURE__ */ h(Accordion, {
      expanded: expanded === "general-tips",
      onChange: handle_change("general-tips"),
      expandIcon: /* @__PURE__ */ h(ExpandMoreIcon, null)
    }, /* @__PURE__ */ h(AccordionSummary, null, /* @__PURE__ */ h(Typography, {
      component: "h2",
      variant: "h6"
    }, "General tips")), /* @__PURE__ */ h(AccordionDetails, null, /* @__PURE__ */ h(Box, null, general_tips.map((tip) => /* @__PURE__ */ h(Typography, {
      component: "p",
      paragraph: true
    }, tip))))), /* @__PURE__ */ h(Accordion, {
      expanded: expanded === "detailed-tips",
      onChange: handle_change("detailed-tips"),
      expandIcon: /* @__PURE__ */ h(ExpandMoreIcon, null)
    }, /* @__PURE__ */ h(AccordionSummary, null, /* @__PURE__ */ h(Typography, {
      component: "h2",
      variant: "h6"
    }, "Detailed tips")), /* @__PURE__ */ h(AccordionDetails, null, /* @__PURE__ */ h(Box, null, detailed_tips.map((tip) => /* @__PURE__ */ h(Typography, {
      component: "p",
      paragraph: true
    }, tip))))))
  });
}
export const HelpMenu = connector(_HelpMenu);
var ActionCommands;
(function(ActionCommands2) {
  ActionCommands2["click"] = "click";
  ActionCommands2["drag"] = "drag";
})(ActionCommands || (ActionCommands = {}));
const shortcuts = [
  {shortcut: ["?"], outcome: "Opens this help menu"},
  {shortcut: ["space"], outcome: "Fit view to components / cycle between groups of components."},
  {shortcut: ["Ctrl", "e"], outcome: "Toggle between presenation and editing modes"},
  {shortcut: ["Ctrl", "d", "s"], outcome: `Toggle showing side panel`},
  {shortcut: ["Ctrl", "d", "t"], outcome: `Toggle showing time sliders`},
  {shortcut: ["Ctrl", "d", "f"], outcome: `Toggle "focused" mode on and off`},
  {shortcut: ["Ctrl", "d", "a"], outcome: `Toggle animating connections`},
  {shortcut: ["Ctrl", "d", "c"], outcome: `Toggle showing connections as (more) circular`},
  {shortcut: ["Shift", ActionCommands.click, ActionCommands.drag], outcome: "Select multiple nodes"},
  {shortcut: ["Shift", "Ctrl", ActionCommands.click, ActionCommands.drag], outcome: "Deselect multiple nodes"},
  {shortcut: ["Ctrl", "a"], outcome: "Select all nodes on knowledge view"},
  {shortcut: ["Ctrl", "s", "f"], outcome: "Expand selection towards effects (forwards)"},
  {shortcut: ["Ctrl", "s", "c"], outcome: "Expand selection towards causes (backwards)"},
  {shortcut: ["Ctrl", "s", "e"], outcome: "Expand selection"},
  {shortcut: ["Ctrl", "s", "d"], outcome: "Decrease selection (along non circular connections and nodes)"},
  {shortcut: ["Ctrl", "s", "i"], outcome: "Selection components inbetween (interconnections)"},
  {shortcut: ["Ctrl", "f"], outcome: "Open the search menu"}
];
function ShortcutCommand(props) {
  const classes = use_styles();
  return /* @__PURE__ */ h(Box, {
    component: "dl"
  }, /* @__PURE__ */ h(Typography, {
    component: "dt",
    className: classes.command
  }, props.shortcut.map((command, index) => {
    const class_name = command === ActionCommands.click || command === ActionCommands.drag ? "physical_action" : "physical_button";
    return /* @__PURE__ */ h("div", {
      style: {display: "inline"}
    }, /* @__PURE__ */ h("div", {
      className: class_name
    }, command), index < props.shortcut.length - 1 && /* @__PURE__ */ h("span", {
      className: "shortcut_plus"
    }, " + "));
  })), /* @__PURE__ */ h("div", {
    className: classes.command
  }, "   ", props.outcome, " "));
}
const use_styles = makeStyles((theme) => ({
  command: {
    display: "inline"
  },
  outcome: {
    display: "inline"
  }
}));
const tips_on_linking = [
  `Type "@@" in any text field to access a menu to link to any other component.
    This will insert the id of that component, e.g.  @@12345678-abcd-4123-abcd-1234567890ab.`,
  `Follow "@@some-id" with .url, .title and .description to get the attributes
    of that component e.g. "@@12345678-abcd-4123-abcd-1234567890ab.title"`,
  /* @__PURE__ */ h("span", null, "Markdown is available so you can use things like ", /* @__PURE__ */ h("b", null, "**some text**"), 'to make it bold once it is rendered during presentation mode. Other Markdown syntax like "1. some text" will give you numbered lists. See the full ', /* @__PURE__ */ h("a", {
    href: "https: //www.markdownguide.org/basic-syntax/"
  }, "Markdown guide here"))
];
const general_tips = [
  /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Typography, {
    component: "h3",
    variant: "h6"
  }, '"Should" word usage'), 'If you find yourself writing states with "should", e.g. "People ', /* @__PURE__ */ h("b", null, "should"), ' listen more and be less reductionist" then you might consider separating this out into its 4 separate parts and phrasing as the positive or desired state.  Specifically:', /* @__PURE__ */ h("ol", null, /* @__PURE__ */ h("li", null, `the attribute, e.g.: "People listen more and be less reductionist".  Note it is usually easier to express this as the desired state of the attribute instead of the pure attribute itself which is usually longer and less easy to work with: "People's ability to listen and what degree of complexity they can hold in their minds about different subjects".`), /* @__PURE__ */ h("li", null, 'the current value, e.g.: "False"'), /* @__PURE__ */ h("li", null, "the other possibilities.  If the value is a boolean i.e. True/False then this can be skipped otherwise if it is a number or other type of value then add the other different possible values."), /* @__PURE__ */ h("li", null, "the judgement or objective about the desired value, e.g.: create a judgement or objective node, target your state node, and choose the desired value via the comparator"))),
  /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Typography, {
    component: "h3",
    variant: "h6"
  }, '"Action" node type versus "State"'), "The action and state node types are very similar.  The former can be used to draw attention to the areas where you or a team member can have an effect on the project.  You can use actions to represent the activity of third party actors but this usually draws unwarranted attention to these components.")
];
const detailed_tips = [
  /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Typography, {
    component: "h3",
    variant: "h6"
  }, "State subtypes"), "There are three State subtypes:", /* @__PURE__ */ h("ol", null, /* @__PURE__ */ h("li", null, "boolean, e.g. True / False"), /* @__PURE__ */ h("li", null, "number"), /* @__PURE__ */ h("li", null, "other")), "Often you can represent the same attribute in different ways and this will depend on what level of detail is salient to the conversation / the model of the scenario you are interested in.", /* @__PURE__ */ h("ol", null, /* @__PURE__ */ h("li", null, 'a boolean, with title "The medical response was fast" or "The medical response time was adequate"'), /* @__PURE__ */ h("li", null, '"other" with title "The medical response", with values of "Very slow", "Slow", "Medium", "Fast", "Very fast" etc.'), /* @__PURE__ */ h("li", null, '"number" with title "The medical response speed", where the value perhaps represents the time in minutes until aid was first administered.'))),
  /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Typography, {
    component: "h3",
    variant: "h6"
  }, "Multidimensional states"), 'Often there can be attributes / concepts which have two dimensions to them which are salient together, e.g. "The medical response was fast and effective".  These can be modelled using states with titles and subtypes in many ways, for example:', /* @__PURE__ */ h("ol", null, /* @__PURE__ */ h("li", null, 'a boolean, with title "The medical response was (adequately) fast and effective"'), /* @__PURE__ */ h("li", null, '"number" with title "The medical response speed and effectiveness", where the value is derived from some formula to calculate a single number based of the two attributes of speed and effectiveness.')), 'If the concept later needs to be analysed / comprehended / explored in greater detail it can be decomposed.  Either it could be change to a subtype of "other" with title "The medical response speed and effectiveness", with values of "fast and effective", "fast but ineffective", "slow but effective", "slow and ineffective".  Or replaced by two new seperate states, one for "Medical response speed" and one for "Medical response effectiveness".  In the latter case deleting the first node from the knowledge views would be best.  In the former case, ', /* @__PURE__ */ h("a", {
    href: "https: //github.com/centerofci/data-curator2/issues/36"
  }, "versioning the whole component"), " would make this easier from a user's perspective."),
  /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Typography, {
    component: "h3",
    variant: "h6"
  }, "Temporal uncertainty"), /* @__PURE__ */ h("p", null, 'Part of making predictions is knowing when some event may occur.  For this we have a very simple "Temporal Uncertainty" form that has three fields: Min, Expected and Max datetime.'), /* @__PURE__ */ h("p", null, "It's important to note that this represents a single event and not a distribution of similar events.  It is also not directly the uncertain temporal range a state might exist over.  i.e. the min is the earliest when the event can occur.  This is easier to understand if you talk about the max value.  The max is the latest the event can occur.  This means the state (associate with state transition events) will occur from the max of an event marking its existence but might occur earlier: up to an including the min datetime of the event."), /* @__PURE__ */ h("p", null, "A concrete example: you will switch on the light in 1 minute (min), likely in 5 minutes (expected) or at most in 10 minutes (max).  But this does not mean the room will be lit from 1 minutes time to 10 minutes time."), /* @__PURE__ */ h("p", null, "The current form is also woefully simplistic for a lot of the uncertain temporal distributions you have inside your head, use almost all the time, use seamlessly, unconsciously, and yet are vital to coordinated effective collaboration, for (complex) interventions."), /* @__PURE__ */ h("p", null, "For example: when are you going to get funding for project X, when will have a hire for position Y, when will your change job, when will you next go shopping (if it's not raining AND someone else not gone yet AND time after 7 am AND time less 10 am then ...)."))
];
