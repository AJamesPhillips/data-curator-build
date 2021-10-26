import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_wcomponent_time_slider_data} from "../time_control/prepare_data/wcomponent.js";
import {ContentControls} from "../sharedf/content_controls/ContentControls.js";
const map_state = (state) => ({
  wcomponents: state.derived.wcomponents,
  current_composed_knowledge_view: get_current_composed_knowledge_view_from_state(state)
});
const connector = connect(map_state);
function _KnowledgeContentControls(props) {
  const {wcomponents, current_composed_knowledge_view} = props;
  if (!current_composed_knowledge_view)
    return /* @__PURE__ */ h("div", null);
  const {composed_wc_id_map} = current_composed_knowledge_view;
  const wcomponents_on_kv = useMemo(() => wcomponents.filter((wc) => !!composed_wc_id_map[wc.id]), [wcomponents, composed_wc_id_map]);
  const {created_events, sim_events} = useMemo(() => get_wcomponent_time_slider_data(wcomponents_on_kv), [wcomponents_on_kv]);
  return /* @__PURE__ */ h(ContentControls, {
    created_events,
    sim_events
  });
}
export const KnowledgeContentControls = connector(_KnowledgeContentControls);
