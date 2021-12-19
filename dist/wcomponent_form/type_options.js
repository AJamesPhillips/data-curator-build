import {wcomponent_statev2_subtypes} from "../wcomponent/interfaces/state.js";
import {wcomponent_types} from "../wcomponent/interfaces/wcomponent_base.js";
import {wcomponent_type_to_text} from "../wcomponent_derived/wcomponent_type_to_text.js";
export const wcomponent_type_options = wcomponent_types.map((type) => ({id: type, title: wcomponent_type_to_text(type)}));
export const wcomponent_statev2_subtype_options = wcomponent_statev2_subtypes.map((type) => ({id: type, title: type}));
