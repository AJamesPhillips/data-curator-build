import {Button, ButtonGroup} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "./CreateNewWComponent.css.proxy.js";
import {wcomponent_types} from "../../wcomponent/interfaces/wcomponent_base.js";
import {wcomponent_type_to_text} from "../../wcomponent_derived/wcomponent_type_to_text.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {create_wcomponent} from "../../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
const map_state = (state) => ({
  creation_context: state.creation_context,
  current_knowledge_view: get_current_composed_knowledge_view_from_state(state),
  editing: !state.display_options.consumption_formatting,
  base_id: selector_chosen_base_id(state)
});
const connector = connect(map_state);
function _CreateNewWComponent(props) {
  const {
    creation_context,
    current_knowledge_view,
    editing,
    base_id
  } = props;
  if (!editing)
    return /* @__PURE__ */ h("div", {
      class: "create_new_wcomponent"
    }, "Can not create in presentation mode");
  if (base_id === void 0)
    return /* @__PURE__ */ h("div", {
      class: "create_new_wcomponent"
    }, "Select a base first.");
  if (!current_knowledge_view)
    return /* @__PURE__ */ h("div", {
      class: "create_new_wcomponent"
    }, /* @__PURE__ */ h("h3", null, "Create new component"), /* @__PURE__ */ h("p", null, "Please select a knowledge view first"));
  return /* @__PURE__ */ h("div", {
    class: "create_new_wcomponent"
  }, /* @__PURE__ */ h("h3", null, "Create new component"), /* @__PURE__ */ h(ButtonGroup, {
    fullWidth: true,
    color: "primary",
    variant: "contained",
    orientation: "vertical"
  }, wcomponent_types.map((type) => /* @__PURE__ */ h(Button, {
    onClick: () => create_wcomponent_type(base_id, type, creation_context)
  }, wcomponent_type_to_text(type)))));
}
export const CreateNewWComponent = connector(_CreateNewWComponent);
function create_wcomponent_type(base_id, type, creation_context) {
  create_wcomponent({wcomponent: {base_id, type}, creation_context});
}
