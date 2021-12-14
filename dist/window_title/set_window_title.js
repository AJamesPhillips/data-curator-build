import {APP_DETAILS} from "../shared/constants.js";
const title_el = document.getElementsByTagName("title")[0];
export function set_window_title(title) {
  if (!title_el)
    return;
  title_el.innerHTML = title || APP_DETAILS.NAME;
}
