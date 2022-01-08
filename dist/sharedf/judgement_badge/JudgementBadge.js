import {h} from "../../../snowpack/pkg/preact.js";
import "./JudgementBadge.css.proxy.js";
import {Link} from "../Link.js";
import {lefttop_to_xy} from "../../state/display_options/display.js";
export function JudgementBadge(props) {
  const judgement_type = props.judgement ? "positive" : props.judgement === void 0 ? "inactive" : "negative";
  const class_name = `judgement_badge ${judgement_type}`;
  if (!props.judgement_or_objective_id)
    return /* @__PURE__ */ h("div", {
      className: class_name
    });
  let args = void 0;
  if (props.position)
    args = lefttop_to_xy({...props.position, zoom: 100}, true);
  return /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: props.judgement_or_objective_id,
    args,
    extra_class_name: class_name
  }, /* @__PURE__ */ h("span", null));
}
