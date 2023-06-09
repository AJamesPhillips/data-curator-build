import {v4 as uuid_v4} from "../../../snowpack/pkg/uuid.js";
function get_new_id() {
  return uuid_v4();
}
export const get_new_statement_id = () => "s" + get_new_id();
export const get_new_pattern_id = () => "p" + get_new_id();
export const get_new_object_id = () => "o" + get_new_id();
export const get_new_wcomponent_id = () => get_new_id();
export const get_new_prediction_id = () => "pr" + get_new_id();
export const get_new_value_id = () => "vl" + get_new_id();
export const get_new_value_and_prediction_set_id = () => "vps" + get_new_id();
export const get_new_VAP_id = () => "VAP" + get_new_id();
export const get_new_knowledge_view_id = () => get_new_id();
export const get_new_counterfactual_id = () => "cf" + get_new_id();
const statement_id_regex = new RegExp(/^s\d/);
export const is_statement_id = (id) => !!id && statement_id_regex.test(id);
const pattern_id_regex = new RegExp(/^p\d/);
export const is_pattern_id = (id) => !!id && pattern_id_regex.test(id);
const object_id_regex = new RegExp(/^o\d/);
export const is_object_id = (id) => !!id && object_id_regex.test(id);
const wcomponent_id_regex = new RegExp(/^wc\d/);
export const is_wcomponent_id = (id) => !!id && wcomponent_id_regex.test(id);
const knowledge_view_id_regex = new RegExp(/^kv(wc)?\d/);
export const is_knowledge_view_id = (id) => !!id && knowledge_view_id_regex.test(id);
const uuidv4_regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
export const is_uuid_v4 = (id) => !!id && uuidv4_regex.test(id);
