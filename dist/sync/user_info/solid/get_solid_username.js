import {
  getIri,
  getSolidDataset,
  getThing,
  getStringNoLocale
} from "../../../../snowpack/pkg/@inrupt/solid-client.js";
import {getDefaultSession} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
const empty = {user_name: "", default_solid_pod_URL: ""};
export async function get_solid_users_name_and_pod_URL() {
  const session = getDefaultSession();
  const web_id = session.info.webId;
  if (!session.info.isLoggedIn || !web_id)
    return empty;
  const profile_document_url = new URL(web_id);
  profile_document_url.hash = "";
  const user_profile_dataset = await getSolidDataset(profile_document_url.href, {
    fetch: session.fetch
  });
  const profile = getThing(user_profile_dataset, web_id);
  if (!profile)
    return empty;
  let user_name = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#fn") || "";
  if (!user_name) {
    user_name = getStringNoLocale(profile, "http://xmlns.com/foaf/0.1/name") || "";
  }
  const default_solid_pod_URL = getIri(profile, "http://www.w3.org/ns/pim/space#storage") || "";
  return {
    user_name,
    default_solid_pod_URL
  };
}
