import {date2str} from "../../shared/utils/date_helpers.js";
import {
  ALLOWED_ROUTES,
  ALLOWED_SUB_ROUTES,
  is_routing_view_types
} from "./interfaces.js";
import {routing_arg_datetime_strings_to_datetime} from "./datetime/routing_datetime.js";
import {test} from "../../shared/utils/test.js";
export function routing_state_to_string(args) {
  const sub_route = args.sub_route ? `${args.sub_route}/` : "";
  const element_route = args.item_id ? `${args.item_id}/` : "";
  const routing_args = args.args || {};
  const routing_args_str = routing_args_to_string(routing_args);
  return "#" + args.route + "/" + sub_route + element_route + routing_args_str;
}
const exclude_routing_keys = new Set([
  "order",
  "rotation",
  "created_at_datetime",
  "created_at_ms",
  "sim_datetime",
  "sim_ms"
]);
export function routing_args_to_string(routing_args) {
  const data = {
    ...routing_args,
    cdate: date2str(routing_args.created_at_datetime, "yyyy-MM-dd"),
    ctime: date2str(routing_args.created_at_datetime, "hh:mm:ss"),
    sdate: date2str(routing_args.sim_datetime, "yyyy-MM-dd"),
    stime: date2str(routing_args.sim_datetime, "hh:mm:ss")
  };
  const routing_args_str = Object.keys(routing_args).filter((k) => !exclude_routing_keys.has(k)).sort().concat(["sdate", "stime", "cdate", "ctime"]).map((key) => `&${key}=${data[key] ?? ""}`).join("");
  return routing_args_str;
}
export function merge_route_params_prioritising_url_over_state(url, routing_state) {
  const hash = url.split("#")[1] || "";
  const main_parts = hash.split("&");
  const path = main_parts[0];
  const path_parts = path.split("/").filter((p) => !!p);
  const {route, sub_route, item_id} = get_route_subroute_and_item_id(path_parts);
  const args_from_url = main_parts.slice(1);
  const args = update_args_from_url(routing_state.args, args_from_url);
  return {route, sub_route, item_id, args};
}
function get_route_subroute_and_item_id(path_parts) {
  let route = path_parts[0];
  let sub_route = null;
  let item_id = null;
  if (!ALLOWED_ROUTES.includes(route)) {
    route = "wcomponents";
  } else {
    const part2 = path_parts.slice(1).join("/") || null;
    if (ALLOWED_SUB_ROUTES[route].includes(part2))
      sub_route = part2;
    else
      item_id = part2;
  }
  return {route, sub_route, item_id};
}
function update_args_from_url(args, args_from_url) {
  args = {...args};
  let cdate = null;
  let ctime = null;
  let sdate = null;
  let stime = null;
  args_from_url.forEach((part) => {
    const [key, value] = part.split("=");
    if (key === "cdate")
      cdate = value;
    else if (key === "ctime")
      ctime = value;
    else if (key === "sdate")
      sdate = value;
    else if (key === "stime")
      stime = value;
    else
      update_args_with_value(args, key, value);
  });
  args.created_at_datetime = routing_arg_datetime_strings_to_datetime(cdate, ctime);
  args.sim_datetime = sdate ? routing_arg_datetime_strings_to_datetime(sdate, stime) : args.created_at_datetime;
  args.created_at_ms = args.created_at_datetime.getTime();
  args.sim_ms = args.sim_datetime.getTime();
  return args;
}
function update_args_with_value(args, key, value) {
  if (key === "view") {
    if (is_routing_view_types(value))
      args.view = value;
  } else if (routing_arg_is_a_number(key))
    args[key] = parseInt(value);
  else if (key === "subview_id")
    args.subview_id = value;
  else if (key === "storage_location")
    args.storage_location = parse_int_or_undefined(value);
}
const ROUTING_ARGS_WHICH_ARE_NUMBERS = new Set(["x", "y", "zoom"]);
function routing_arg_is_a_number(key) {
  return ROUTING_ARGS_WHICH_ARE_NUMBERS.has(key);
}
function parse_int_or_undefined(val) {
  const int = parseInt(val);
  return Number.isNaN(int) ? void 0 : int;
}
function run_tests() {
  console.log("running tests of routing_state_to_string");
  let state;
  let result;
  state = {
    route: "wcomponents",
    sub_route: null,
    item_id: "wc88",
    args: {
      view: "knowledge",
      subview_id: "kv77",
      zoom: 100,
      x: 101,
      y: 158,
      storage_location: void 0,
      created_at_datetime: new Date("2020-10-21T17:04:24.000Z"),
      created_at_ms: 1603299864e3,
      sim_datetime: new Date("2021-04-26T09:23:13.000Z"),
      sim_ms: 1619428993e3
    }
  };
  result = routing_state_to_string(state);
  test(result, "#wcomponents/wc88/&zoom=100&y=158&x=101&view=knowledge&subview_id=kv77&sdate=2021-04-26&stime=10:23:13&cdate=2020-10-21&ctime=18:04:24");
}
