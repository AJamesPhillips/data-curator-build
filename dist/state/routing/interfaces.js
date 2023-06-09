export const ALLOWED_SUB_ROUTES = {
  views: [],
  wcomponents: ["wcomponents_edit_multiple"],
  search: [],
  filter: [],
  select: [],
  display: [],
  statements: [],
  objects: ["objects_bulk_import", "objects_bulk_import/setup"],
  patterns: [],
  creation_context: [],
  about: []
};
export const ALLOWED_ROUTES = Object.keys(ALLOWED_SUB_ROUTES);
const _view_types = {
  priorities: true,
  priorities_list: true,
  actions_list: true,
  knowledge: true,
  objectives: true
};
const routing_view_types = Object.keys(_view_types);
export const is_routing_view_types = (str) => routing_view_types.includes(str);
export const ALLOWED_ROUTE_ARGS = {
  view: true,
  subview_id: true,
  zoom: true,
  x: true,
  y: true,
  storage_location: true,
  cdate: true,
  ctime: true,
  sdate: true,
  stime: true
};
export const ALLOWED_ROUTE_ARGS_COUNT = Object.keys(ALLOWED_ROUTE_ARGS).length;
