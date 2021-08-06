import {h} from "../../snowpack/pkg/preact.js";
import "./Label.css.proxy.js";
const is_statement_props = (props) => {
  return props.hasOwnProperty("statement");
};
export function Label(props) {
  const label = is_statement_props(props) ? props.statement.content : props.pattern.name;
  const css_class = "label " + (props.is_small ? "small " : " ") + (is_statement_props(props) ? "statement" : "pattern");
  return /* @__PURE__ */ h("div", {
    className: css_class
  }, label);
}
