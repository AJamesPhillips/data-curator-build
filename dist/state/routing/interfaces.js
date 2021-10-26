export const ALLOWED_SUB_ROUTES = {
  views: [],
  wcomponents: ["wcomponents_edit_multiple"],
  search: [],
  filter: [],
  display: [],
  statements: [],
  objects: ["objects_bulk_import", "objects_bulk_import/setup"],
  patterns: [],
  creation_context: [],
  perceptions: [],
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
const ALLOWED_ROUTE_ARG_KEYS = [
  "view",
  "subview_id",
  "zoom",
  "x",
  "y",
  "storage_location",
  "order",
  "rotation",
  "cdate",
  "ctime",
  "sdate",
  "stime"
];
