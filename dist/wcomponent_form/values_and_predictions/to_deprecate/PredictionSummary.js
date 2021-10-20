import {h} from "../../../../snowpack/pkg/preact.js";
import "./PredictionSummary.css.proxy.js";
import {uncertain_date_to_string} from "../../../form/datetime_utils.js";
import {EditableCustomDateTime} from "../../../form/EditableCustomDateTime.js";
import {connect} from "../../../../snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  time_resolution: state.display_options.time_resolution
});
const connector = connect(map_state);
function _PredictionSummary(props) {
  const {value, created_at, datetime, probability, conviction, time_resolution} = props;
  return /* @__PURE__ */ h("div", null, created_at && /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Created:  ", /* @__PURE__ */ h(EditableCustomDateTime, {
    invariant_value: created_at,
    value: void 0
  })), /* @__PURE__ */ h("div", {
    className: "summary_container"
  }, /* @__PURE__ */ h("div", {
    className: "summary_row"
  }, /* @__PURE__ */ h("div", {
    className: "datetimes"
  }, uncertain_date_to_string(datetime, time_resolution)), value && /* @__PURE__ */ h("div", null, "      ", value)), /* @__PURE__ */ h("div", {
    className: "summary_row"
  }, /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Confidence"), " ", conviction), /* @__PURE__ */ h("div", null, "  ", /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Prob"), " ", probability))));
}
export const PredictionSummary = connector(_PredictionSummary);
