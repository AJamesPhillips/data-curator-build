import {h} from "../../_snowpack/pkg/preact.js";
import {Button as MaterialButton} from "../../_snowpack/pkg/@material-ui/core.js";
import {Hidden} from "../../_snowpack/pkg/@material-ui/core.js";
export function Button(props) {
  return /* @__PURE__ */ h(Hidden, {
    xsUp: props.is_hidden
  }, /* @__PURE__ */ h(MaterialButton, {
    title: props.title,
    color: props.color || "primary",
    style: props.style,
    component: props.component,
    disabled: props.disabled || false,
    disableElevation: props.disableElevation || true,
    disableFocusRipple: props.disableFocusRipple || false,
    endIcon: props.endIcon,
    fullWidth: props.fullWidth || false,
    href: props.href,
    size: props.size || "small",
    startIcon: props.startIcon,
    variant: props.variant || "contained",
    onPointerDown: (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      props.onPointerDown ? props.onPointerDown(e) : props.onClick && props.onClick(e);
    }
  }, props.children || props.value));
}
