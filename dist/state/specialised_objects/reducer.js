import {knowledge_views_reducer} from "./knowledge_views/reducer.js";
import {highlighting_reducer} from "./meta_wcomponents/highlighting.js";
import {selecting_reducer} from "./meta_wcomponents/selecting/reducer.js";
import {perceptions_reducer} from "./perceptions/reducer.js";
import {syncing_reducer} from "./syncing/reducer.js";
import {wcomponents_reducer} from "./wcomponents/reducer.js";
export const specialised_objects_reducer = (state, action) => {
  state = highlighting_reducer(state, action);
  state = selecting_reducer(state, action);
  state = syncing_reducer(state, action);
  state = perceptions_reducer(state, action);
  state = wcomponents_reducer(state, action);
  state = knowledge_views_reducer(state, action);
  return state;
};
