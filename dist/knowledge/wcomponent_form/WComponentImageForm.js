import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  creation_context_state: state.creation_context
});
const connector = connect(map_state);
export function _WComponentImageForm(props) {
  const {wcomponent, upsert_wcomponent} = props;
  const summary_image = wcomponent.summary_image || void 0;
  return /* @__PURE__ */ h(TextField, {
    fullWidth: true,
    label: "Summary Image URL",
    onChange: (e) => {
      let url = e.target?.value ? e.target?.value : null;
      if (url !== void 0) {
        upsert_wcomponent({summary_image: url});
      }
    },
    value: summary_image,
    variant: "outlined"
  });
}
export const WComponentImageForm = connector(_WComponentImageForm);
