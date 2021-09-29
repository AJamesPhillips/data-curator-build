import {createClient} from "../../snowpack/pkg/@supabase/supabase-js.js";
let supabase;
export function get_supabase() {
  if (supabase)
    return supabase;
  const supabase_url = "https://sfkgqscbwofiphfxhnxg.supabase.co";
  const SUPABASE_ANONYMOUS_CLIENT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjA2MTkwNSwiZXhwIjoxOTQ3NjM3OTA1fQ.or3FBQDa4CtAA8w7XQtYl_3NTmtFFYPWoafolOpPKgA";
  supabase = createClient(supabase_url, SUPABASE_ANONYMOUS_CLIENT_KEY, {autoRefreshToken: true});
  return supabase;
}
