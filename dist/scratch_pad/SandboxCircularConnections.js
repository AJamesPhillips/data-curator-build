import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {ConnectableCanvasNode} from "../canvas/ConnectableCanvasNode.js";
import {CanvasConnnection} from "../canvas/connections/CanvasConnnection.js";
const origin_left = 500;
const origin_top = 300;
const origin = {left: origin_left, top: origin_top};
var ShowLinkTypes;
(function(ShowLinkTypes2) {
  ShowLinkTypes2[ShowLinkTypes2["both"] = 0] = "both";
  ShowLinkTypes2[ShowLinkTypes2["only_circular"] = 1] = "only_circular";
  ShowLinkTypes2[ShowLinkTypes2["only_non_circular"] = 2] = "only_non_circular";
})(ShowLinkTypes || (ShowLinkTypes = {}));
export function SandboxCircularConnections() {
  const [x, set_x] = useState(700);
  const [y, set_y] = useState(100);
  const [show_link_types, set_show_link_types] = useState(0);
  const circular_links = show_link_types === 0 || show_link_types === 1;
  const non_circular_links = show_link_types === 0 || show_link_types === 2;
  const node_2_position = {left: x, top: y};
  return /* @__PURE__ */ h("div", {
    style: {width: "100%", height: "100%"},
    onMouseMove: (e) => {
      set_x(e.x);
      set_y(e.y);
    },
    onClick: () => set_show_link_types((show_link_types + 1) % 3)
  }, /* @__PURE__ */ h(ConnectableCanvasNode, {
    node_main_content: /* @__PURE__ */ h("div", {
      style: {height: 100}
    }, "Node 1"),
    terminals: [],
    position: origin
  }), /* @__PURE__ */ h(ConnectableCanvasNode, {
    node_main_content: /* @__PURE__ */ h("div", {
      style: {height: 100}
    }, "Node 2"),
    terminals: [],
    position: node_2_position
  }), /* @__PURE__ */ h("svg", {
    width: 1300,
    height: 1e3,
    style: {zIndex: 1e3, position: "absolute"}
  }, circular_links && /* @__PURE__ */ h("g", null, /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position: origin,
    from_connection_type: {direction: "from", attribute: "state"},
    to_node_position: node_2_position,
    to_connection_type: {direction: "to", attribute: "state"},
    circular_links: true,
    should_animate: false
  }), /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position: node_2_position,
    from_connection_type: {direction: "from", attribute: "state"},
    to_node_position: origin,
    to_connection_type: {direction: "to", attribute: "state"},
    circular_links: true,
    should_animate: false
  })), non_circular_links && /* @__PURE__ */ h("g", null, /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position: origin,
    from_connection_type: {direction: "from", attribute: "state"},
    to_node_position: node_2_position,
    to_connection_type: {direction: "to", attribute: "state"},
    circular_links: false,
    should_animate: false
  }), /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position: node_2_position,
    from_connection_type: {direction: "from", attribute: "state"},
    to_node_position: origin,
    to_connection_type: {direction: "to", attribute: "state"},
    circular_links: false,
    should_animate: false
  }))));
}
