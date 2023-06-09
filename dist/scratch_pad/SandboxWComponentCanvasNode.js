import {h} from "../../snowpack/pkg/preact.js";
import {connect, Provider} from "../../snowpack/pkg/react-redux.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {VAPsType} from "../wcomponent/interfaces/VAPsType.js";
import {ACTIONS} from "../state/actions.js";
import {get_starting_state} from "../state/starting_state.js";
import {get_store} from "../state/store.js";
import {prepare_new_VAP_set} from "../wcomponent/CRUD_helpers/prepare_new_VAP_set.js";
function sandbox_code() {
  const created_at = new Date("2021-01-01");
  const creation_context = {use_creation_context: true, creation_context: {
    custom_created_at: created_at,
    label_ids: []
  }};
  const VAP_set1 = prepare_new_VAP_set(VAPsType.undefined, {}, [], -1, creation_context);
  VAP_set1.entries[0].value = "thing";
  VAP_set1.entries[0].probability = 0.6;
  VAP_set1.shared_entry_values = {conviction: 0.4};
  const wc11 = {
    type: "statev2",
    subtype: "boolean",
    id: "wc11",
    created_at,
    base_id: -1,
    title: "wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title wc11 title ",
    description: "wc11 description",
    values_and_prediction_sets: [
      VAP_set1
    ]
  };
  const wc12_judgement = {
    type: "judgement",
    id: "wc12",
    created_at,
    base_id: -1,
    title: "wc12 title",
    description: "wc12 description",
    judgement_target_wcomponent_id: wc11.id,
    judgement_operator: "==",
    judgement_comparator_value: "True"
  };
  const wc13_judgement = {
    ...wc12_judgement,
    id: "wc13",
    judgement_operator: "!="
  };
  const VAP_set2 = prepare_new_VAP_set(VAPsType.undefined, {}, [], -1, creation_context);
  VAP_set2.entries[0].probability = 0;
  const wc14 = {
    ...wc11,
    id: "wc14",
    created_at,
    base_id: -1,
    title: "wc14 title ${value}",
    description: "wc14 description",
    values_and_prediction_sets: [
      VAP_set2
    ]
  };
  const wcomponents = [wc11, wc12_judgement, wc13_judgement, wc14];
  const kv10 = {
    id: "kv10",
    title: "kv10 title",
    description: "kv10 description",
    wc_id_map: {
      [wc11.id]: {left: 400, top: 100},
      [wc14.id]: {left: 700, top: 100}
    },
    created_at,
    base_id: -1,
    goal_ids: [],
    sort_type: "normal"
  };
  return {wcomponents, wc11, kv10};
}
export function SandboxWComponentCanvasNode() {
  const {wcomponents, wc11, kv10} = sandbox_code();
  let override_preloaded_state = get_starting_state(false);
  override_preloaded_state = {
    ...override_preloaded_state,
    routing: {
      route: "wcomponents",
      sub_route: null,
      item_id: wc11.id,
      args: {
        ...override_preloaded_state.routing.args,
        view: "knowledge",
        subview_id: kv10.id
      }
    }
  };
  const store = get_store({load_state_from_storage: false, override_preloaded_state});
  store.dispatch(ACTIONS.specialised_object.replace_all_specialised_objects({
    specialised_objects: {wcomponents, knowledge_views: [kv10]}
  }));
  return /* @__PURE__ */ h(Provider, {
    store
  }, /* @__PURE__ */ h(WComponentCanvasNodes, {
    wcomponents
  }));
}
const map_state = (state) => ({
  rich_text_formatting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _WComponentCanvasNodes(props) {
  return /* @__PURE__ */ h("div", null, "WComponentCanvasNodes ", "" + props.rich_text_formatting, props.wcomponents.map(({id}) => /* @__PURE__ */ h(WComponentCanvasNode, {
    id
  })));
}
const WComponentCanvasNodes = connector(_WComponentCanvasNodes);
