import {Component, h} from "../../snowpack/pkg/preact.js";
export class CanvasNode extends Component {
  render() {
    const {position, extra_styles, display, extra_css_class, title, children} = this.props;
    const {on_pointer_enter, on_pointer_leave, on_pointer_down, on_pointer_up, on_click} = this.props;
    const style_outer = {
      ...position,
      position: position ? "absolute" : "relative",
      display: display === void 0 ? "" : display ? "" : "none",
      ...extra_styles
    };
    const mouseable = on_pointer_down || on_pointer_up || on_click || on_pointer_enter || on_pointer_leave ? "mouseable" : "";
    const css_class_names = `node ${mouseable} ${extra_css_class || ""}`;
    return /* @__PURE__ */ h("div", {
      ...this.props.extra_args,
      className: css_class_names,
      style: style_outer,
      title,
      onPointerDown: on_pointer_down,
      onPointerUp: on_pointer_up,
      onClick: on_click,
      onPointerEnter: on_pointer_enter,
      onPointerLeave: on_pointer_leave,
      onContextMenu: (e) => {
        e.preventDefault();
      }
    }, children);
  }
}
