import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {get_new_prediction_id} from "../../shared/utils/ids.js";
import {PredictionViewDetails, PredictionViewSummary} from "./PredictionView.js";
import {partition_and_prune_items_by_datetimes} from "../../shared/wcomponent/utils_datetime.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_items_descriptor, ExpandableList} from "../../form/editable_list/ExpandableList.js";
import {ListHeader} from "../../form/editable_list/ListHeader.js";
import {ListHeaderAddButton} from "../../form/editable_list/ListHeaderAddButton.js";
import {NewItemForm} from "../../form/editable_list/NewItemForm.js";
import {factory_render_list_content} from "../../form/editable_list/render_list_content.js";
import {floor_datetime_to_resolution, get_new_created_ats} from "../../shared/utils/datetime.js";
const map_state = (state) => ({
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms,
  creation_context: state.creation_context,
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _PredictionList(props) {
  const [new_item, set_new_item] = useState(void 0);
  const {item_descriptor, predictions, created_at_ms, sim_ms, editing} = props;
  const item_top_props = useMemo(() => {
    const props2 = {
      get_created_at,
      get_custom_created_at,
      get_summary,
      get_details: factory_get_details(editing)
    };
    return props2;
  }, [editing]);
  const {
    invalid_future_items,
    invalid_past_items,
    future_items,
    present_items,
    past_items
  } = partition_and_prune_items_by_datetimes({items: predictions, created_at_ms, sim_ms});
  function everything_but(predictions_subset) {
    const to_exclude = new Set();
    predictions_subset.forEach(({id}) => to_exclude.add(id));
    return predictions.filter(({id}) => !to_exclude.has(id));
  }
  const render_future_list_content = factory_render_list_content({
    items: future_items,
    get_id,
    update_items: (new_items) => props.update_predictions([...new_items, ...everything_but(future_items)]),
    item_top_props
  });
  const render_present_list_content = factory_render_list_content({
    items: present_items,
    get_id,
    update_items: (new_items) => props.update_predictions([...new_items, ...everything_but(present_items)]),
    item_top_props
  });
  const render_past_list_content = factory_render_list_content({
    items: past_items,
    get_id,
    update_items: (new_items) => props.update_predictions([...new_items, ...everything_but(past_items)]),
    item_top_props
  });
  const title = editing ? get_items_descriptor(item_descriptor, predictions.length, editing) : item_descriptor;
  const show_futures = editing || future_items.length > 0;
  const show_presents = editing || present_items.length > 0;
  const show_pasts = editing || past_items.length > 0;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ListHeader, {
    items_descriptor: title,
    on_click_header: void 0,
    other_content: () => /* @__PURE__ */ h(ListHeaderAddButton, {
      new_item_descriptor: item_descriptor,
      on_pointer_down_new_list_entry: () => set_new_item(prepare_new_item(props.creation_context))
    })
  }), /* @__PURE__ */ h(NewItemForm, {
    new_item,
    set_new_item,
    item_top_props,
    item_descriptor,
    add_item: (new_item2) => {
      props.update_predictions([...predictions, new_item2]);
      set_new_item(void 0);
    }
  }), invalid_future_items.length || invalid_past_items.length ? /* @__PURE__ */ h("div", null, "Hidden (", invalid_future_items.length, ", ", invalid_past_items.length, ")") : null, predictions.length > 0 && /* @__PURE__ */ h("div", null, show_futures && /* @__PURE__ */ h(ExpandableList, {
    content: render_future_list_content,
    item_descriptor: "",
    items_descriptor: get_items_descriptor("Future", future_items.length, editing),
    disable_collapsed: true
  }), (show_futures || show_presents) && /* @__PURE__ */ h("hr", null), show_presents && /* @__PURE__ */ h(ExpandableList, {
    content: render_present_list_content,
    item_descriptor: "",
    items_descriptor: get_items_descriptor("Present", present_items.length, editing),
    disable_collapsed: true
  }), show_presents && show_pasts && /* @__PURE__ */ h("hr", null), show_pasts && /* @__PURE__ */ h(ExpandableList, {
    content: render_past_list_content,
    item_descriptor: "",
    items_descriptor: get_items_descriptor("Past", past_items.length, editing),
    disable_collapsed: true
  })));
}
export const PredictionList = connector(_PredictionList);
const get_id = (item) => item.id;
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
function get_summary(item, on_change) {
  return /* @__PURE__ */ h(PredictionViewSummary, {
    prediction: item,
    on_change: (prediction) => on_change && on_change(prediction)
  });
}
function factory_get_details(editing) {
  return (item, on_change) => /* @__PURE__ */ h(PredictionViewDetails, {
    prediction: item,
    on_change: (prediction) => on_change && on_change(prediction),
    editing
  });
}
function prepare_new_item(creation_context) {
  const created_ats = get_new_created_ats(creation_context);
  const custom_now = floor_datetime_to_resolution(created_ats.custom_created_at || created_ats.created_at, "day");
  return {
    id: get_new_prediction_id(),
    ...created_ats,
    datetime: {min: custom_now},
    explanation: "",
    probability: 1,
    conviction: 1
  };
}
