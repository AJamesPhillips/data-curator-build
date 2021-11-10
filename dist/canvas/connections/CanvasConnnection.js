import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "./CanvasConnnection.css.proxy.js";
import {ConnectionEndType, ConnectionEnd} from "./ConnectionEnd.js";
import {derive_coords} from "./derive_coords.js";
export function CanvasConnnection(props) {
  const [hovered, set_hovered] = useState(false);
  const target_position = useRef(void 0);
  const {
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type,
    line_behaviour,
    on_pointer_over_out = () => {
    }
  } = props;
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
  const new_target = useMemo(() => ({
    x1,
    y1,
    relative_control_point_x1: relative_control_point1.x,
    relative_control_point_y1: relative_control_point1.y,
    relative_control_point_x2: relative_control_point2.x,
    relative_control_point_y2: relative_control_point2.y,
    x2,
    y2
  }), [x1, y1, relative_control_point1.x, relative_control_point1.y, relative_control_point2.x, relative_control_point2.y, x2, y2]);
  const d_args = target_position.current || new_target;
  return /* @__PURE__ */ h("g", {
    className: "connection_container " + (props.extra_css_classes || ""),
    onPointerDown: props.on_click,
    style: {display: props.hidden ? "none" : ""}
  }, /* @__PURE__ */ h("path", {
    className: "connection_line_background " + extra_background_classes,
    d: calc_d(d_args),
    onPointerOver: () => {
      set_hovered(true);
      on_pointer_over_out(true);
    },
    onPointerOut: () => {
      set_hovered(false);
      on_pointer_over_out(false);
    },
    style: style_line_background
  }), /* @__PURE__ */ h("path", {
    className: "connection_line " + extra_line_classes,
    d: calc_d(d_args),
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
function calc_d({x1, y1, relative_control_point_x1, relative_control_point_y1, relative_control_point_x2, relative_control_point_y2, x2, y2}) {
  const cx1 = x1 + relative_control_point_x1;
  const cy1 = -y1 - relative_control_point_y1;
  const cx2 = x2 + relative_control_point_x2;
  const cy2 = -y2 - relative_control_point_y2;
  return `M ${x1} ${-y1} C ${cx1},${cy1}, ${cx2},${cy2}, ${x2},${-y2}`;
}
function move_to_target(e, target_position, new_target) {
  const _current = target_position.current;
  if (_current === void 0) {
    target_position.current = new_target;
    return;
  } else if (target_position.current === new_target)
    return;
  const current = _current;
  let progress = 0;
  function advance() {
    progress += 0.1;
    const intermediate = {
      x1: tween(current.x1, new_target.x1, progress),
      y1: tween(current.y1, new_target.y1, progress),
      relative_control_point_x1: tween(current.relative_control_point_x1, new_target.relative_control_point_x1, progress),
      relative_control_point_y1: tween(current.relative_control_point_y1, new_target.relative_control_point_y1, progress),
      relative_control_point_x2: tween(current.relative_control_point_x2, new_target.relative_control_point_x2, progress),
      relative_control_point_y2: tween(current.relative_control_point_y2, new_target.relative_control_point_y2, progress),
      x2: tween(current.x2, new_target.x2, progress),
      y2: tween(current.y2, new_target.y2, progress)
    };
    const d = calc_d(intermediate);
    e.setAttribute("d", d);
    if (progress < 1)
      setTimeout(advance, 30);
  }
  setTimeout(advance, 30);
}
function tween(a, b, progress) {
  return a + (b - a) * progress;
}
