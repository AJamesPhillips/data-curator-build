import {parse_knowledge_view} from "../../../wcomponent/parse_json/parse_knowledge_view.js";
import {parse_wcomponent} from "../../../wcomponent/parse_json/parse_wcomponent.js";
const local_raw_data = {wcomponents_by_id: {}, knowledge_views_by_id: {}};
export const local_user = {};
const {wcomponents_by_id, knowledge_views_by_id} = local_raw_data;
const wcomponents = Object.values(wcomponents_by_id).map((item) => parse_wcomponent(item));
const knowledge_views = Object.values(knowledge_views_by_id).map((item) => parse_knowledge_view(item));
export const local_data = {
  perceptions: [],
  wcomponents,
  knowledge_views
};
