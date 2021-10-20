import {h} from "../../../snowpack/pkg/preact.js";
import {get_uncertain_datetime} from "../../shared/uncertainty/datetime.js";
import {date2str_auto, get_today_date} from "../../shared/utils/date_helpers.js";
import {Button} from "../../sharedf/Button.js";
export function SimplifiedUncertainDatetimeForm(props) {
  const {VAP_set, on_change} = props;
  const entry = VAP_set.entries[0];
  if (!entry)
    return null;
  const datetime = get_uncertain_datetime(VAP_set.datetime);
  const is_eternal = datetime === void 0;
  return /* @__PURE__ */ h("div", null, datetime ? date2str_auto({date: datetime, time_resolution: void 0}) : "Is Eternal", /* @__PURE__ */ h("br", null), is_eternal && /* @__PURE__ */ h(Button, {
    value: "Set to 'From today'",
    onClick: () => on_change({...VAP_set, datetime: {value: get_today_date()}})
  }), !is_eternal && /* @__PURE__ */ h(Button, {
    value: "Set to Eternal",
    onClick: () => on_change({...VAP_set, datetime: {}})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
