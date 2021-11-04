import {get_supabase} from "./get_supabase.js";
export async function get_all_bases(user_id) {
  const supabase = get_supabase();
  const res = await supabase.from("bases").select("*, access_controls(access_level)").order("inserted_at", {ascending: true});
  const data = !res.data ? void 0 : res.data.map((r) => {
    return base_supabase_to_app(r, r.access_controls, user_id);
  });
  return {error: res.error, data};
}
export async function create_a_base(args) {
  const {owner_user_id, title = "Primary"} = args;
  const supabase = get_supabase();
  const res = await supabase.from("bases").insert({owner_user_id, title});
  const base = res.data && res.data[0] || void 0;
  return {base, error: res.error};
}
function santise_base(base) {
  const santised_base = {
    id: base.id,
    inserted_at: base.inserted_at,
    updated_at: base.updated_at,
    owner_user_id: base.owner_user_id,
    public_read: base.public_read,
    title: base.title
  };
  return santised_base;
}
function base_supabase_to_app(base, access_controls, user_id) {
  let {inserted_at, updated_at, owner_user_id, public_read} = base;
  inserted_at = new Date(inserted_at);
  updated_at = new Date(updated_at);
  const access_control = access_controls && access_controls[0];
  const access_level = access_control?.access_level || (user_id === owner_user_id ? "owner" : public_read ? "viewer" : "none");
  return {...santise_base(base), inserted_at, updated_at, access_level};
}
export async function modify_base(base) {
  const santised_base = santise_base(base);
  const supabase = get_supabase();
  const res = await supabase.from("bases").update(santised_base).eq("id", santised_base.id);
  return res;
}
