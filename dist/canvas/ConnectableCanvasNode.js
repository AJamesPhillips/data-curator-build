import {h} from "../../snowpack/pkg/preact.js";
import {Card, CardContent, CardMedia, makeStyles} from "../../snowpack/pkg/@material-ui/core.js";
import "./ConnectableCanvasNode.css.proxy.js";
import {CanvasNode} from "./CanvasNode.js";
import {COLOURS} from "./display.js";
import "./display_colors.css.proxy.js";
import {connection_radius} from "./connections/terminal.js";
export function ConnectableCanvasNode(props) {
  let {opacity} = props;
  const extra_node_styles = {
    display: props.hidden ? "none" : "",
    opacity,
    ...props.extra_node_styles
  };
  if (props.unlimited_width)
    extra_node_styles.maxWidth = "initial";
  const main_content_styles = {
    boxShadow: props.glow ? `${props.glow} 0px 0px 10px` : "",
    backgroundColor: props.color || COLOURS.white
  };
  const {
    pointerupdown_on_connection_terminal = () => {
    }
  } = props;
  const extra_css_class = " connectable_canvas_node " + (props.extra_css_class || "");
  const classes = use_styles();
  return /* @__PURE__ */ h(CanvasNode, {
    get_ref: (ref) => props.get_ref && props.get_ref(ref),
    position: props.position,
    on_pointer_down: props.on_pointer_down,
    on_click: props.on_click,
    on_pointer_enter: props.on_pointer_enter,
    on_pointer_leave: props.on_pointer_leave,
    extra_css_class,
    extra_styles: extra_node_styles,
    extra_args: props.extra_args
  }, /* @__PURE__ */ h(Card, {
    className: `node_main_content ${classes.card}`,
    variant: "outlined",
    style: main_content_styles
  }, props.cover_image && /* @__PURE__ */ h(CardMedia, {
    component: "img",
    image: props.cover_image,
    className: classes.image,
    onContextMenu: (e) => {
      e.stopImmediatePropagation();
    }
  }), /* @__PURE__ */ h(CardContent, {
    style: {padding: 16}
  }, props.node_main_content)), props.terminals.map(({type, style, label}) => {
    return /* @__PURE__ */ h("div", {
      className: "connection_terminal",
      style: {...connection_style_common, ...style},
      onPointerDown: (e) => {
        e.stopPropagation();
        pointerupdown_on_connection_terminal(type, "down");
      },
      onPointerUp: (e) => {
        e.stopPropagation();
        pointerupdown_on_connection_terminal(type, "up");
      }
    }, label);
  }), props.other_children);
}
const use_styles = makeStyles((theme) => ({
  card: {
    borderColor: "black"
  },
  image: {
    maxHeight: "200px",
    maxWidth: "100%",
    margin: "0 auto",
    width: "initial"
  }
}));
const connection_diameter = connection_radius * 2;
const connection_style_common = {
  width: connection_diameter,
  height: connection_diameter,
  borderRadius: connection_radius + 1
};
