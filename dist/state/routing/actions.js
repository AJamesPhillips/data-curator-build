const change_route_type = "change_route";
const change_route = (routing_params) => {
  const args = routing_params.args;
  if (args) {
    args.x = round_position(args.x);
    args.y = round_position(args.y);
    args.zoom = round_position(args.zoom);
  }
  return {type: change_route_type, ...routing_params};
};
function round_position(position) {
  if (position === void 0)
    return position;
  return Math.round(position);
}
export const is_change_route = (action) => {
  return action.type === change_route_type;
};
export const routing_actions = {
  change_route
};
