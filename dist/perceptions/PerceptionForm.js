import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import {ACTIONS} from "../state/actions.js";
import {ConfirmatoryDeleteButton} from "../form/ConfirmatoryDeleteButton.js";
const map_state = (state) => {
  return {
    ready: state.sync.ready
  };
};
const map_dispatch = {
  upsert_perception: ACTIONS.specialised_object.upsert_perception,
  delete_perception: ACTIONS.specialised_object.delete_perception
};
const connector = connect(map_state, map_dispatch);
function _PerceptionForm(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  const {perception} = props;
  const perception_id = perception.id;
  const upsert_perception = (args) => props.upsert_perception({perception: {...perception, ...args}});
  return /* @__PURE__ */ h("div", {
    key: perception_id
  }, /* @__PURE__ */ h("h2", null, /* @__PURE__ */ h(EditableText, {
    placeholder: "Title...",
    value: perception.title,
    conditional_on_change: (title) => upsert_perception({title})
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableText, {
    placeholder: "Description...",
    value: perception.description,
    conditional_on_change: (description) => upsert_perception({description})
  })), /* @__PURE__ */ h("p", {
    title: (perception.custom_created_at ? "Custom " : "") + "Created at"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    invariant_value: perception.created_at,
    value: perception.custom_created_at,
    on_change: (new_custom_created_at) => upsert_perception({custom_created_at: new_custom_created_at})
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    on_delete: () => props.delete_perception({perception_id})
  }));
}
export const PerceptionForm = connector(_PerceptionForm);
