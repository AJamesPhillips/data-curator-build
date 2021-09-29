import {get_supabase} from "./get_supabase.js";
export async function get_access_controls_for_base(base_id) {
  const supabase = get_supabase();
  const {data, error} = await supabase.from("access_controls").select("*").eq("base_id", base_id);
  const access_controls = data && data.map((ac) => ({
    ...ac,
    inserted_at: new Date(ac.inserted_at),
    updated_at: new Date(ac.updated_at)
  })) || void 0;
  return {access_controls, error};
}
export async function update_access_control(args) {
  const access_control = {
    base_id: args.base_id,
    user_id: args.other_user_id,
    access_level: args.grant
  };
  const supabase = get_supabase();
  const res = await supabase.from("access_controls").upsert(access_control);
  return res;
}
