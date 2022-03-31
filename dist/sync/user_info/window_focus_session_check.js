import {ACTIONS} from "../../state/actions.js";
import {save_and_optionally_signout} from "../../state/user_info/signout.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {register_window_on_focus_listener} from "../../utils/window_on_focus_listener.js";
let registered = false;
export function register_window_focus_session_check(store) {
  if (registered) {
    console.error("Already run register_window_focus_session_check");
    return;
  }
  registered = true;
  register_window_on_focus_listener(() => check_and_handle_connection_and_session(store));
}
export async function check_and_handle_connection_and_session(store) {
  if (!store.load_state_from_storage)
    return;
  const supabase = get_supabase();
  const result = await check_connection_and_session(store, supabase);
  handle_connection_and_session_check_result(result, store);
}
var CheckConnectionAndSessionResult;
(function(CheckConnectionAndSessionResult2) {
  CheckConnectionAndSessionResult2[CheckConnectionAndSessionResult2["no_user"] = 0] = "no_user";
  CheckConnectionAndSessionResult2[CheckConnectionAndSessionResult2["not_signed_in"] = 1] = "not_signed_in";
  CheckConnectionAndSessionResult2[CheckConnectionAndSessionResult2["no_network_connection"] = 2] = "no_network_connection";
  CheckConnectionAndSessionResult2[CheckConnectionAndSessionResult2["unexpected_error"] = 3] = "unexpected_error";
  CheckConnectionAndSessionResult2[CheckConnectionAndSessionResult2["success"] = 4] = "success";
})(CheckConnectionAndSessionResult || (CheckConnectionAndSessionResult = {}));
async function check_connection_and_session(store, supabase) {
  if (!store.getState().user_info.user) {
    console.log("User not signed in once yet.");
    return 0;
  }
  try {
    const response = await supabase.auth.update({});
    if (response.error?.message === "Not logged in." || response.error?.status === 401) {
      return 1;
    } else if (response.error?.message === "Network request failed") {
      console.log("Network error");
      return 2;
    } else if (response.error) {
      debugger;
      console.log("Unexpected error whilst check_connection_and_session", response.error);
      return 3;
    } else {
      return 4;
    }
  } catch (err) {
    console.error("Unexpected exception whilst check_connection_and_session", err);
    return 3;
  }
}
function handle_connection_and_session_check_result(result, store) {
  if (result === 0) {
    return;
  } else if (result === 1) {
    console.log("User not logged in.  Reloading page.");
    window.location.reload();
    return;
  } else if (result === 3) {
    save_and_optionally_signout(false);
    return;
  }
  let network_functional = true;
  if (result === 2) {
    network_functional = false;
  } else if (result === 4) {
  }
  store.dispatch(ACTIONS.sync.update_network_status({network_functional, last_checked: new Date()}));
}
