import {ButtonGroup} from "../../_snowpack/pkg/@material-ui/core.js";
import {Button} from "../sharedf/Button.js";
import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {wcomponent_types} from "../shared/wcomponent/interfaces/wcomponent_base.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import "./CreateNewWComponent.css.proxy.js";
import {create_wcomponent} from "./create_wcomponent_type.js";
const map_state = (state) => ({
  creation_context: state.creation_context,
  current_knowledge_view: get_current_composed_knowledge_view_from_state(state),
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _CreateNewWComponent(props) {
  const {
    creation_context,
    current_knowledge_view,
    editing
  } = props;
  if (!editing)
    return /* @__PURE__ */ h("div", {
      class: "create_mew_wcomponent"
    }, "Can not create in presentation mode");
  if (!current_knowledge_view)
    return /* @__PURE__ */ h("div", {
      class: "create_mew_wcomponent"
    }, /* @__PURE__ */ h("h3", null, "Create new component"), /* @__PURE__ */ h("p", null, "Please select a knowledge view first"));
  const exclude = new Set(["counterfactual"]);
  const types = wcomponent_types.filter((t) => !exclude.has(t));
  return /* @__PURE__ */ h("div", {
    class: "create_mew_wcomponent"
  }, /* @__PURE__ */ h("h3", null, "Create new component"), /* @__PURE__ */ h(ButtonGroup, {
    fullWidth: true,
    color: "primary",
    variant: "contained",
    orientation: "vertical"
  }, types.map((type) => /* @__PURE__ */ h(Button, {
    onClick: () => create_wcomponent_type(type, creation_context)
  }, type))));
}
export const CreateNewWComponent = connector(_CreateNewWComponent);
function create_wcomponent_type(type, creation_context) {
  create_wcomponent({wcomponent: {type}, creation_context});
}
