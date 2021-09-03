import {h} from "../../../snowpack/pkg/preact.js";
import "./AutocompleteText.css.proxy.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import {Autocomplete} from "../../../snowpack/pkg/@material-ui/lab.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _MaterialAutoComplete(props) {
  return /* @__PURE__ */ h(Autocomplete, {
    autoComplete: true,
    blurOnSelect: true,
    clearOnBlur: true,
    clearOnEscape: true,
    disabled: props.allow_editing_when_presenting ? false : props.presenting,
    disableClearable: props.disableClearable || false,
    disableListWrap: true,
    disablePortal: true,
    freeSolo: false,
    fullWidth: true,
    getOptionLabel: (option) => {
      return option.title || option.id || "none";
    },
    onChange: props.onChange || (() => null),
    openOnFocus: true,
    options: props.options,
    renderInput: (params) => /* @__PURE__ */ h(TextField, {
      ...params,
      size: "small",
      label: props.label || null,
      placeholder: "+"
    }),
    selectOnFocus: true,
    style: {width: 175},
    value: props.selected_option
  });
}
const ConnectedAutocompleteText = connector(_MaterialAutoComplete);
export function MaterialAutoComplete(props) {
  return /* @__PURE__ */ h(ConnectedAutocompleteText, {
    ...props
  });
}
