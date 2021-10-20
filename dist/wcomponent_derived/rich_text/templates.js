export const format_wcomponent_id_error = (error, str) => `✗@@${str} (${error})`;
export const format_wcomponent_url = (root_url, id) => `${root_url}#wcomponents/${id}&view=knowledge`;
export const format_wcomponent_link = (root_url, id, content = "□") => `[${content}](${format_wcomponent_url(root_url, id)})`;
