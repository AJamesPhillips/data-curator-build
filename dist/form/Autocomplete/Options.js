import {h} from "../../../snowpack/pkg/preact.js";
export function Options(props) {
  const {
    editing_options,
    internal_options_to_display,
    is_option_wrapper_highlighted,
    conditional_on_change,
    set_highlighted_option_index,
    on_mouse_over_option,
    on_mouse_leave_option
  } = props;
  if (internal_options_to_display.length === 0 || !editing_options)
    return null;
  const fudge = 45;
  return /* @__PURE__ */ h("div", {
    className: "options_outer",
    style: {marginTop: 15}
  }, /* @__PURE__ */ h("div", {
    className: "options_inner",
    ref: (e) => {
      if (!e)
        return;
      const max_height = `${document.body.clientHeight - e.clientTop - fudge}px`;
      e.style.setProperty("max-height", max_height);
    }
  }, internal_options_to_display.map((internal_option, index) => /* @__PURE__ */ h("div", {
    className: "option_wrapper " + (is_option_wrapper_highlighted(internal_option, index) ? " highlighted " : ""),
    onMouseDown: () => conditional_on_change(internal_option.id),
    onMouseOver: () => {
      set_highlighted_option_index(index);
      on_mouse_over_option(internal_option.id);
    },
    onMouseLeave: () => on_mouse_leave_option(internal_option.id)
  }, /* @__PURE__ */ h("div", {
    className: "option"
  }, internal_option.jsx || internal_option.title || internal_option.id || "none", /* @__PURE__ */ h("div", {
    className: "option_subtitle"
  }, internal_option.subtitle))))));
}
