import {
  getSolidDataset,
  getStringNoLocale,
  getThingAll
} from "../../../../snowpack/pkg/@inrupt/solid-client.js";
import {fetch as solid_fetch} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {is_defined} from "../../../shared/utils/is_defined.js";
import {get_knowledge_views_url, get_solid_pod_URL_or_error, get_wcomponents_url, V1} from "./solid.js";
import {solid_dataset_cache} from "./solid_dataset_cache.js";
export async function load_solid_data(state) {
  const {solid_pod_URL, promised_error} = get_solid_pod_URL_or_error(state.user_info, "load");
  if (promised_error)
    return Promise.reject(promised_error);
  const knowledge_views_response = await get_knowledge_views(solid_pod_URL);
  if (knowledge_views_response.error)
    return Promise.reject(knowledge_views_response.error);
  const wcomponents_response = await get_wcomponents(solid_pod_URL);
  if (wcomponents_response.error)
    return Promise.reject(wcomponents_response.error);
  return Promise.resolve({
    knowledge_views: knowledge_views_response.items,
    wcomponents: wcomponents_response.items,
    perceptions: [],
    wcomponent_ids_to_delete: new Set()
  });
}
async function get_knowledge_views(solid_pod_URL) {
  const knowledge_views_url = get_knowledge_views_url(solid_pod_URL);
  const result = await get_items(knowledge_views_url);
  solid_dataset_cache.knowledge_views_dataset = result.items_dataset;
  return result;
}
async function get_wcomponents(solid_pod_URL) {
  const wcomponents_url = get_wcomponents_url(solid_pod_URL);
  const result = await get_items(wcomponents_url);
  solid_dataset_cache.wcomponents_dataset = result.items_dataset;
  return result;
}
async function get_items(items_url) {
  let items_dataset = void 0;
  let items = [];
  let error = void 0;
  try {
    const items_dataset2 = await getSolidDataset(items_url, {fetch: solid_fetch});
    const things = await getThingAll(items_dataset2);
    items = things.map((item) => getStringNoLocale(item, V1.json)).map((item) => item ? JSON.parse(item) : void 0).filter(is_defined);
  } catch (err) {
    if (err.statusCode !== 404) {
      const message = `error loading items from: ${items_url}: ` + err;
      error = {type: "loading_error", message};
    }
  }
  return {items_dataset, items, error};
}
