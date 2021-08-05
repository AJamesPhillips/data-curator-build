import {memoize} from "../../utils/memoize.js";
export function factory_filter_objects_by_pattern_id_c(find_pattern_id) {
  function _filter_objects_by_pattern_id(objects) {
    return objects.filter(({pattern_id}) => pattern_id === find_pattern_id);
  }
  const name = `_filter_objects_by_pattern_id_${find_pattern_id}`;
  return memoize(_filter_objects_by_pattern_id, {cache_limit: 1, name});
}
