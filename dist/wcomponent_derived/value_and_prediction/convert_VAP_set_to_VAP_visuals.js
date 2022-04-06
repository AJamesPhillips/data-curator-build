import {SortDirection, sort_list} from "../../shared/utils/sort.js";
import {get_boolean_representation, parsed_value_to_string} from "../value/parsed_value_presentation.js";
import {
  add_uncertain_VAP_visual,
  ensure_VAP_set_entries_consistent_with_representing_type
} from "./utils_to_convert_VAP_set_to_visuals.js";
import {get_parsed_value_represented_by_a_VAP} from "../../wcomponent/value/parse_value.js";
export function convert_VAP_set_to_VAP_visuals(args) {
  const cleaned_VAP_set = ensure_VAP_set_entries_consistent_with_representing_type(args.VAP_set, args.VAPs_represent);
  const shared_conviction = cleaned_VAP_set.shared_entry_values?.conviction;
  let total_certainties = 0;
  const boolean_representation = get_boolean_representation(args.wcomponent);
  const data = cleaned_VAP_set.entries.map((VAP) => {
    const parsed_value = get_parsed_value_represented_by_a_VAP(VAP, args.VAPs_represent);
    const value_text = parsed_value_to_string(parsed_value, boolean_representation);
    const certainty = VAP.probability * (shared_conviction !== void 0 ? shared_conviction : VAP.conviction);
    total_certainties += certainty;
    return {
      VAP_id: VAP.id,
      value_id: VAP.value_id,
      parsed_value,
      value_text,
      certainty
    };
  });
  const should_sort = args.sort === void 0 || args.sort;
  const sorted_data = should_sort ? sort_list(data, (i) => i.certainty, SortDirection.descending) : data;
  return add_uncertain_VAP_visual(total_certainties, sorted_data);
}
