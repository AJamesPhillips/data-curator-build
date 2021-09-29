import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_new_created_ats} from "../../shared/utils/datetime.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
import {UncertainDateTime} from "../uncertainty/datetime.js";
const map_state = (state) => ({
  creation_context_state: state.creation_context,
  base_id: selector_chosen_base_id(state)
});
const connector = connect(map_state);
function _WComponentEventAtFormField(props) {
  const {wcomponent, creation_context_state, upsert_wcomponent, base_id} = props;
  const event_at = wcomponent.event_at && wcomponent.event_at[0];
  return /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(UncertainDateTime, {
    datetime: event_at ? event_at.datetime : {},
    on_change: (datetime) => {
      const partial_wcomponent = {
        event_at: [{
          ...event_at || {...get_new_created_ats(creation_context_state)},
          id: "",
          base_id: base_id || -1,
          explanation: "",
          probability: 1,
          conviction: 1,
          datetime
        }]
      };
      upsert_wcomponent(partial_wcomponent);
    }
  }));
}
export const WComponentEventAtFormField = connector(_WComponentEventAtFormField);
