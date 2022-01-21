import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {calculate_canvas_x_for_wcomponent_temporal_uncertainty} from "../knowledge_view/datetime_line.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_current_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
const map_state = (state) => {
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  const kv = get_current_knowledge_view_from_state(state);
  const composed_datetime_line_config = composed_kv?.composed_datetime_line_config;
  return {
    kv,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    created_at_ms: state.routing.args.created_at_ms,
    time_origin_ms: composed_datetime_line_config?.time_origin_ms,
    time_origin_x: composed_datetime_line_config?.time_origin_x,
    time_scale: composed_datetime_line_config?.time_scale
  };
};
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _ButtonSnapXToDatetime(props) {
  const [number_changed, set_number_changed] = useState(void 0);
  const {
    kv,
    wcomponent_id,
    wcomponents_by_id,
    created_at_ms,
    time_origin_ms,
    time_origin_x,
    time_scale,
    upsert_knowledge_view
  } = props;
  const wcomponent_ids = (wcomponent_id ? [wcomponent_id] : props.wcomponent_ids) || [];
  const {id: knowledge_view_id, wc_id_map} = kv || {};
  const disabled = !kv || !knowledge_view_id || wc_id_map === void 0 || time_origin_ms === void 0 || time_origin_x === void 0 || time_scale === void 0 || !!wcomponent_id && calculate_canvas_x_for_wcomponent_temporal_uncertainty({
    wcomponent_id,
    wcomponents_by_id,
    created_at_ms,
    time_origin_ms,
    time_origin_x,
    time_scale
  }) === void 0;
  const title = !disabled ? "" : time_origin_ms === void 0 ? "Disabled as time origin not set" : time_origin_x === void 0 ? "Disabled as time origin X position is not set" : "Diabled";
  let number_changed_text = "";
  if (number_changed !== void 0) {
    if (!number_changed)
      number_changed_text = "No changes";
    else if (wcomponent_ids.length > 1)
      number_changed_text = `Changed ${number_changed}`;
  }
  return /* @__PURE__ */ h("div", {
    style: {display: "inline-block"}
  }, /* @__PURE__ */ h(Button, {
    disabled,
    value: "X by time",
    title,
    onClick: () => {
      if (disabled)
        return;
      const {number_changed: number_changed2, knowledge_view} = calulate_new_positions({
        wcomponent_ids,
        wcomponents_by_id,
        kv,
        wc_id_map,
        created_at_ms,
        time_origin_ms,
        time_origin_x,
        time_scale
      });
      if (number_changed2 && knowledge_view)
        upsert_knowledge_view({knowledge_view});
      set_number_changed(number_changed2);
      setTimeout(() => set_number_changed(void 0), 1e3);
    },
    is_left: true
  }), number_changed_text);
}
export const ButtonSnapXToDatetime = connector(_ButtonSnapXToDatetime);
function calulate_new_positions(args) {
  const {wcomponent_ids, wcomponents_by_id, kv, wc_id_map, created_at_ms, time_origin_ms, time_origin_x, time_scale} = args;
  let number_changed = 0;
  if (!kv || !wc_id_map || time_origin_ms === void 0 || time_origin_x === void 0 || time_scale === void 0) {
    return {number_changed, knowledge_view: void 0};
  }
  const new_wc_id_map = {...wc_id_map};
  wcomponent_ids.forEach((wcomponent_id) => {
    const kv_entry = wc_id_map[wcomponent_id];
    if (!kv_entry)
      return;
    const rounded_left = calculate_canvas_x_for_wcomponent_temporal_uncertainty({
      wcomponent_id,
      wcomponents_by_id,
      created_at_ms,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    if (rounded_left === void 0)
      return;
    const new_kv_entry = {...kv_entry, left: rounded_left};
    new_wc_id_map[wcomponent_id] = new_kv_entry;
    number_changed += 1;
  });
  const new_knowledge_view = number_changed ? {...kv, wc_id_map: new_wc_id_map} : void 0;
  return {number_changed, knowledge_view: new_knowledge_view};
}
