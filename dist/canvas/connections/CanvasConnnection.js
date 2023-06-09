import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "./CanvasConnnection.css.proxy.js";
import {ConnectionEndType, ConnectionEnd} from "./ConnectionEnd.js";
import {derive_coords} from "./derive_coords.js";
import {bounded} from "../../shared/utils/bounded.js";
export function CanvasConnnection(props) {
  const [hovered, set_hovered] = useState(false);
  const current_position = useRef(void 0);
  const path_background = useRef(void 0);
  const animate_to_target_timeout = useRef(void 0);
  const {
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type,
    line_behaviour,
    circular_links,
    on_pointer_over_out = () => {
    },
    should_animate = true,
    connection_end_type = ConnectionEndType.positive
  } = props;
  if (!from_node_position || !to_node_position)
    return null;
  let opacity = props.intensity ?? 1;
  const thickness = hovered ? 2 : props.thickness ?? 2;
  const end_size = bounded(thickness * 2.5, 10, 35);
  const blur = props.blur ?? 0;
  const style_line_background = {
    strokeWidth: thickness + 10
  };
  const style_line = {
    strokeOpacity: opacity,
    strokeWidth: thickness,
    filter: blur ? `url(#blur_filter_${Math.round(blur)})` : ""
  };
  const extra_line_classes = hovered ? " hovered " : props.focused_mode ? "" : props.is_highlighted ? " highlighted " : "";
  const extra_background_classes = (props.on_click ? " mouseable " : "") + extra_line_classes;
  const {xe2, ye2, end_angle, target_position} = useMemo(() => {
    const {
      x1,
      y1,
      xe2: xe22,
      ye2: ye22,
      xo2,
      yo2,
      relative_control_point1,
      relative_control_point2,
      end_angle: end_angle2
    } = derive_coords({
      from_node_position,
      to_node_position,
      from_connection_type,
      to_connection_type,
      line_behaviour,
      circular_links,
      end_size: end_size / 10,
      connection_end_type
    });
    const target_position2 = {
      x1,
      y1,
      relative_control_point_x1: relative_control_point1.x,
      relative_control_point_y1: relative_control_point1.y,
      relative_control_point_x2: relative_control_point2.x,
      relative_control_point_y2: relative_control_point2.y,
      x2: xo2,
      y2: yo2,
      progress: 0
    };
    return {xe2: xe22, ye2: ye22, end_angle: end_angle2, target_position: target_position2};
  }, [
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type,
    line_behaviour,
    circular_links,
    end_size,
    connection_end_type
  ]);
  const d_args = should_animate ? current_position.current || target_position : target_position;
  return /* @__PURE__ */ h("g", {
    className: "connection_container " + (props.extra_css_classes || ""),
    onPointerDown: props.on_click,
    style: {display: props.hidden ? "none" : ""}
  }, /* @__PURE__ */ h("path", {
    className: "connection_line_background " + extra_background_classes,
    d: calc_d(target_position),
    onPointerOver: () => {
      set_hovered(true);
      on_pointer_over_out(true);
    },
    onPointerOut: () => {
      set_hovered(false);
      on_pointer_over_out(false);
    },
    style: style_line_background,
    ref: (e) => path_background.current = e || void 0
  }), /* @__PURE__ */ h("path", {
    className: "connection_line " + extra_line_classes,
    d: calc_d(d_args),
    ref: (path) => {
      if (!path || !should_animate)
        return;
      if (animate_to_target_timeout.current)
        clearTimeout(animate_to_target_timeout.current);
      const path_background_el = hovered || props.is_highlighted ? path_background.current : void 0;
      animate_to_target_timeout.current = animate_to_target(path, path_background_el, current_position, target_position);
    },
    style: style_line
  }), /* @__PURE__ */ h(ConnectionEnd, {
    type: connection_end_type,
    x: xe2,
    y: ye2,
    end_angle,
    opacity,
    blur,
    size: end_size,
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
const step_ms = 30;
const animation_total_ms = 1 * 1e3;
const progress_step = step_ms / animation_total_ms;
function animate_to_target(path, path_background, current_position, target_position) {
  if (current_position.current === void 0 || current_position.current === target_position) {
    target_position.progress = 1;
    current_position.current = target_position;
    return;
  }
  const current = current_position.current;
  let timeout = void 0;
  function advance() {
    let progress = target_position.progress + progress_step;
    progress = Math.min(progress, 1);
    target_position.progress = progress;
    const intermediate = {
      x1: tween(current.x1, target_position.x1, progress),
      y1: tween(current.y1, target_position.y1, progress),
      relative_control_point_x1: tween(current.relative_control_point_x1, target_position.relative_control_point_x1, progress),
      relative_control_point_y1: tween(current.relative_control_point_y1, target_position.relative_control_point_y1, progress),
      relative_control_point_x2: tween(current.relative_control_point_x2, target_position.relative_control_point_x2, progress),
      relative_control_point_y2: tween(current.relative_control_point_y2, target_position.relative_control_point_y2, progress),
      x2: tween(current.x2, target_position.x2, progress),
      y2: tween(current.y2, target_position.y2, progress)
    };
    const d = calc_d(intermediate);
    path.setAttribute("d", d);
    path_background?.setAttribute("d", d);
    if (progress >= 1) {
      if (timeout)
        clearTimeout(timeout);
      current_position.current = target_position;
    }
  }
  timeout = setInterval(advance, step_ms);
  return timeout;
}
function tween(a, b, progress) {
  return a + (b - a) * progress;
}
