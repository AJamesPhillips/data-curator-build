import {h} from "../../snowpack/pkg/preact.js";
import {useMemo, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {get_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_composed_wc_id_map, get_foundational_knowledge_views} from "../state/specialised_objects/knowledge_views/knowledge_views_derived_reducer.js";
import {Button} from "../sharedf/Button.js";
const map_state = (state, own_props) => {
  const knowledge_view = get_knowledge_view_from_state(state, own_props.knowledge_view_id);
  const {wcomponents_by_id, knowledge_views_by_id} = state.specialised_objects;
  return {
    knowledge_view,
    wcomponents_by_id,
    knowledge_views_by_id,
    editing: !state.display_options.consumption_formatting,
    is_current_kv: state.routing.args.subview_id === own_props.knowledge_view_id
  };
};
const connector = connect(map_state);
function _KnowledgeViewActiveCounterFactuals(props) {
  const {editing, knowledge_view, wcomponents_by_id, knowledge_views_by_id, on_change} = props;
  const [show_active_counterfactuals, set_show_active_counterfactuals] = useState(props.is_current_kv || props.show_automatically || false);
  if (!knowledge_view)
    return /* @__PURE__ */ h("div", null);
  if (!show_active_counterfactuals)
    return /* @__PURE__ */ h(Button, {
      value: "Calculate active assumptions",
      onClick: () => set_show_active_counterfactuals(true)
    });
  const selected_option_ids = knowledge_view.active_counterfactual_v2_ids || [];
  const foundational_knowledge_views = get_foundational_knowledge_views(knowledge_view, knowledge_views_by_id);
  const options = useMemo(() => {
    const wc_id_map = get_composed_wc_id_map(foundational_knowledge_views, wcomponents_by_id).composed_wc_id_map;
    const options2 = Object.keys(wc_id_map).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(({type}) => type === "counterfactualv2").map((wcomponent) => ({
      id: wcomponent.id,
      title: get_title({
        wcomponent,
        rich_text: true,
        render_links: false,
        wcomponents_by_id,
        knowledge_views_by_id,
        wc_id_to_counterfactuals_map: void 0,
        created_at_ms: FUTURE_TIME_MS,
        sim_ms: FUTURE_TIME_MS
      })
    }));
    return options2;
  }, [wcomponents_by_id, ...foundational_knowledge_views]);
  if (editing) {
    if (options.length === 0)
      return /* @__PURE__ */ h("div", null, "No counterfactuals in composed knowledge view (includes foundational knowledge views)");
  } else {
    if (selected_option_ids.length === 0)
      return /* @__PURE__ */ h("div", null, "No assumptions set");
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "...",
    allow_none: true,
    selected_option_ids,
    options,
    on_change
  }));
}
export const KnowledgeViewActiveCounterFactuals = connector(_KnowledgeViewActiveCounterFactuals);
const FUTURE_TIME_MS = new Date().getTime() + 1e11;
