import {
  addStringNoLocale,
  createSolidDataset,
  createThing,
  deleteSolidDataset,
  saveSolidDatasetAt,
  setThing
} from "../../../../snowpack/pkg/@inrupt/solid-client.js";
import {fetch as solid_fetch} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {get_knowledge_views_url, get_solid_pod_URL_or_error, get_wcomponents_url, V1} from "./solid.js";
import {solid_dataset_cache} from "./solid_dataset_cache.js";
export async function save_solid_data(user_info, data) {
  const {solid_pod_URL, promised_error} = get_solid_pod_URL_or_error(user_info, "save");
  if (!solid_pod_URL)
    return Promise.reject(promised_error);
  const wcomponent_ids_to_delete = Array.from(data.wcomponent_ids_to_delete || []);
  return save_knowledge_views(solid_pod_URL, data.knowledge_views).then(() => save_wcomponents(solid_pod_URL, data.wcomponents, wcomponent_ids_to_delete));
}
async function save_knowledge_views(solid_pod_URL, knowledge_views) {
  const knowledge_views_url = get_knowledge_views_url(solid_pod_URL);
  const result = await save_items(knowledge_views_url, knowledge_views, [], void 0);
  solid_dataset_cache.knowledge_views_dataset = result.items_dataset;
  return result.error && Promise.reject(result.error);
}
async function save_wcomponents(solid_pod_URL, wcomponents, wcomponent_ids_to_delete) {
  const wcomponents_url = get_wcomponents_url(solid_pod_URL);
  const result = await save_items(wcomponents_url, wcomponents, wcomponent_ids_to_delete, void 0);
  solid_dataset_cache.wcomponents_dataset = result.items_dataset;
  return result.error && Promise.reject(result.error);
}
async function save_items(items_URL, items, item_ids_to_remove, cached_items_dataset) {
  let items_dataset = createSolidDataset();
  let error = void 0;
  if (cached_items_dataset) {
    items_dataset = cached_items_dataset;
  } else {
    try {
      await deleteSolidDataset(items_URL, {fetch: solid_fetch});
    } catch (err) {
      if (!err || err.statusCode !== 404)
        console.error(`Error deleting "${items_URL}"`, err);
    }
  }
  items.forEach((item) => {
    let thing = createThing({name: item.id});
    thing = addStringNoLocale(thing, V1.title, item.title);
    thing = addStringNoLocale(thing, V1.json, JSON.stringify(item));
    items_dataset = setThing(items_dataset, thing);
  });
  try {
    items_dataset = await saveSolidDatasetAt(items_URL, items_dataset, {fetch: solid_fetch});
  } catch (err) {
    console.error(`error saving items to "${items_URL}" :`, err);
    error = {type: "general", message: err};
  }
  return {items_dataset, error};
}
