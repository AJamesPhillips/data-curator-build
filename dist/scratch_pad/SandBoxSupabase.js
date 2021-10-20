import {h} from "../../snowpack/pkg/preact.js";
import {useState, useEffect} from "../../snowpack/pkg/preact/hooks.js";
import {v4 as uuid_v4} from "../../snowpack/pkg/uuid.js";
import SyncIcon from "../../snowpack/pkg/@material-ui/icons/Sync.js";
import "./SandBox.css.proxy.js";
import {get_new_knowledge_view_object} from "../knowledge_view/create_new_knowledge_view.js";
import {prepare_new_contextless_wcomponent_object} from "../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {sort_list} from "../shared/utils/sort.js";
import {replace_element} from "../utils/list.js";
import {get_supabase} from "../supabase/get_supabase.js";
import {
  DisplaySupabasePostgrestError,
  DisplaySupabaseSessionError
} from "../sync/user_info/DisplaySupabaseErrors.js";
import {
  supabase_get_knowledge_views,
  knowledge_view_app_to_supabase,
  knowledge_view_supabase_to_app
} from "../state/sync/supabase/knowledge_view.js";
import {create_a_base, get_all_bases, modify_base} from "../supabase/bases.js";
import {get_user_name_for_display} from "../supabase/users.js";
import {get_access_controls_for_base} from "../supabase/access_controls.js";
import {AccessControlEntry} from "../access_controls/AccessControlEntry.js";
import {AddAccessControlEntry} from "../access_controls/AddAccessControl.js";
let is_supabase_recovery_email = document.location.hash.includes("type=recovery");
const supabase = get_supabase();
const supabase_auth_state_change = {subscribers: []};
supabase.auth.onAuthStateChange(() => {
  supabase_auth_state_change.subscribers.forEach((subscriber) => subscriber());
});
window.supabase = supabase;
export function SandBoxSupabase() {
  const [user, set_user] = useState(supabase.auth.user());
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [supabase_session_error, set_supabase_session_error] = useState(null);
  const [waiting_user_registration_email, set_waiting_user_registration_email] = useState(false);
  const [waiting_password_reset_email, set_waiting_password_reset_email] = useState(false);
  const [updating_password, set_updating_password] = useState(is_supabase_recovery_email);
  const [async_request_in_progress, set_async_request_in_progress] = useState(false);
  const [postgrest_error, set_postgrest_error] = useState(null);
  const [bases, set_bases] = useState(void 0);
  const [current_base_id, set_current_base_id] = useState(void 0);
  useEffect(() => {
    if (!bases)
      return set_current_base_id(void 0);
    if (!current_base_id || !bases.find(({id}) => id === current_base_id)) {
      return set_current_base_id(bases.filter((b) => b.owner_user_id === user?.id)[0]?.id);
    }
  }, [bases]);
  const current_base = bases?.find(({id}) => id === current_base_id);
  const [users_by_id, set_users_by_id] = useState({});
  const [access_controls, _set_access_controls] = useState(void 0);
  const set_access_controls = (acs) => {
    _set_access_controls(acs && sort_list(acs, (ac) => ac.inserted_at.getTime(), "ascending"));
  };
  useEffect(() => {
    if (current_base_id)
      get_access_controls({base_id: current_base_id, set_postgrest_error, set_access_controls});
    else
      set_access_controls(void 0);
  }, [current_base_id]);
  const [knowledge_views, set_knowledge_views] = useState(void 0);
  const knowledge_view = knowledge_views && knowledge_views[0];
  const is_owner = !!user && user.id === current_base?.owner_user_id;
  useEffect(() => {
    const subscriber = async () => {
      const new_user = supabase.auth.user();
      set_user(new_user);
      set_email(new_user?.email || email);
      const {data, error} = await supabase.from("users").select("*");
      set_postgrest_error(error);
      const map = {};
      (data || []).forEach((pu) => map[pu.id] = pu);
      set_users_by_id(map);
    };
    subscriber();
    supabase_auth_state_change.subscribers.push(subscriber);
    const unsubscribe = () => {
      const {subscribers} = supabase_auth_state_change;
      supabase_auth_state_change.subscribers = subscribers.filter((sub) => sub !== subscriber);
    };
    return unsubscribe;
  }, []);
  async function register() {
    set_async_request_in_progress(true);
    const {user: new_user, error} = await supabase.auth.signUp({email, password});
    set_async_request_in_progress(false);
    set_supabase_session_error(error);
    set_waiting_user_registration_email(true);
  }
  async function sign_in() {
    set_async_request_in_progress(true);
    const {user: user2, error} = await supabase.auth.signIn({email, password});
    set_async_request_in_progress(false);
    set_supabase_session_error(error);
    set_user(user2);
  }
  async function forgot_password() {
    set_async_request_in_progress(true);
    const {data, error} = await supabase.auth.api.resetPasswordForEmail(email);
    set_async_request_in_progress(false);
    set_supabase_session_error(error);
    set_waiting_password_reset_email(!error);
  }
  async function update_password() {
    const email2 = user?.email;
    set_async_request_in_progress(true);
    const result = await supabase.auth.update({email: email2, password});
    set_async_request_in_progress(false);
    set_supabase_session_error(result.error);
    set_user(result.user);
    set_updating_password(!!result.error);
    is_supabase_recovery_email = false;
  }
  async function log_out() {
    set_async_request_in_progress(true);
    const {error} = await supabase.auth.signOut();
    set_async_request_in_progress(false);
    set_supabase_session_error(error);
    set_user(supabase.auth.user());
    set_password("");
  }
  const user_1_id = "d9e6dde1-15e7-4bdf-a6ca-3cc769c131ee";
  const user_2_id = "e21a5c53-3cef-458c-bfaa-68e5d80c70f8";
  if (waiting_password_reset_email)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "Password reset"), /* @__PURE__ */ h("br", null), !supabase_session_error && "Please check your email", /* @__PURE__ */ h(DisplaySupabaseSessionError, {
      error: supabase_session_error
    }));
  if (!user || updating_password)
    return /* @__PURE__ */ h("div", null, updating_password ? "Reset password" : "Signin / Register", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("form", null, /* @__PURE__ */ h("input", {
      type: "email",
      placeholder: "email",
      value: email,
      disabled: updating_password,
      onKeyUp: (e) => set_email(e.currentTarget.value),
      onChange: (e) => set_email(e.currentTarget.value),
      onBlur: (e) => set_email(e.currentTarget.value)
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "password",
      placeholder: "password",
      value: password,
      onKeyUp: (e) => set_password(e.currentTarget.value),
      onChange: (e) => set_password(e.currentTarget.value),
      onBlur: (e) => set_password(e.currentTarget.value)
    }), /* @__PURE__ */ h("br", null)), updating_password && /* @__PURE__ */ h("div", null, async_request_in_progress && /* @__PURE__ */ h(SyncIcon, {
      className: "animate spinning"
    }), /* @__PURE__ */ h("input", {
      type: "button",
      value: "Update password",
      disabled: async_request_in_progress || !user?.email || !password,
      onClick: update_password
    }), /* @__PURE__ */ h("br", null), !is_supabase_recovery_email && /* @__PURE__ */ h("input", {
      type: "button",
      onClick: () => set_updating_password(false),
      value: "Cancel"
    }), /* @__PURE__ */ h("br", null)), !updating_password && /* @__PURE__ */ h("div", null, async_request_in_progress && /* @__PURE__ */ h(SyncIcon, {
      className: "animate spinning"
    }), /* @__PURE__ */ h("input", {
      type: "button",
      value: "Signin",
      disabled: async_request_in_progress || !email || !password,
      onClick: sign_in
    }), /* @__PURE__ */ h("input", {
      type: "button",
      value: "Register",
      disabled: async_request_in_progress || !email || !password,
      onClick: register
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "button",
      value: "Forgot password?",
      disabled: async_request_in_progress || !email,
      onClick: forgot_password
    }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
      error: supabase_session_error
    }));
  if (waiting_user_registration_email)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "Registered"), /* @__PURE__ */ h("br", null), "Please check your email");
  return /* @__PURE__ */ h("div", null, "Logged in with ", user.email, " ", user.id, /* @__PURE__ */ h("br", null), async_request_in_progress && /* @__PURE__ */ h(SyncIcon, {
    className: "animate spinning"
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Log out",
    disabled: async_request_in_progress,
    onClick: log_out
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => set_updating_password(true),
    value: "Change password"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(Username, {
    user,
    users_by_id,
    set_postgrest_error
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
    error: supabase_session_error
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => get_all_bases2({set_postgrest_error, set_bases}),
    value: "Get all bases"
  }), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => get_or_create_an_owned_base({user_id: user.id, set_postgrest_error, set_current_base_id}),
    value: "Get a base (optionally create)"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error: postgrest_error
  }), /* @__PURE__ */ h("h3", null, "Bases"), /* @__PURE__ */ h("br", null), bases && /* @__PURE__ */ h("div", null, bases.length, " bases ", /* @__PURE__ */ h("br", null), bases.map((base) => {
    const {access_level} = base;
    const access_description = access_level === "editor" ? "Editor" : access_level === "viewer" ? "Viewer" : base.public_read ? "Viewer (public access)" : "?";
    return /* @__PURE__ */ h("div", {
      style: {fontWeight: base.id === current_base?.id ? "bold" : void 0}
    }, /* @__PURE__ */ h("input", {
      type: "radio",
      checked: base.id === current_base?.id,
      onClick: () => set_current_base_id(base.id)
    }), "  ", base.public_read ? "Public" : "Private", "   title: ", base.title, "   owned by: ", get_user_name_for_display({users_by_id, current_user_id: user?.id, other_user_id: base.owner_user_id}), "   id: ", base.id, "  ", base.owner_user_id !== user.id && /* @__PURE__ */ h("span", null, "access: ", access_description, "  "));
  })), current_base && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("h3", null, "Base modification"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      const modified_base = {...current_base, title: "Title changed"};
      modify_base_wrapper({base: modified_base, set_postgrest_error, set_bases});
    },
    value: "Modify base (change title)"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      const modified_base = {...current_base, title: "Primary"};
      modify_base_wrapper({base: modified_base, set_postgrest_error, set_bases});
    },
    value: "Modify base (reset title)"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      const modified_base = {...current_base, owner_user_id: user_1_id};
      modify_base_wrapper({base: modified_base, set_postgrest_error, set_bases});
    },
    value: "Modify base (change owner to user_1 -- should FAIL if different user)"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      const modified_base = {...current_base, public_read: !current_base.public_read};
      modify_base_wrapper({base: modified_base, set_postgrest_error, set_bases});
    },
    value: "Modify base (toggle public read)"
  }), /* @__PURE__ */ h("br", null)), current_base && current_base_id && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("h3", null, "Base sharing"), /* @__PURE__ */ h("br", null), current_base.public_read ? "Is PUBLIC" : "Is private (not public)", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => get_access_controls({base_id: current_base_id, set_postgrest_error, set_access_controls}),
    value: "Refresh sharing info"
  }), /* @__PURE__ */ h("br", null), access_controls && /* @__PURE__ */ h("div", null, access_controls.length, " access controls", access_controls.map((ac) => /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(AccessControlEntry, {
    access_control: ac,
    base_id: current_base_id,
    users_by_id,
    current_user_id: user?.id,
    is_owner,
    on_update: (res) => on_update_access_control({base_id: current_base_id, res, set_postgrest_error, set_access_controls})
  }))), /* @__PURE__ */ h("br", null), "Id or email address of user's account:", /* @__PURE__ */ h(AddAccessControlEntry, {
    base_id: current_base_id,
    on_add_or_exit: (stale_access_controls) => {
      if (!stale_access_controls)
        return;
      get_access_controls({
        base_id: current_base_id,
        set_postgrest_error,
        set_access_controls
      });
    }
  }))), current_base_id !== void 0 && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("h3", null, "Knowledge Views"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: async () => {
      const {error, items} = await supabase_get_knowledge_views({
        supabase,
        base_id: current_base_id
      });
      set_postgrest_error(error || null);
      set_knowledge_views(items);
    },
    value: `Get knowledge views for base ${current_base_id}`
  }), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: async () => {
      const {error, items} = await supabase_get_knowledge_views({
        supabase,
        all_bases: true
      });
      set_postgrest_error(error || null);
      set_knowledge_views(items);
    },
    value: `Get all knowledge views`
  }), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => create_knowledge_views({base_id: current_base_id, set_postgrest_error, set_knowledge_views}),
    value: `Create knowledge view in base ${current_base_id}`
  })), knowledge_views && /* @__PURE__ */ h("div", null, knowledge_views.length, " knowledge views", knowledge_views.map((kv) => /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("b", null, "base_id"), ": ", kv.base_id, "  ", /* @__PURE__ */ h("b", null, "id"), ": ", kv.id, "  ", /* @__PURE__ */ h("b", null, "title"), ": ", kv.title, "  ", /* @__PURE__ */ h("b", null, "description"), ": ", kv.description, "  ", /* @__PURE__ */ h("b", null, "wc_id_map ids"), ": ", JSON.stringify(Object.keys(kv.wc_id_map || {})), "  ", /* @__PURE__ */ h("b", null, "json"), ": ", JSON.stringify({...kv, base_id: void 0, id: void 0, title: void 0, description: void 0}), "  ", /* @__PURE__ */ h("hr", null)))), knowledge_views && knowledge_view && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => modify_knowledge_view({
      knowledge_view,
      current_knowledge_views: knowledge_views,
      set_postgrest_error,
      set_knowledge_views
    }),
    value: "Modify a knowledge view (set random title) then fetch all for all bases"
  })));
}
function Username(props) {
  const [username, set_username] = useState("");
  const [is_saving, set_is_saving] = useState(false);
  const {user, users_by_id, set_postgrest_error} = props;
  const name_in_db = users_by_id[user.id]?.name || "";
  useEffect(() => {
    if (username !== name_in_db)
      set_username(name_in_db);
  }, [name_in_db]);
  async function update_username(name) {
    set_is_saving(true);
    const {id} = user;
    const {data, error} = await supabase.from("users").upsert({id, name}).eq("id", id);
    set_postgrest_error(error);
    set_username(data && data[0]?.name || "");
    set_is_saving(false);
  }
  return /* @__PURE__ */ h("div", null, is_saving ? "Saving" : "Your", " user name:", /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "username",
    value: username,
    disabled: is_saving,
    onKeyUp: (e) => set_username(e.currentTarget.value),
    onChange: (e) => set_username(e.currentTarget.value),
    onBlur: async (e) => {
      set_username(e.currentTarget.value);
      update_username(e.currentTarget.value);
    }
  }), /* @__PURE__ */ h("br", null));
}
async function get_or_create_an_owned_base(args) {
  const {base, error: postgrest_error} = await get_an_owned_base_optionally_create(args.user_id);
  args.set_postgrest_error(postgrest_error);
  args.set_current_base_id(base?.id);
}
async function get_an_owned_base_optionally_create(user_id) {
  const first_get_result = await get_an_owned_base(user_id);
  if (first_get_result.error)
    return first_get_result;
  if (first_get_result.base)
    return first_get_result;
  const res = await create_a_base({owner_user_id: user_id});
  if (res.error)
    return res;
  return await get_an_owned_base(user_id);
}
async function get_an_owned_base(user_id) {
  const supabase2 = get_supabase();
  const {data: knowledge_bases, error} = await supabase2.from("bases").select("*").eq("owner_user_id", user_id).order("inserted_at", {ascending: true});
  const base = knowledge_bases && knowledge_bases[0] || void 0;
  return {base, error};
}
async function get_all_bases2(args) {
  const res = await get_all_bases();
  args.set_postgrest_error(res.error);
  args.set_bases(res.data);
}
async function modify_base_wrapper(args) {
  const {base, set_postgrest_error, set_bases} = args;
  const res = await modify_base(base);
  set_postgrest_error(res.error);
  if (!res.error)
    await get_all_bases2({set_postgrest_error, set_bases});
}
async function get_access_controls(args) {
  const res = await get_access_controls_for_base(args.base_id);
  args.set_postgrest_error(res.error);
  args.set_access_controls(res.access_controls);
}
async function on_update_access_control(args) {
  args.set_postgrest_error(args.res.error);
  if (!args.res.error)
    await get_access_controls(args);
}
async function create_knowledge_views(args) {
  const default_data = generate_default_data(args.base_id);
  const a_knowledge_view = default_data.knowledge_views[0];
  const {data, error} = await supabase.from("knowledge_views").insert(knowledge_view_app_to_supabase(a_knowledge_view, args.base_id));
  args.set_postgrest_error(error);
  const knowledge_views = (data || []).map(knowledge_view_supabase_to_app);
  args.set_knowledge_views(knowledge_views);
}
async function modify_knowledge_view(args) {
  const {knowledge_view, current_knowledge_views, set_postgrest_error, set_knowledge_views} = args;
  const modified_kv = {...knowledge_view, title: "Some new title " + Math.random()};
  const db_kv = knowledge_view_app_to_supabase(modified_kv);
  const result = await supabase.rpc("update_knowledge_view", {item: db_kv});
  let error = result.error;
  if (result.status === 404)
    error = {message: "Not Found", details: "", hint: "", code: "404"};
  set_postgrest_error(error);
  if (error)
    return;
  const new_supabase_kv = result.data;
  if (!new_supabase_kv)
    return;
  const new_kv = knowledge_view_supabase_to_app(new_supabase_kv);
  const updated_knowledge_views = replace_element(current_knowledge_views, new_kv, (kv) => kv.id === knowledge_view.id);
  set_knowledge_views(updated_knowledge_views);
}
function generate_default_data(base_id) {
  const wc1 = prepare_new_contextless_wcomponent_object({base_id, title: "wc1"});
  const wcomponents = [wc1];
  const kv1 = get_new_knowledge_view_object({
    id: uuid_v4(),
    base_id,
    title: "kv1",
    wc_id_map: {
      [wc1.id]: {left: 0, top: 0}
    }
  });
  const knowledge_views = [kv1];
  return {knowledge_views, wcomponents};
}
