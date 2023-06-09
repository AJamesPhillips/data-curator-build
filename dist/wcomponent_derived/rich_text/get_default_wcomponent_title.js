import {
  wcomponent_has_value_possibilities,
  wcomponent_is_plain_connection,
  wcomponent_is_counterfactual_v2,
  wcomponent_is_sub_state,
  wcomponent_is_state_value
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
    const {target_wcomponent_id, selector} = args.wcomponent;
    if (target_wcomponent_id) {
      title = `@@${target_wcomponent_id}`;
      if (selector?.target_value && selector?.target_value_id_type) {
        const {target_value, target_value_id_type} = selector;
        let value_possibility_str = "";
        if (target_value_id_type === "id") {
          const target_wc = args.wcomponents_by_id[target_wcomponent_id];
          if (wcomponent_has_value_possibilities(target_wc)) {
            const value_possibility = (target_wc?.value_possibilities || {})[target_value];
            if (value_possibility)
              value_possibility_str = value_possibility.value;
          }
        } else
          value_possibility_str = target_value;
        title += ": " + value_possibility_str;
      }
      title += ` <auto generated>`;
    }
  } else if (wcomponent_is_state_value(args.wcomponent)) {
    title = `State value (no parent or attribute set) <auto generated>`;
    const {owner_wcomponent_id, attribute_wcomponent_id} = args.wcomponent;
    if (owner_wcomponent_id || attribute_wcomponent_id) {
      title = owner_wcomponent_id ? `@@${owner_wcomponent_id} ` : `No owner of `;
      title += attribute_wcomponent_id ? `@@${attribute_wcomponent_id} ` : `no attribute `;
      title += `<auto generated>`;
    }
  }
  return title;
}
