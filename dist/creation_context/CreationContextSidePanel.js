import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {EditableCheckbox} from "../form/EditableCheckbox.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import {LabelsEditor} from "../labels/LabelsEditor.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  const {creation_context} = state.creation_context;
  return {
    use_creation_context: state.creation_context.use_creation_context,
    custom_created_at: creation_context?.custom_created_at,
    label_ids: creation_context?.label_ids,
    replace_text_target: creation_context?.replace_text_target,
    replace_text_replacement: creation_context?.replace_text_replacement
  };
};
const map_dispatch = {
  toggle_use_creation_context: ACTIONS.creation_context.toggle_use_creation_context,
  set_custom_created_at: ACTIONS.creation_context.set_custom_created_at,
  set_label_ids: ACTIONS.creation_context.set_label_ids,
  set_replace_text: ACTIONS.creation_context.set_replace_text
};
const connector = connect(map_state, map_dispatch);
function _CreationContextSidePanel(props) {
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, "Enabled: ", /* @__PURE__ */ h(EditableCheckbox, {
    value: props.use_creation_context,
    on_change: () => props.toggle_use_creation_context()
  })), /* @__PURE__ */ h("p", null, "Custom created at datetime: ", /* @__PURE__ */ h(EditableCustomDateTime, {
    value: props.custom_created_at,
    on_change: (custom_created_at) => props.set_custom_created_at({custom_created_at})
  }), props.custom_created_at !== void 0 && /* @__PURE__ */ h("div", {
    style: {backgroundColor: "pink"}
  }, "Tip: you only need to set this for easing entry of historical data.  If you want to view the data you are currently entering in a lower time resolution then use the", /* @__PURE__ */ h(Link, {
    route: "display",
    sub_route: void 0,
    item_id: void 0,
    args: void 0
  }, " display options "), "to change the time resolution.")), /* @__PURE__ */ h("p", null, "Automatically label with: ", /* @__PURE__ */ h(LabelsEditor, {
    label_ids: props.label_ids,
    on_change: (label_ids) => props.set_label_ids({label_ids})
  })), /* @__PURE__ */ h("p", null, "Automatically replace text:", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(EditableText, {
    placeholder: "Target text...",
    value: props.replace_text_target || "",
    conditional_on_change: (t) => props.set_replace_text({
      value: t || void 0,
      value_type: "target"
    })
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(EditableText, {
    placeholder: "Replacement text...",
    value: props.replace_text_replacement || "",
    conditional_on_change: (t) => props.set_replace_text({
      value: t || void 0,
      value_type: "replacement"
    })
  })));
}
export const CreationContextSidePanel = connector(_CreationContextSidePanel);
