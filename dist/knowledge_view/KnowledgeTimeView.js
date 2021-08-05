import {h} from "../../_snowpack/pkg/preact.js";
import "./KnowledgeTimeView.css.proxy.js";
import {WComponentCanvasNode} from "../knowledge/canvas_node/WComponentCanvasNode.js";
import {MainArea} from "../layout/MainArea.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {sort_list} from "../shared/utils/sort.js";
import {wcomponent_has_VAP_sets} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_created_at_ms} from "../shared/wcomponent/utils_datetime.js";
import {Box} from "../../_snowpack/pkg/@material-ui/core.js";
import {ConnectedValueAndPredictionSetSummary} from "../knowledge/multiple_values/ConnectedValueAndPredictionSetSummary.js";
const map_state = (state) => {
  const sync_ready = state.sync.ready;
  const {current_composed_knowledge_view} = state.derived;
  if (sync_ready && !current_composed_knowledge_view)
    console.log(`No current_composed_knowledge_view`);
  const {selected_wcomponent_ids_map} = state.meta_wcomponents;
  let wcomponent_nodes = [];
  if (current_composed_knowledge_view) {
    wcomponent_nodes = current_composed_knowledge_view.wcomponent_nodes;
  }
  return {
    sync_ready,
    wcomponent_nodes,
    wcomponent_connections: current_composed_knowledge_view && current_composed_knowledge_view.wcomponent_connections,
    presenting: state.display_options.consumption_formatting,
    selected_wcomponent_ids_map
  };
};
const connector = connect(map_state);
function _KnowledgeTimeView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Box, {
      className: "knowledge_time_view",
      maxHeight: "100%",
      overflow: "auto"
    }, elements)
  });
}
export const KnowledgeTimeView = connector(_KnowledgeTimeView);
const no_children = [];
const get_children = (props) => {
  const {sync_ready} = props;
  let {wcomponent_nodes} = props;
  if (!sync_ready || !wcomponent_nodes) {
    return no_children;
  }
  const {selected_wcomponent_ids_map} = props;
  const get_key = (wc) => {
    const entry = selected_wcomponent_ids_map[wc.id];
    if (entry !== void 0)
      return entry;
    else
      return get_created_at_ms(wc);
  };
  wcomponent_nodes = sort_list(wcomponent_nodes, get_key, "ascending");
  const elements = [];
  wcomponent_nodes.map((wc) => {
    const VAP_sets = wcomponent_has_VAP_sets(wc) ? wc.values_and_prediction_sets : [];
    elements.push(/* @__PURE__ */ h(Box, {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      py: "0.5em",
      key: wc.id
    }, /* @__PURE__ */ h(WComponentCanvasNode, {
      id: wc.id,
      on_graph: false
    }), VAP_sets.length > 0 && /* @__PURE__ */ h(Box, {
      p: "0.5em",
      flexGrow: 1,
      flexShrink: 0,
      display: "flex",
      alignItems: "stretch",
      alignContent: "stretch"
    }, VAP_sets.map((VAP_set) => /* @__PURE__ */ h(ConnectedValueAndPredictionSetSummary, {
      wcomponent: wc,
      VAP_set
    })))));
  });
  return elements;
};
const no_svg_upper_children = [];
const get_svg_upper_children = ({wcomponent_connections}) => {
  return null;
};
