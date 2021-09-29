import {IconButton, makeStyles, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import FilterIcon from "../../snowpack/pkg/@material-ui/icons/Filter.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
const map_state = (state) => ({
  created_at_ms: state.routing.args.created_at_ms,
  current_composed_knowledge_view: get_current_composed_knowledge_view_from_state(state),
  wcomponents: state.derived.wcomponents
});
const connector = connect(map_state);
function _ActiveCreatedAtFilterWarning(props) {
  const {current_composed_knowledge_view, wcomponents} = props;
  if (!current_composed_knowledge_view)
    return null;
  const wcomponents_on_kv = useMemo(() => wcomponents.filter((wc) => !!current_composed_knowledge_view.composed_wc_id_map[wc.id]).filter((wc) => wc.type !== "counterfactual"), [wcomponents, current_composed_knowledge_view]);
  const components_excluded_by_created_at_datetime_filter = useMemo(() => wcomponents_on_kv.filter((kv) => get_created_at_ms(kv) > props.created_at_ms).length, [wcomponents_on_kv, props.created_at_ms]);
  const classes = use_styles();
  return components_excluded_by_created_at_datetime_filter > 0 && /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: `WARNING: ${components_excluded_by_created_at_datetime_filter} components are invisible due to created at datetime filter!`
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    disableRipple: true,
    disableElevation: true,
    size: "small"
  }, /* @__PURE__ */ h(FilterIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveCreatedAtFilterWarning = connector(_ActiveCreatedAtFilterWarning);
const use_styles = makeStyles((theme) => ({
  warning_button: {cursor: "help"},
  warning_icon: {color: theme.palette.warning.main}
}));
