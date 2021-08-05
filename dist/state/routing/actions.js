const change_route_type = "change_route";
const change_route = (routing_params) => {
  return {type: change_route_type, ...routing_params};
};
export const is_change_route = (action) => {
  return action.type === change_route_type;
};
export const routing_actions = {
  change_route
};
