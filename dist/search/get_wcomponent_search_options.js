import {h} from "../../snowpack/pkg/preact.js";
import {JudgementBadgeConnected} from "../knowledge/judgements/JudgementBadgeConnected.js";
import {
  wcomponent_is_judgement_or_objective,
  wcomponent_is_plain_connection
} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_title} from "../shared/wcomponent/rich_text/get_rich_text.js";
export function get_wcomponent_search_options(args) {
  const {wcomponents: wcs, wcomponents_by_id, wc_id_counterfactuals_map, created_at_ms, sim_ms} = args;
  const wcomponents = wcs || Object.values(wcomponents_by_id);
  const options = wcomponents.map((wcomponent) => {
    const title = get_title({
      wcomponent,
      rich_text: true,
      render_links: false,
      wcomponents_by_id,
      wc_id_counterfactuals_map,
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
