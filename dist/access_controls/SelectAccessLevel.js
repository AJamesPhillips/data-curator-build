import {Select, MenuItem} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
export function SelectAccessLevel(props) {
  const {level, current_level, on_click} = props;
  return /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => on_click(level),
    value: sentence_case(level),
    disabled: level === current_level
  });
}
export function SelectAccessLevelDropDown(props) {
  const levels = ["editor", "viewer", "none"];
  return /* @__PURE__ */ h(Select, {
    disabled: props.disabled,
    value: props.current_level,
    title: props.title || "Select access level",
    onChange: (e) => {
      const level = e.currentTarget.getAttribute("data-value");
      props.on_change(level);
    }
  }, levels.map((level) => /* @__PURE__ */ h(MenuItem, {
    value: level
  }, sentence_case(level))));
}
