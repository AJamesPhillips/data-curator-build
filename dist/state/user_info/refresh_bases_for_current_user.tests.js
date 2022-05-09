import {test} from "../../shared/utils/test.js";
import {ACTIONS} from "../actions.js";
import {user_info_reducer} from "./reducer.js";
import {selector_needs_to_create_a_base} from "./selector.js";
export function run_tests() {
  const inserted_at = new Date();
  const updated_at = new Date();
  const user_id = "123";
  const other_user_id = "987";
  const an_owned_base = {
    id: 1,
    inserted_at,
    updated_at,
    owner_user_id: user_id,
    public_read: false,
    title: "owned by this user",
    access_level: "owner",
    can_edit: true
  };
  const a_base_with_editor_access = {
    id: 2,
    inserted_at,
    updated_at,
    owner_user_id: other_user_id,
    public_read: false,
    title: "editable by this user",
    access_level: "editor",
    can_edit: true
  };
  const a_base_with_viewer_access = {
    id: 3,
    inserted_at,
    updated_at,
    owner_user_id: other_user_id,
    public_read: false,
    title: "viewable by this user",
    access_level: "viewer",
    can_edit: false
  };
  const a_public_base = {
    id: 3,
    inserted_at,
    updated_at,
    owner_user_id: other_user_id,
    public_read: true,
    title: "public viewable by this user",
    access_level: "viewer",
    can_edit: false
  };
  const bases = [
    an_owned_base,
    a_base_with_editor_access,
    a_base_with_viewer_access,
    a_public_base
  ];
  function wrapped_selector_needs_to_create_a_base(user_info2) {
    const state = {user_info: user_info2};
    return selector_needs_to_create_a_base(state);
  }
  let user_info = {
    user: {id: user_id},
    chosen_base_id: void 0,
    bases_by_id: void 0
  };
  test(wrapped_selector_needs_to_create_a_base(user_info), false);
  [an_owned_base, a_base_with_editor_access].forEach((base) => {
    user_info = user_info_reducer({user_info}, ACTIONS.user_info.update_bases({bases: [base]})).user_info;
    test(user_info.chosen_base_id, base.id);
    test(wrapped_selector_needs_to_create_a_base(user_info), false);
  });
  user_info = user_info_reducer({user_info}, ACTIONS.user_info.update_bases({bases: [a_base_with_viewer_access, a_public_base]})).user_info;
  test(user_info.chosen_base_id, void 0);
  test(wrapped_selector_needs_to_create_a_base(user_info), true);
  user_info = user_info_reducer({
    user_info: {
      user: {id: user_id},
      chosen_base_id: 100,
      bases_by_id: void 0
    }
  }, ACTIONS.user_info.update_bases({bases: [a_base_with_viewer_access, a_public_base]})).user_info;
  test(user_info.chosen_base_id, void 0);
  test(wrapped_selector_needs_to_create_a_base(user_info), true);
  [an_owned_base, a_base_with_editor_access].forEach((base) => {
    user_info = user_info_reducer({
      user_info: {
        user: {id: user_id},
        chosen_base_id: 100,
        bases_by_id: void 0
      }
    }, ACTIONS.user_info.update_bases({bases: []})).user_info;
    test(user_info.chosen_base_id, void 0);
    test(wrapped_selector_needs_to_create_a_base(user_info), true);
  });
  bases.forEach(({id}) => {
    user_info = user_info_reducer({
      user_info: {
        user: {id: user_id},
        chosen_base_id: id,
        bases_by_id: void 0
      }
    }, ACTIONS.user_info.update_bases({bases})).user_info;
    test(user_info.chosen_base_id, id);
    test(wrapped_selector_needs_to_create_a_base(user_info), false);
  });
}
