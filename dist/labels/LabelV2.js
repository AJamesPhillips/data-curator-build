import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import "./LabelV2.css.proxy.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {color_to_opposite, color_to_string} from "../sharedf/color.js";
import {MARKDOWN_OPTIONS} from "../sharedf/RichMarkDown.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
function map_state(state, {wcomponent_id}) {
  const {wcomponents_by_id} = state.specialised_objects;
  const wcomponent = wcomponents_by_id[wcomponent_id];
  return {
    wcomponent,
    rich_text: state.display_options.consumption_formatting,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state),
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
}
const connector = connect(map_state);
function _LabelV2(props) {
  const {wcomponent} = props;
  if (!wcomponent)
    return null;
  const title = get_title({
    wcomponent,
    rich_text: props.rich_text,
    wcomponents_by_id: props.wcomponents_by_id,
    wc_id_to_counterfactuals_map: props.wc_id_to_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h("div", {
    className: "label_v2",
    style: {
      backgroundColor: color_to_string(wcomponent.label_color),
      color: color_to_string(color_to_opposite(wcomponent.label_color))
    }
  }, /* @__PURE__ */ h(Markdown, {
    options: MARKDOWN_OPTIONS
  }, title));
}
export const LabelV2 = connector(_LabelV2);
