import {h} from "../../../../snowpack/pkg/preact.js";
import {connect} from "../../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../../state/actions.js";
import {OIDC_provider_map} from "./urls.js";
const map_state = (state) => {
  return {
    current_solid_oidc_provider: state.user_info.solid_oidc_provider
  };
};
const map_dispatch = {
  update_solid_oidc_provider: ACTIONS.user_info.update_solid_oidc_provider
};
const connector = connect(map_state, map_dispatch);
function _AutoFillOIDC(props) {
  const solid_oidc_provider = OIDC_provider_map[props.solid_oidc_provider_root];
  return /* @__PURE__ */ h("button", {
    disabled: solid_oidc_provider === props.current_solid_oidc_provider,
    onClick: (e) => {
      e.stopImmediatePropagation();
      props.update_solid_oidc_provider({solid_oidc_provider});
    }
  }, props.solid_oidc_provider_root);
}
export const AutoFillOIDC = connector(_AutoFillOIDC);
