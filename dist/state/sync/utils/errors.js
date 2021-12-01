export function error_to_string(error) {
  if (error) {
    if ("type" in error && typeof error.type === "string") {
      return error.type + ": " + (error.message || "<no message>");
    } else if (`${error}`.includes("[object")) {
      return JSON.stringify(error);
    }
  }
  return `${error}`;
}
