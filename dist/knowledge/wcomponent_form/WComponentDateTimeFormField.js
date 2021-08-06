import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {UncertainDateTime} from "../uncertainty/datetime.js";
const map_state = (state) => ({
  creation_context_state: state.creation_context
});
const connector = connect(map_state);
function _WComponentDateTimeFormField(props) {
  const {wcomponent, creation_context_state, upsert_wcomponent} = props;
  const datetime = wcomponent.datetime || {};
  return /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(UncertainDateTime, {
    datetime,
    on_change: (datetime2) => upsert_wcomponent({datetime: datetime2})
  }));
}
export const WComponentDateTimeFormField = connector(_WComponentDateTimeFormField);
