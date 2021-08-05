import {h} from "../../../_snowpack/pkg/preact.js";
import "./common.css.proxy.js";
import {uncertain_date_to_string} from "../../form/datetime_utils.js";
import {EditableCustomDateTime} from "../../form/EditableCustomDateTime.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  time_resolution: state.display_options.time_resolution
});
const connector = connect(map_state);
function _SummaryForPrediction(props) {
  const {value, created_at, datetime, probability, conviction, time_resolution} = props;
  return /* @__PURE__ */ h("div", null, created_at && /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Created:  ", /* @__PURE__ */ h(EditableCustomDateTime, {
    invariant_value: created_at,
    value: void 0
  })), /* @__PURE__ */ h("div", {
    className: "summary_container",
    style: {display: "inline-flex", width: "100%"}
  }, /* @__PURE__ */ h("div", {
    className: "datetimes"
  }, uncertain_date_to_string(datetime, time_resolution)), value && /* @__PURE__ */ h("div", null, "Value: ", value), /* @__PURE__ */ h("div", null, "Prob: ", probability), /* @__PURE__ */ h("div", null, "Cn: ", conviction)));
}
export const SummaryForPrediction = connector(_SummaryForPrediction);
