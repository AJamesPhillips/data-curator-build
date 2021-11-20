import {Button, ButtonGroup} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "./CreateNewWComponent.css.proxy.js";
import {Button as FrontendButton} from "../../sharedf/Button.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {create_wcomponent} from "../../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
import {ACTIONS} from "../../state/actions.js";
import {wcomponent_types} from "../../wcomponent/interfaces/wcomponent_base.js";
import {wcomponent_type_to_text} from "../../wcomponent_derived/wcomponent_type_to_text.js";
const map_state = (state) => ({
  current_knowledge_view: get_current_composed_knowledge_view_from_state(state),
  editing: !state.display_options.consumption_formatting,
  base_id: selector_chosen_base_id(state)
});
const map_dispatch = {
  toggle_consumption_formatting: ACTIONS.display.toggle_consumption_formatting
};
const connector = connect(map_state, map_dispatch);
function _CreateNewWComponent(props) {
  const {
    current_knowledge_view,
    editing,
    base_id
  } = props;
  if (!editing)
    return /* @__PURE__ */ h("div", {
      class: "create_new_wcomponent"
    }, /* @__PURE__ */ h(FrontendButton, {
      onClick: () => props.toggle_consumption_formatting({})
    }, "Swap to editing"));
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
    onClick: () => create_wcomponent_type(base_id, type)
  }, wcomponent_type_to_text(type)))));
}
export const CreateNewWComponent = connector(_CreateNewWComponent);
function create_wcomponent_type(base_id, type) {
  create_wcomponent({wcomponent: {base_id, type}});
}
