import {
  wcomponent_should_have_state_VAP_sets,
  wcomponent_is_statev2,
  wcomponent_is_action,
  wcomponent_is_causal_link,
  wcomponent_is_state_value
} from "./interfaces/SpecialisedObjects.js";
import {VAPsType} from "./interfaces/VAPsType.js";
export function get_wcomponent_VAPs_represent(wcomponent, wcomponents_by_id, _wcomponent_ids_touched = new Set()) {
  let VAPs_represent = VAPsType.undefined;
  if (_wcomponent_ids_touched.has(wcomponent?.id || "")) {
    console.log(`Recursion prevented in "get_wcomponent_VAPs_represent" for wcomponent id: "${wcomponent?.id}" type: "${wcomponent?.type}"`);
    return VAPs_represent;
  }
  if (wcomponent)
    _wcomponent_ids_touched.add(wcomponent.id);
  if (!wcomponent_should_have_state_VAP_sets(wcomponent))
    return VAPs_represent;
  VAPs_represent = VAPsType.other;
  if (wcomponent_is_statev2(wcomponent))
    VAPs_represent = subtype_to_VAPsType(wcomponent.subtype);
  else if (wcomponent_is_action(wcomponent))
    VAPs_represent = VAPsType.action;
  else if (wcomponent_is_causal_link(wcomponent)) {
    VAPs_represent = VAPsType.boolean;
  } else if (wcomponent_is_state_value(wcomponent)) {
    const target_wcomponent = wcomponents_by_id[wcomponent.attribute_wcomponent_id || ""];
    if (target_wcomponent)
      VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent, wcomponents_by_id, _wcomponent_ids_touched);
  } else {
    console.error(`Unimplmented "get_wcomponent_VAPs_represent" for wcomponent id: "${wcomponent.id}" type: "${wcomponent.type}"`);
  }
  return VAPs_represent;
}
function subtype_to_VAPsType(subtype) {
  return subtype === "boolean" ? VAPsType.boolean : subtype === "number" ? VAPsType.number : subtype === "other" ? VAPsType.other : VAPsType.undefined;
}
