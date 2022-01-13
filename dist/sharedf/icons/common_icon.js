import {h} from "../../../snowpack/pkg/preact.js";
export function CommonIcon(props) {
  let {className = ""} = props;
  className = "MuiSvgIcon-root " + className;
  if (props.fontSize === "small")
    className += " MuiSvgIcon-fontSizeSmall ";
  return /* @__PURE__ */ h("span", {
    title: props.title
  }, /* @__PURE__ */ h("svg", {
    className,
    viewBox: "0 0 24 24",
    style: props.style
  }, /* @__PURE__ */ h("path", {
    d: props.d
  })));
}
