import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import "./CanvasConnnection.css.proxy.js";
import {ConnectionEndType, ConnectionEnd} from "./ConnectionEnd.js";
import {derive_coords} from "./derive_coords.js";
export function CanvasConnnection(props) {
  const [hovered, set_hovered] = useState(false);
  const {from_node_position, to_node_position, from_connection_type, to_connection_type, line_behaviour} = props;
  if (!from_node_position || !to_node_position)
    return null;
  const {x1, y1, x2, y2, relative_control_point1, relative_control_point2, end_angle} = derive_coords({
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type,
    line_behaviour
  });
  let opacity = props.intensity === void 0 ? 1 : props.intensity;
  const thickness = hovered ? 2 : props.thickness === void 0 ? 2 : props.thickness;
  const blur = props.blur || 0;
  const style_line_background = {
    strokeWidth: thickness + 10
  };
  const style_line = {
    strokeOpacity: opacity,
    strokeWidth: thickness,
    filter: blur ? `url(#blur_filter_${Math.round(blur)})` : ""
  };
  const extra_line_classes = `${hovered ? "hovered" : props.is_highlighted ? "highlighted" : ""}`;
  const extra_background_classes = (props.on_click ? " mouseable " : "") + extra_line_classes;
  return /* @__PURE__ */ h("g", {
    className: "connection_container " + (props.extra_css_classes || ""),
    onPointerDown: props.on_click,
    style: {display: props.hidden ? "none" : ""}
  }, /* @__PURE__ */ h("path", {
    className: "connection_line_background " + extra_background_classes,
    d: `M ${x1} ${-y1} C ${x1 + relative_control_point1.x},${-y1 - relative_control_point1.y}, ${x2 + relative_control_point2.x},${-y2 - relative_control_point2.y}, ${x2},${-y2}`,
    onPointerOver: () => set_hovered(true),
    onPointerOut: () => set_hovered(false),
    style: style_line_background
  }), /* @__PURE__ */ h("path", {
    className: "connection_line " + extra_line_classes,
    d: `M ${x1} ${-y1} C ${x1 + relative_control_point1.x},${-y1 - relative_control_point1.y}, ${x2 + relative_control_point2.x},${-y2 - relative_control_point2.y}, ${x2},${-y2}`,
    style: style_line
  }), /* @__PURE__ */ h(ConnectionEnd, {
    type: props.connection_end_type || ConnectionEndType.positive,
    x: x2,
    y: y2,
    end_angle,
    opacity,
    blur,
    size: thickness / 2,
    is_hovered: hovered,
    is_highlighted: props.is_highlighted
  }));
}
