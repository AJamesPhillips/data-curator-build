import {sentence_case} from "../shared/utils/sentence_case.js";
export function route_to_text(route) {
  if (route === "wcomponents")
    return "Components";
  else if (route === "display")
    return "Display Options";
  else if (route === "select")
    return "Selection";
  else
    return sentence_case(route.replaceAll("_", " "));
}
