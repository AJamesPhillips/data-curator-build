import {replace_element} from "../../utils/list.js";
import {is_update_pattern} from "../pattern_actions.js";
import {
  is_add_object,
  is_delete_object,
  is_update_object,
  is_replace_all_core_objects,
  is_replace_all_objects_with_cache,
  is_upsert_objects
} from "./actions.js";
import {merge_pattern_into_core_object} from "./objects.js";
export const objects_reducer = (state, action) => {
  let bust_object_render_caches = false;
  if (is_add_object(action)) {
    const new_object = action_to_object_with_cache(action, state.patterns);
    bust_object_render_caches = true;
    state = {
      ...state,
      objects: [...state.objects, new_object]
    };
  }
  if (is_delete_object(action)) {
    state = {
      ...state,
      objects: state.objects.filter(({id}) => id !== action.id)
    };
    bust_object_render_caches = true;
  }
  if (is_update_object(action)) {
    const object_exists = !!state.objects.find(({id}) => id === action.id);
    if (!object_exists) {
      console.error(`No object for id: "${action.id}"`);
      return state;
    }
    const replacement_object = action_to_object_with_cache(action, state.patterns);
    bust_object_render_caches = true;
    const objects = replace_element(state.objects, replacement_object, ({id}) => id === action.id);
    state = {
      ...state,
      objects
    };
  }
  if (is_replace_all_core_objects(action)) {
    const new_objects = [];
    action.objects.forEach((core_object) => {
      const new_object = add_cache(merge_pattern_into_core_object({
        object: core_object,
        patterns: state.patterns
      }));
      new_objects.push(new_object);
    });
    state = {
      ...state,
      objects: new_objects
    };
  }
  if (is_replace_all_objects_with_cache(action)) {
    state = {
      ...state,
      objects: action.objects
    };
    bust_object_render_caches = false;
  }
  if (is_upsert_objects(action)) {
    const existing_ids = new Set();
    state.objects.forEach((o) => {
      if (existing_ids.has(o.id))
        console.error(`Duplicate objects found for id: ${o.id}`);
      existing_ids.add(o.id);
    });
    const object_ids_to_update = {};
    const objects_to_insert = [];
    action.objects.forEach((core_object) => {
      const new_object = add_cache(merge_pattern_into_core_object({
        object: core_object,
        patterns: state.patterns
      }));
      if (existing_ids.has(new_object.id))
        object_ids_to_update[new_object.id] = new_object;
      else
        objects_to_insert.push(new_object);
    });
    bust_object_render_caches = true;
    const objects = state.objects.map((o) => {
      if (object_ids_to_update.hasOwnProperty(o.id)) {
        o = {
          ...o,
          ...object_ids_to_update[o.id]
        };
      }
      return o;
    }).concat(objects_to_insert);
    state = {
      ...state,
      objects
    };
  }
  if (is_update_pattern(action)) {
    bust_object_render_caches = true;
  }
  if (bust_object_render_caches) {
    state = {
      ...state,
      objects: state.objects.map((o) => {
        const object = {
          ...o,
          rendered: "",
          is_rendered: false
        };
        return object;
      })
    };
  }
  return state;
};
function add_cache(object) {
  return {
    ...object,
    rendered: "",
    is_rendered: false
  };
}
function action_to_object_with_cache(action, patterns) {
  const core_object = {...action};
  delete core_object.type;
  const object = add_cache(merge_pattern_into_core_object({
    object: core_object,
    patterns
  }));
  return object;
}
