import {h} from "../../snowpack/pkg/preact.js";
import {JudgementBadgeConnected} from "../sharedf/judgement_badge/JudgementBadgeConnected.js";
import {
  wcomponent_is_judgement_or_objective,
  wcomponent_is_plain_connection
} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
export function get_wcomponent_search_options(args) {
  const {wcomponents: wcs, allowed_wcomponent_ids, wcomponents_by_id, wc_id_to_counterfactuals_map, created_at_ms, sim_ms} = args;
  let wcomponents = wcs || Object.values(wcomponents_by_id);
  if (allowed_wcomponent_ids)
    wcomponents = wcomponents.filter(({id}) => allowed_wcomponent_ids.has(id));
  const options = wcomponents.filter((wc) => !wc.deleted_at).map((wcomponent) => {
    const title = get_title({
      wcomponent,
      rich_text: true,
      render_links: false,
      wcomponents_by_id,
      wc_id_to_counterfactuals_map,
      created_at_ms,
      sim_ms
    });
    let subtitle = `@@${wcomponent.id} -- ${wcomponent.title} -- ${wcomponent.description}`;
    if (wcomponent_is_plain_connection(wcomponent)) {
      subtitle += ` -- @@${wcomponent.from_id} -> @@${wcomponent.to_id}`;
    }
    let jsx = void 0;
    if (wcomponent_is_judgement_or_objective(wcomponent)) {
      jsx = /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(JudgementBadgeConnected, {
        judgement_or_objective_id: wcomponent.id
      }), title);
    }
    return {
      id: wcomponent.id,
      title,
      jsx,
      raw_title: wcomponent.title,
      subtitle,
      color: wcomponent.label_color
    };
  });
  return options;
}
