import {h} from "../../../snowpack/pkg/preact.js";
import TrendingUpIcon from "../../../snowpack/pkg/@material-ui/icons/TrendingUp.js";
import TrendingFlatIcon from "../../../snowpack/pkg/@material-ui/icons/TrendingFlat.js";
import TrendingDownIcon from "../../../snowpack/pkg/@material-ui/icons/TrendingDown.js";
import {QuestionMarkIcon} from "../icons/QuestionMarkIcon.js";
import "./JudgementBadge.css.proxy.js";
import {Link} from "../Link.js";
import {lefttop_to_xy} from "../../state/display_options/display.js";
import {get_store} from "../../state/store.js";
import {ACTIONS} from "../../state/actions.js";
export function JudgementBadge(props) {
  const {judgement, judgement_trend_manual, size} = props;
  const judgement_type = judgement ? "positive" : judgement === void 0 ? "inactive" : "negative";
  const class_name = `judgement_badge ${size} ${judgement_type} ${judgement_trend_manual ?? ""}`;
  const trend_icon = judgement_trend_manual === "improving" ? /* @__PURE__ */ h(TrendingUpIcon, null) : judgement_trend_manual === "stable" ? /* @__PURE__ */ h(TrendingFlatIcon, null) : judgement_trend_manual === "worsening" ? /* @__PURE__ */ h(TrendingDownIcon, null) : judgement_trend_manual === "unknown" ? /* @__PURE__ */ h(QuestionMarkIcon, null) : /* @__PURE__ */ h("span", null);
  if (!props.judgement_or_objective_id)
    return /* @__PURE__ */ h("div", {
      className: class_name
    }, trend_icon);
  let args = void 0;
  if (props.position)
    args = lefttop_to_xy({...props.position, zoom: 100}, true);
  return /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: props.judgement_or_objective_id,
    args,
    extra_class_name: class_name,
    on_pointer_down: () => {
      const store = get_store();
      const state = store.getState();
      const {display_side_panel, display_time_sliders} = state.controls;
      if (props.position)
        args = lefttop_to_xy({...props.position, zoom: 100}, true, {display_side_panel, display_time_sliders});
      store.dispatch(ACTIONS.routing.change_route({
        item_id: props.judgement_or_objective_id,
        args
      }));
      return true;
    }
  }, trend_icon);
}
