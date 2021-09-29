import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "../common.css.proxy.js";
import {BaseFormEditFields} from "./BaseFormEditFields.js";
import {BaseFormEditSharing} from "../../access_controls/BaseFormEditSharing.js";
const map_state = (state) => {
  return {
    user: state.user_info.user
  };
};
const connector = connect(map_state);
function _BaseForm(props) {
  const {base, on_save_or_exit, user} = props;
  if (!user)
    return "Please sign in";
  return /* @__PURE__ */ h("div", {
    style: {margin: 10}
  }, /* @__PURE__ */ h(BaseFormEditFields, {
    user,
    base,
    on_save_or_exit
  }), /* @__PURE__ */ h(BaseFormEditSharing, {
    user,
    base,
    on_save_or_exit
  }));
}
export const BaseForm = connector(_BaseForm);
