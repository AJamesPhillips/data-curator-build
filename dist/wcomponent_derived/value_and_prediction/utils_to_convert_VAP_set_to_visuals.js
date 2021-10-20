import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {
  value_possibility_visual_false_id,
  value_possibility_visual_true_id,
  value_possibility_visual_uncertainty_id
} from "../../wcomponent/value/parse_value.js";
export const VAP_visual_uncertainty_id = "VAP_uncertainty_id__undefined__";
export const VAP_visual_false_id = "VAP_false_id__undefined__";
export function ensure_VAP_set_entries_consistent_with_representing_type(VAP_set, VAPs_represent) {
  let subtype_specific_VAPs = VAPs_represent === VAPsType.boolean ? VAP_set.entries.slice(0, 1) : VAP_set.entries;
  subtype_specific_VAPs = expand_booleans(subtype_specific_VAPs, VAPs_represent);
  return {...VAP_set, entries: subtype_specific_VAPs};
}
function expand_booleans(entries, VAPs_represent) {
  if (VAPs_represent === VAPsType.boolean) {
    const VAP_true = entries[0];
    if (!VAP_true)
      return entries;
    const VAP_false = {
      ...VAP_true,
      probability: 1 - VAP_true.probability,
      id: VAP_visual_false_id,
      value_id: value_possibility_visual_false_id,
      description: ""
    };
    entries = [{...VAP_true, value_id: value_possibility_visual_true_id}, VAP_false];
  }
  return entries;
}
export function add_uncertain_VAP_visual(total_certainties, VAP_visuals) {
  const uncertainty = 1 - total_certainties;
  const uncertainty_VAP_visual = {
    VAP_id: VAP_visual_uncertainty_id,
    value_id: value_possibility_visual_uncertainty_id,
    value_text: "?",
    certainty: uncertainty,
    parsed_value: null
  };
  return [...VAP_visuals, uncertainty_VAP_visual];
}
