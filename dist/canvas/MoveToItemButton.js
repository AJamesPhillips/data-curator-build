import {h} from "../../snowpack/pkg/preact.js";
import {useEffect} from "../../snowpack/pkg/preact/hooks.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {Box, IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
export function MoveToItemButton(props) {
  const {
    move,
    draw_attention,
    have_finished_drawing_attention = () => {
    }
  } = props;
  useEffect(() => {
    if (!props.enable_spacebar_move_to_shortcut)
      return;
    return pub_sub.global_keys.sub("key_down", (e) => {
      if (move && e.key === " ") {
        move();
      }
    });
  }, [props.enable_spacebar_move_to_shortcut, move]);
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: move ? "Move to component(s)" : "No component(s) present"
  }, /* @__PURE__ */ h("span", null, /* @__PURE__ */ h(IconButton, {
    size: "medium",
    onClick: move,
    disabled: !move
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null)))), /* @__PURE__ */ h("div", {
    className: move && draw_attention ? "pulsating_circle" : "",
    ref: (e) => setTimeout(() => {
      e?.classList.remove("pulsating_circle");
      have_finished_drawing_attention();
    }, 1e4)
  }));
}
