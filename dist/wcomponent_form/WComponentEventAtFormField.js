import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_new_created_ats} from "../shared/utils/datetime.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {UncertainDateTimeForm} from "./uncertain_datetime/UncertainDateTimeForm.js";
import {EditablePercentage} from "../form/EditablePercentage.js";
import {PredictionBadge} from "../sharedf/prediction_badge/PredictionBadge.js";
import {Button} from "../sharedf/Button.js";
import {EditableTextOnBlurType} from "../form/editable_text/editable_text_common.js";
const map_state = (state) => ({
  creation_context_state: state.creation_context,
  editing: !state.display_options.consumption_formatting,
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
    placeholder: "Probability",
    value: event_at?.probability,
    on_blur: (new_probability) => upsert_event_at({probability: new_probability}),
    on_blur_type: EditableTextOnBlurType.conditional
  }), /* @__PURE__ */ h(EditablePercentage, {
    placeholder: "Confidence",
    value: event_at?.conviction,
    on_blur: (new_conviction) => upsert_event_at({conviction: new_conviction}),
    on_blur_type: EditableTextOnBlurType.conditional
  }), "  ", event_at && /* @__PURE__ */ h(PredictionBadge, {
    disabled: true,
    size: 20,
    probability: event_at.probability,
    conviction: event_at.conviction
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), props.editing && /* @__PURE__ */ h(Button, {
    fullWidth: true,
    value: event_at ? "Clear Event" : "Create Default Event",
    onClick: () => {
      if (event_at)
        upsert_wcomponent({event_at: []});
      else
        upsert_event_at({conviction: 1, probability: 1});
    }
  }));
}
export const WComponentEventAtFormField = connector(_WComponentEventAtFormField);
