import {h} from "../../../snowpack/pkg/preact.js";
export function DisplaySupabaseSessionError(props) {
  const {error} = props;
  if (error === null)
    return null;
  const already_registered = error?.message.includes("Thanks for registering") && error?.status === 400;
  if (already_registered)
    return /* @__PURE__ */ h("div", null, "Please check your email");
  return /* @__PURE__ */ h("div", null, "Error : ", error.message || error);
}
export function DisplaySupabasePostgrestError(props) {
  const {error} = props;
  if (!error)
    return null;
  const message_value = error.message || error || "An error occured";
  let message_string = `${message_value}`;
  if (message_string === "[object Object]")
    message_string = JSON.stringify(message_value);
  return /* @__PURE__ */ h("div", null, "Error: ", message_string);
}
