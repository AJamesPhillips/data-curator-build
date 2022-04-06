import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_wcomponent_time_slider_data} from "../time_control/prepare_data/wcomponent.js";
import {ContentControls} from "../sharedf/content_controls/ContentControls.js";
import {is_defined} from "../shared/utils/is_defined.js";
const map_state = (state) => ({
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  current_composed_knowledge_view: get_current_composed_knowledge_view_from_state(state)
});
const connector = connect(map_state);
function _KnowledgeContentControls(props) {
  const {wcomponents_by_id, current_composed_knowledge_view} = props;
  if (!current_composed_knowledge_view)
    return /* @__PURE__ */ h("div", null);
  const {composed_wc_id_map} = current_composed_knowledge_view;
  const {created_events, sim_events} = useMemo(() => {
    const wcomponents_on_kv = Object.keys(composed_wc_id_map).map((id) => wcomponents_by_id[id]).filter(is_defined);
    return get_wcomponent_time_slider_data(wcomponents_on_kv);
  }, [composed_wc_id_map, wcomponents_by_id]);
  return /* @__PURE__ */ h(ContentControls, {
    created_events,
    sim_events
  });
}
export const KnowledgeContentControls = connector(_KnowledgeContentControls);
