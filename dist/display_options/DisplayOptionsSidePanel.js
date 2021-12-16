import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {ACTIONS} from "../state/actions.js";
import {TimeResolutionOptions} from "./TimeResolutionOptions.js";
import {EditableCheckbox} from "../form/EditableCheckbox.js";
const map_state = (state) => ({
  validity_filter: state.display_options.validity_filter,
  certainty_formatting: state.display_options.certainty_formatting,
  display_by_simulated_time: state.display_options.display_by_simulated_time,
  focused_mode: state.display_options.focused_mode,
  circular_links: state.display_options.circular_links,
  display_time_marks: state.display_options.display_time_marks,
  animate_connections: state.display_options.animate_connections,
  show_large_grid: state.display_options.show_large_grid,
  display_time_sliders: state.controls.display_time_sliders
});
const map_dispatch = {
  set_validity_filter: ACTIONS.display.set_validity_filter,
  set_certainty_formatting: ACTIONS.display.set_certainty_formatting,
  set_display_by_simulated_time: ACTIONS.display.set_display_by_simulated_time,
  set_or_toggle_focused_mode: ACTIONS.display.set_or_toggle_focused_mode,
  set_or_toggle_circular_links: ACTIONS.display.set_or_toggle_circular_links,
  set_display_time_marks: ACTIONS.display.set_display_time_marks,
  set_or_toggle_animate_connections: ACTIONS.display.set_or_toggle_animate_connections,
  set_or_toggle_show_large_grid: ACTIONS.display.set_or_toggle_show_large_grid,
  set_display_time_sliders: ACTIONS.controls.set_display_time_sliders
};
const connector = connect(map_state, map_dispatch);
function _DisplayOptionsSidePanel(props) {
  return /* @__PURE__ */ h("div", {
    className: "side_panel"
  }, /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Validity filter"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Show:   ", /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "",
    options: validity_filter_display_options,
    selected_option_id: props.validity_filter,
    allow_none: false,
    on_change: (validity_filter) => {
      if (!validity_filter)
        return;
      props.set_validity_filter({validity_filter});
    },
    force_editable: true
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    className: "description"
  }, "Show only nodes and connections with validity ", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("i", null, "certainty ", validity_filter_descriptions[props.validity_filter]), " ", description_of_certainty, ".")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Validity formatting"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Opacity:   ", /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "",
    options: certainty_formatting_display_options,
    selected_option_id: props.certainty_formatting,
    allow_none: false,
    on_change: (certainty_formatting) => {
      if (!certainty_formatting)
        return;
      props.set_certainty_formatting({certainty_formatting});
    },
    force_editable: true
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    className: "description"
  }, "Show nodes and connection opacity as ", /* @__PURE__ */ h("i", null, certainty_formatting_descriptions[props.certainty_formatting]), " ", description_of_certainty, ".")), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Time resolution"), "  ", /* @__PURE__ */ h(TimeResolutionOptions, null)), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, 'Use "Focused" Mode'), "  ", /* @__PURE__ */ h("span", {
    className: "description"
  }, "ctrl + d + f"), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.focused_mode,
    on_change: props.set_or_toggle_focused_mode
  })), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Show connections as more circular"), "  ", /* @__PURE__ */ h("span", {
    className: "description"
  }, "ctrl + d + c"), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.circular_links,
    on_change: props.set_or_toggle_circular_links
  })), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Animate connections"), "  ", /* @__PURE__ */ h("span", {
    className: "description"
  }, "ctrl + d + a"), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.animate_connections,
    on_change: props.set_or_toggle_animate_connections
  })), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Show time markers"), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.display_time_marks,
    on_change: props.set_display_time_marks
  })), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, "Show large grid (whilst editing)"), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.show_large_grid,
    on_change: props.set_or_toggle_show_large_grid
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("h3", null, "Controls"), /* @__PURE__ */ h("p", {
    className: "section"
  }, /* @__PURE__ */ h("b", null, 'Whilst presenting, display time sliders for "created at" and "simulated" time'), /* @__PURE__ */ h(EditableCheckbox, {
    value: props.display_time_sliders,
    on_change: (display_time_sliders) => {
      props.set_display_time_sliders(display_time_sliders);
    }
  })));
}
export const DisplayOptionsSidePanel = connector(_DisplayOptionsSidePanel);
const description_of_certainty = "(certainty is the minimum of probability or confidence, e.g. something with 70% probability and 20% confidence is 20% certain)";
const validity_filter_display_options = [
  {id: "only_certain_valid", title: "Only valid"},
  {id: "only_maybe_valid", title: "Only maybe Valid"},
  {id: "maybe_invalid", title: "Maybe Invalid"},
  {id: "show_invalid", title: "Invalid"}
];
const validity_filter_descriptions = {
  only_certain_valid: "100%",
  only_maybe_valid: "> 50%",
  maybe_invalid: "> 0%",
  show_invalid: ">= 0%"
};
const certainty_formatting_display_options = [
  {id: "render_certainty_as_opacity", title: "Use certainty"},
  {id: "render_certainty_as_easier_opacity", title: "Use certainty (opacity >= 50%)"},
  {id: "render_100_opacity", title: "Always 100%"}
];
const certainty_formatting_descriptions = {
  render_certainty_as_opacity: "proportional to certainty",
  render_certainty_as_easier_opacity: "proportional to certainty but no lower than 50% (easier to see)",
  render_100_opacity: "always 100% (no transparency)"
};
