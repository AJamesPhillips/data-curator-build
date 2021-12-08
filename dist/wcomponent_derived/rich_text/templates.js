export const format_wcomponent_id_error = (root_url, id, error) => `✗${format_wcomponent_link(root_url, id, id)} (${error})`;
export const format_wcomponent_url = (root_url, id) => `${root_url}#wcomponents/${id}`;
export const format_wcomponent_link = (root_url, id, content = "□") => `[${content}](${format_wcomponent_url(root_url, id)})`;
