import {Component, h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./Link.css.proxy.js";
import {routing_state_to_string} from "../state/routing/routing.js";
import {ACTIONS} from "../state/actions.js";
import {merge_routing_state} from "../state/routing/merge_routing_state.js";
import {Button} from "../../snowpack/pkg/@material-ui/core.js";
const map_state = (state, own_props) => {
  const current_routing_state = state.routing;
  const {selected_on = new Set()} = own_props;
  let selected = selected_on.size > 0;
  if (selected_on.size) {
    if (selected_on.has("route") && own_props.route !== void 0)
      selected = selected && own_props.route === current_routing_state.route;
    if (own_props.args) {
      if (selected_on.has("args.view") && own_props.args.view !== void 0)
        selected = selected && own_props.args.view === current_routing_state.args.view;
      if (selected_on.has("args.subview_id") && own_props.args.subview_id !== void 0)
        selected = selected && own_props.args.subview_id === current_routing_state.args.subview_id;
    }
  }
  return {
    current_routing_state,
    selected
  };
};
const map_dispatch = (dispatch, own_props) => ({
  change_route: (routing_args) => dispatch(ACTIONS.routing.change_route({
    route: own_props.route,
    sub_route: own_props.sub_route,
    item_id: own_props.item_id,
    args: routing_args
  }))
});
const connector = connect(map_state, map_dispatch);
class _Link extends Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
  }
  componentWillUpdate(new_props, new_state) {
    if (new_state.clicked && !this.remove_clicked_class) {
      this.remove_clicked_class = setTimeout(() => {
        this.setState({clicked: false});
        this.remove_clicked_class = void 0;
      }, 300);
    }
  }
  render() {
    const partial_routing_args = this.props.args || {};
    const on_pointer_down = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (this.props.selected)
        return;
      this.setState({clicked: true});
      if (this.props.on_pointer_down && this.props.on_pointer_down())
        return;
      this.props.change_route(partial_routing_args);
    };
    const full_routing_state = merge_routing_state(this.props.current_routing_state, this.props);
    const full_routing_args = {...this.props.current_routing_state.args, ...partial_routing_args};
    full_routing_state.args = full_routing_args;
    const class_name = "link " + (this.state.clicked ? " clicked_animate " : "") + (this.props.selected ? " selected " : "") + (this.props.extra_class_name || "");
    return /* @__PURE__ */ h("a", {
      onPointerDown: on_pointer_down,
      onClick: (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
      },
      href: routing_state_to_string({...full_routing_state}),
      className: class_name,
      style: this.props.extra_css_style
    }, this.props.children || "Link");
  }
}
export const Link = connector(_Link);
function _LinkButton(props) {
  const partial_routing_args = props.args || {};
  const on_click = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    if (props.on_pointer_down && props.on_pointer_down())
      return;
    props.change_route(partial_routing_args);
  };
  const full_routing_state = merge_routing_state(props.current_routing_state, props);
  const full_routing_args = {...props.current_routing_state.args, ...partial_routing_args};
  full_routing_state.args = full_routing_args;
  return /* @__PURE__ */ h(Button, {
    size: "small",
    color: "primary",
    variant: "contained",
    onClick: on_click,
    href: routing_state_to_string({...full_routing_state})
  }, props.name || "Link");
}
export const LinkButton = connector(_LinkButton);
