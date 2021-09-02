import {h} from "../../../../snowpack/pkg/preact.js";
import {connect} from "../../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../../state/actions.js";
import {ConfirmatoryDeleteButton} from "../../../form/ConfirmatoryDeleteButton.js";
import {AddButton} from "../../../form/AddButton.js";
import {useState} from "../../../../snowpack/pkg/preact/hooks.js";
import {useEffect} from "../../../../snowpack/pkg/preact/hooks.js";
const map_state = (state) => {
  return {
    custom_solid_pod_URLs: state.user_info.custom_solid_pod_URLs,
    chosen_custom_solid_pod_URL_index: state.user_info.chosen_custom_solid_pod_URL_index
  };
};
const map_dispatch = {
  update_chosen_pod_URL_index: ACTIONS.user_info.update_chosen_custom_solid_pod_URL_index
};
const connector = connect(map_state, map_dispatch);
function _PodProviderRow(props) {
  const [value, set_value] = useState(props.value || "");
  const [valid, set_valid] = useState(true);
  useEffect(() => set_value(props.value || ""), [props.value]);
  const {solid_pod_URL_index: index, on_change_value, on_delete, on_add} = props;
  return /* @__PURE__ */ h("tr", null, /* @__PURE__ */ h("td", null, index !== void 0 && /* @__PURE__ */ h("input", {
    type: "radio",
    checked: props.chosen_custom_solid_pod_URL_index === index,
    onClick: (e) => props.update_chosen_pod_URL_index({chosen_custom_solid_pod_URL_index: index})
  })), /* @__PURE__ */ h("td", {
    style: {userSelect: "text", textTransform: "initial", backgroundColor: valid ? "" : "pink"}
  }, !on_change_value && props.value, on_change_value && /* @__PURE__ */ h("input", {
    type: "text",
    style: {width: 250},
    value,
    onChange: (e) => {
      const new_value = e.currentTarget.value;
      set_value(new_value);
      const valid2 = ensure_valid_value(new_value);
      set_valid(!!valid2);
    },
    onBlur: (e) => {
      const new_value = ensure_valid_value(value);
      if (!new_value)
        return;
      if (new_value !== value)
        set_value(new_value);
      on_change_value(new_value);
    }
  })), /* @__PURE__ */ h("td", null, on_delete && /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "",
    on_delete
  }), on_add && /* @__PURE__ */ h(AddButton, {
    button_text: "",
    on_click: () => {
      const new_value = ensure_valid_value(value);
      if (!new_value)
        return;
      on_add(new_value);
      set_value("");
    }
  })));
}
export const PodProviderRow = connector(_PodProviderRow);
function ensure_valid_value(value) {
  if (!value)
    return "";
  if (!value.startsWith("http://") && !value.startsWith("https://"))
    value = "https://" + value;
  try {
    const url = new URL(value);
    url.protocol = "https:";
    value = url.toString();
    if (!value.endsWith("/"))
      value += "/";
    return value;
  } catch (e) {
    console.warn("error parsing user URL: ", e);
    return "";
  }
}
