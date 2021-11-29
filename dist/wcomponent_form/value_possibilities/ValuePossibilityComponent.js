import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {Box, IconButton, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import DeleteIcon from "../../../snowpack/pkg/@material-ui/icons/Delete.js";
import "../../form/editable_list/EditableListEntry.css.proxy.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {ValuePossibilityDuplicate} from "./ValuePossibilityDuplicate.js";
import {VALUE_POSSIBILITY_IDS_to_text} from "../../wcomponent/value/parse_value.js";
export function ValuePossibilityComponent(props) {
  const {editing, value_possibility, count_of_value_possibilities, update_value_possibility} = props;
  const [current_value, set_current_value] = useState(value_possibility.value);
  useEffect(() => set_current_value(value_possibility.value), [value_possibility.value]);
  const count = count_of_value_possibilities[current_value.toLowerCase()] || 0;
  const warning = count > 1 ? `Current value "${current_value}" is already present in other possible values.` : "";
  return /* @__PURE__ */ h(Box, {
    key: props.value_possibility.id,
    p: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
    maxWidth: "100%",
    marginTop: "5px",
    style: {display: "flex"}
  }, /* @__PURE__ */ h(Box, {
    style: {width: "100%"}
  }, /* @__PURE__ */ h(ValuePossibilityDuplicate, {
    warning
  }), /* @__PURE__ */ h(Typography, {
    noWrap: true,
    textOverflow: "ellipsis",
    variant: "caption"
  }, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Possible value",
    hide_label: true,
    value: value_possibility.value,
    conditional_on_change: (value) => set_current_value(value),
    conditional_on_blur: (value) => {
      update_value_possibility({
        ...value_possibility,
        value
      });
    }
  }))), VALUE_POSSIBILITY_IDS_to_text[value_possibility.id] && /* @__PURE__ */ h(Box, {
    style: {width: 100, color: "#cb4", cursor: "pointer"},
    title: "Using interoperable ID"
  }, VALUE_POSSIBILITY_IDS_to_text[value_possibility.id]), editing && /* @__PURE__ */ h(IconButton, {
    onClick: () => update_value_possibility(void 0)
  }, /* @__PURE__ */ h(DeleteIcon, null)));
}
