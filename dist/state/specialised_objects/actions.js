import {safe_merge} from "../../utils/object.js";
import {highlighting_actions} from "./meta_wcomponents/highlighting.js";
import {selecting_actions} from "./meta_wcomponents/selecting/actions.js";
import {syncing_actions} from "./syncing/actions.js";
import {wcomponent_actions} from "./wcomponents/actions.js";
import {knowledge_view_actions} from "./knowledge_views/actions.js";
import {perception_actions} from "./perceptions/actions.js";
import {find_all_causal_paths_actions} from "./meta_wcomponents/find_all_causal_paths/actions.js";
export const specialised_object_actions = safe_merge(highlighting_actions, syncing_actions, selecting_actions, perception_actions, wcomponent_actions, knowledge_view_actions, find_all_causal_paths_actions);
