import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_new_created_ats} from "../shared/utils/datetime.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {UncertainDateTimeForm} from "./uncertain_datetime/UncertainDateTimeForm.js";
import {EditablePercentage} from "../form/EditablePercentage.js";
import {PredictionBadge} from "../sharedf/prediction_badge/PredictionBadge.js";
const map_state = (state) => ({
  creation_context_state: state.creation_context,
  base_id: selector_chosen_base_id(state)
});
const connector = connect(map_state);
function _WComponentEventAtFormField(props) {
  const {wcomponent, creation_context_state, upsert_wcomponent, base_id} = props;
  const event_at = wcomponent.event_at && wcomponent.event_at[0];
  const upsert_event_at = (partial_event_at_prediction) => {
    const partial_wcomponent = {
      event_at: [{
        probability: 1,
        conviction: 1,
        datetime: {},
        id: "",
        base_id: base_id || -1,
        explanation: "",
        ...event_at || {...get_new_created_ats(creation_context_state)},
        ...partial_event_at_prediction
      }]
    };
    upsert_wcomponent(partial_wcomponent);
  };
  return /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(UncertainDateTimeForm, {
    datetime: event_at ? event_at.datetime : {},
    on_change: (datetime) => upsert_event_at({datetime})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, /* @__PURE__ */ h(EditablePercentage, {
    placeholder: "Confidence",
    value: event_at?.conviction,
    conditional_on_blur: (new_conviction) => upsert_event_at({conviction: new_conviction})
  }), /* @__PURE__ */ h(EditablePercentage, {
    placeholder: "Probability",
    value: event_at?.probability,
    conditional_on_blur: (new_probability) => upsert_event_at({probability: new_probability})
  }), "  ", event_at && /* @__PURE__ */ h(PredictionBadge, {
    disabled: true,
    size: 20,
    probability: event_at.probability,
    conviction: event_at.conviction
  })));
}
export const WComponentEventAtFormField = connector(_WComponentEventAtFormField);