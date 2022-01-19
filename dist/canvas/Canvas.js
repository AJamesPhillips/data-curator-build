import "./Canvas.css.proxy.js";
import {Component, h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
import {grid_small_step, h_step, v_step} from "./position_utils.js";
import {bound_zoom, SCALE_BY, calculate_new_zoom, calculate_new_zoom_xy} from "./zoom_utils.js";
import {SelectionBox} from "./SelectionBox.js";
import {client_to_canvas, client_to_canvas_x, client_to_canvas_y} from "./canvas_utils.js";
const GRAPH_CONTAINER_ID = "graph_container";
const GRAPH_VISUALS_CONTAINER_ID = "graph_visuals_container";
const MAX_DOUBLE_TAP_DELAY_MS = 900;
const MAX_DOUBLE_TAP_XY_PIXEL_MOVEMENT = 10;
const map_state = (state) => {
  const {x, y, zoom} = state.routing.args;
  const shift_key_down = state.global_keys.keys_down.has("Shift");
  const control_key_down = state.global_keys.keys_down.has("Control");
  return {zoom, x, y, shift_key_down, control_key_down};
};
const map_dispatch = (dispatch) => ({
  change_routing_args: (args) => {
    let new_args = {};
    if (args.zoom !== void 0)
      new_args.zoom = Math.round(bound_zoom(args.zoom));
    if (args.x !== void 0)
      new_args.x = Math.round(args.x);
    if (args.y !== void 0)
      new_args.y = Math.round(args.y);
    dispatch(ACTIONS.routing.change_route({args: new_args}));
  }
});
const connector = connect(map_state, map_dispatch);
class _Canvas extends Component {
  constructor(props) {
    super(props);
    this.manual_zoom_target = void 0;
    this.client_to_canvas = (client_xy) => client_to_canvas(this.props.zoom, client_xy);
    this.client_to_canvas_x = (client_x) => client_to_canvas_x(this.props.x, this.props.zoom, client_x);
    this.client_to_canvas_y = (client_y) => client_to_canvas_y(this.props.y, this.props.zoom, client_y);
    this.on_pointer_down = (e) => {
      pub_sub.canvas.pub("canvas_pointer_down", true);
      const right_button = e.button === 2;
      if (right_button)
        return;
      const client_start_x = e.offsetX;
      const client_start_y = e.offsetY;
      const new_pointer_state = {
        down: true,
        area_select: this.props.shift_key_down,
        last_pointer_down_ms: new Date().getTime(),
        canvas_start_x: this.client_to_canvas_x(client_start_x),
        canvas_start_y: this.client_to_canvas_y(client_start_y),
        x_when_pointer_down: this.props.x,
        y_when_pointer_down: this.props.y,
        client_start_x,
        client_start_y
      };
      handle_if_double_tap({
        zoom: this.props.zoom,
        current_pointer_state: this.state.pointer_state,
        new_pointer_state
      });
      this.setState({
        pointer_state: new_pointer_state,
        canvas_current_x: new_pointer_state.canvas_start_x,
        canvas_current_y: new_pointer_state.canvas_start_y
      });
    };
    this.on_pointer_up = (e) => {
      pub_sub.canvas.pub("canvas_pointer_up", true);
      if (this.state.pointer_state.area_select) {
        const args = area_selection_args(this.state);
        const canvas_area_select = {
          start_x: args.canvas_start_x,
          start_y: args.canvas_start_y,
          end_x: args.canvas_end_x,
          end_y: args.canvas_end_y
        };
        pub_sub.canvas.pub("canvas_area_select", canvas_area_select);
      }
      const new_pointer_state = {
        ...this.state.pointer_state,
        down: false,
        area_select: false
      };
      this.setState({pointer_state: new_pointer_state, canvas_current_x: void 0, canvas_current_y: void 0});
    };
    this.on_pointer_leave = () => {
      if (!this.state.pointer_state.area_select)
        this.on_pointer_up();
    };
    this.on_pointer_move = (e) => {
      pub_sub.canvas.pub("canvas_move", {
        x: this.client_to_canvas_x(e.offsetX),
        y: this.client_to_canvas_y(e.offsetY)
      });
      if (!this.state.pointer_state.down)
        return;
      const client_x = e.offsetX;
      const client_y = e.offsetY;
      if (this.state.pointer_state.area_select) {
        const canvas_current_x = this.client_to_canvas_x(client_x);
        const canvas_current_y = this.client_to_canvas_y(client_y);
        this.setState({canvas_current_x, canvas_current_y});
      } else {
        const change_in_client_x = this.state.pointer_state.client_start_x - client_x;
        const change_in_client_y = this.state.pointer_state.client_start_y - client_y;
        const x = this.state.pointer_state.x_when_pointer_down + this.client_to_canvas(change_in_client_x);
        const y = this.state.pointer_state.y_when_pointer_down - this.client_to_canvas(change_in_client_y);
        this.props.change_routing_args({x, y});
      }
    };
    this.on_wheel = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const wheel_change = e.deltaY;
      const new_zoom = calculate_new_zoom({zoom: this.props.zoom, wheel_change});
      if (new_zoom === this.props.zoom)
        return;
      const scale = this.props.zoom / SCALE_BY;
      const {pointer_x, pointer_y} = get_pointer_position(e, this.props, scale);
      const {offsetHeight: client_height, offsetWidth: client_width} = e.currentTarget;
      const result = calculate_new_zoom_xy({
        old: this.props,
        new_zoom,
        pointer_x,
        pointer_y,
        client_height,
        client_width
      });
      this.props.change_routing_args({zoom: new_zoom, x: result.x, y: result.y});
      this.manual_zoom_target = new_zoom;
    };
    this.on_context_menu = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const x = this.client_to_canvas_x(e.offsetX);
      const y = this.client_to_canvas_y(e.offsetY);
      const right_button = e.button === 2;
      if (right_button)
        pub_sub.canvas.pub("canvas_right_click", {x, y});
      else
        "todo publish canvas_control_left_click";
    };
    this.state = {
      pointer_state: {
        down: false,
        area_select: false,
        last_pointer_down_ms: void 0,
        canvas_start_x: void 0,
        canvas_start_y: void 0,
        x_when_pointer_down: void 0,
        y_when_pointer_down: void 0,
        client_start_x: void 0,
        client_start_y: void 0
      },
      canvas_current_x: void 0,
      canvas_current_y: void 0
    };
  }
  render() {
    const {zoom} = this.props;
    const scale = zoom / SCALE_BY;
    const x = -1 * this.props.x * scale;
    const y = this.props.y * scale;
    const backgroundSize = grid_small_step * scale;
    const manual_move = this.state.pointer_state.down;
    const manual_zoom = this.manual_zoom_target === zoom;
    this.manual_zoom_target = void 0;
    const transition_time = manual_move ? 0 : manual_zoom ? 0.1 : 0.5;
    const background_style = {
      transition: `background-position ${transition_time}s, background-size ${transition_time}s`,
      backgroundPosition: `${x}px ${y}px`,
      backgroundSize: `${backgroundSize}px ${backgroundSize}px`
    };
    const big_squared_background_style = {
      transition: `background-position ${transition_time}s, background-size ${transition_time}s`,
      backgroundPosition: `${x}px ${y}px`,
      backgroundSize: `${h_step * scale}px ${v_step * scale}px`
    };
    const html_translation_container_style = {
      transition: `transform ${transition_time}s`,
      transform: `translate(${x}px,${y}px)`
    };
    const html_container_style = {
      transition: `transform ${transition_time}s`,
      transformOrigin: "left top",
      transform: `scale(${scale})`
    };
    const graph_class_name = `${this.props.plain_background ? "" : "squared_background"} ${this.state.pointer_state.down ? "graph_background_pointer_down" : ""}`;
    return /* @__PURE__ */ h("div", {
      style: {flexGrow: 1},
      className: this.props.extra_class_names
    }, /* @__PURE__ */ h("div", {
      id: GRAPH_CONTAINER_ID,
      className: graph_class_name,
      style: background_style,
      onPointerDown: this.on_pointer_down,
      onPointerMove: this.on_pointer_move,
      onPointerUp: this.on_pointer_up,
      onPointerLeave: this.on_pointer_leave,
      onWheel: this.on_wheel,
      onDragOver: (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      },
      onContextMenu: this.on_context_menu
    }, !this.props.plain_background && this.props.show_large_grid && /* @__PURE__ */ h("div", {
      className: "big_squared_background",
      style: big_squared_background_style
    }), /* @__PURE__ */ h("div", {
      id: GRAPH_VISUALS_CONTAINER_ID,
      style: html_translation_container_style
    }, /* @__PURE__ */ h("div", {
      style: html_container_style
    }, /* @__PURE__ */ h("div", {
      id: "graph_lowest_elements_container"
    }, /* @__PURE__ */ h("svg", {
      style: {zIndex: 0, position: "absolute", top: 0, left: 0}
    }, blur_filter_defs, this.props.svg_children), this.props.children, /* @__PURE__ */ h("svg", {
      style: {zIndex: 2, position: "absolute", top: 0, left: 0}
    }, blur_filter_defs, this.props.svg_upper_children)), this.state.pointer_state.area_select && /* @__PURE__ */ h(SelectionBox, {
      ...area_selection_args(this.state),
      color: this.props.control_key_down ? "red" : "blue"
    }))), /* @__PURE__ */ h("div", null, this.props.overlay)));
  }
}
export const Canvas = connector(_Canvas);
const blur_filter_defs = /* @__PURE__ */ h("defs", null, Array.from(Array(101)).map((_, i) => /* @__PURE__ */ h("filter", {
  id: "blur_filter_" + i,
  x: "0",
  y: "0"
}, /* @__PURE__ */ h("feGaussianBlur", {
  in: "SourceGraphic",
  stdDeviation: i / 20
}))));
function handle_if_double_tap(args) {
  const {
    zoom,
    current_pointer_state,
    new_pointer_state
  } = args;
  if (!current_pointer_state.last_pointer_down_ms)
    return;
  if (!new_pointer_state.last_pointer_down_ms)
    return;
  const time_between_pointer_down = new_pointer_state.last_pointer_down_ms - current_pointer_state.last_pointer_down_ms;
  if (time_between_pointer_down > MAX_DOUBLE_TAP_DELAY_MS)
    return;
  const {canvas_start_x: current_x, canvas_start_y: current_y} = current_pointer_state;
  const {canvas_start_x: new_x, canvas_start_y: new_y} = new_pointer_state;
  if (current_x === void 0 || current_y === void 0 || new_x === void 0 || new_y === void 0)
    return;
  const x_movement = Math.abs(current_x - new_x);
  const y_movement = Math.abs(current_y - new_y);
  const max_movement = MAX_DOUBLE_TAP_XY_PIXEL_MOVEMENT / zoom;
  if (x_movement > max_movement)
    return;
  if (y_movement > max_movement)
    return;
  pub_sub.canvas.pub("canvas_double_tap", {x: current_x, y: current_y});
}
function area_selection_args(state) {
  const canvas_start_x = state.pointer_state.canvas_start_x || 0;
  const canvas_start_y = state.pointer_state.canvas_start_y || 0;
  const canvas_current_x = state.canvas_current_x || 0;
  const canvas_current_y = state.canvas_current_y || 0;
  return {
    canvas_start_x: Math.min(canvas_start_x, canvas_current_x),
    canvas_start_y: Math.min(canvas_start_y, canvas_current_y),
    canvas_end_x: Math.max(canvas_start_x, canvas_current_x),
    canvas_end_y: Math.max(canvas_start_y, canvas_current_y)
  };
}
function get_pointer_position(e, pos, scale) {
  let pointer_x = e.offsetX;
  let pointer_y = e.offsetY;
  let event_target = e.target;
  if (event_target?.id !== GRAPH_CONTAINER_ID) {
    while (event_target && event_target.id !== GRAPH_VISUALS_CONTAINER_ID) {
      pointer_x += event_target.offsetLeft || 0;
      pointer_y += event_target.offsetTop || 0;
      event_target = event_target.parentElement;
    }
    pointer_x -= pos.x;
    pointer_y += pos.y;
    pointer_x *= scale;
    pointer_y *= scale;
    pointer_x = Math.round(pointer_x);
    pointer_y = Math.round(pointer_y);
  }
  return {pointer_x, pointer_y};
}
