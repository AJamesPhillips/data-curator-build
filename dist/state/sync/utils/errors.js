export function error_to_string(error) {
  if (error && "type" in error && typeof error.type === "string") {
    return error.type + ": " + (error.message || "<no message>");
  }
  return `${error}`;
}
