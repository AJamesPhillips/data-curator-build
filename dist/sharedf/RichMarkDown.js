import {Component, h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import {add_newlines_to_markdown} from "../form/utils.js";
import {replace_ids_in_text} from "../shared/wcomponent/rich_text/get_rich_text.js";
import {get_wc_id_counterfactuals_map} from "../state/derived/accessor.js";
const map_state = (state) => ({
  rich_text: state.display_options.consumption_formatting,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  wc_id_counterfactuals_map: get_wc_id_counterfactuals_map(state),
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms
});
const connector = connect(map_state);
class _RichMarkDown extends Component {
  render() {
    const {
      text,
      rich_text,
      wcomponents_by_id,
      wc_id_counterfactuals_map,
      placeholder = "...",
      created_at_ms,
      sim_ms
    } = this.props;
    const value = replace_ids_in_text({
      text,
      rich_text,
      wcomponents_by_id,
      wc_id_counterfactuals_map,
      created_at_ms,
      sim_ms
    });
    return /* @__PURE__ */ h(Markdown, null, value && add_newlines_to_markdown(value) || placeholder);
  }
}
export const RichMarkDown = connector(_RichMarkDown);
