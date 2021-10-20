import {
  wcomponent_is_plain_connection,
  wcomponent_is_counterfactual_v2,
  wcomponent_is_sub_state
} from "../../wcomponent/interfaces/SpecialisedObjects.js";
export function get_default_wcomponent_title(args) {
  let title = "";
  if (wcomponent_is_plain_connection(args.wcomponent)) {
    const from_wc = args.wcomponents_by_id[args.wcomponent.from_id];
    const to_wc = args.wcomponents_by_id[args.wcomponent.to_id];
    if (from_wc || to_wc) {
      title = `${from_wc ? "@@" + from_wc.id : "_"} -> ${to_wc ? "@@" + to_wc.id : "_"} <auto generated>`;
    }
  } else if (wcomponent_is_counterfactual_v2(args.wcomponent)) {
    title = `Counterfactual (no target set) <auto generated>`;
    const target_wc_id = args.wcomponent.target_wcomponent_id;
    if (target_wc_id)
      title = `Counterfactual of: @@${target_wc_id} <auto generated>`;
  } else if (wcomponent_is_sub_state(args.wcomponent)) {
    title = `Sub state (no target set) <auto generated>`;
    const target_wc_id = args.wcomponent.target_wcomponent_id;
    if (target_wc_id)
      title = `@@${target_wc_id} <auto generated>`;
  }
  return title;
}
