import {h} from "../../_snowpack/pkg/preact.js";
import {JudgementBadgeConnected} from "../knowledge/judgements/JudgementBadgeConnected.js";
import {
  wcomponent_is_judgement_or_objective
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
    const limit = 150;
    let limited_title = title.slice(0, limit);
    let limited_subtitle = wcomponent.title.slice(0, limit);
    if (limited_title.length !== title.length)
      limited_title += "...";
    if (limited_subtitle.length !== wcomponent.title.length)
      limited_subtitle += "...";
    limited_subtitle += `-- @@${wcomponent.id}`;
    let jsx = void 0;
    if (wcomponent_is_judgement_or_objective(wcomponent)) {
      jsx = /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(JudgementBadgeConnected, {
        judgement_or_objective_id: wcomponent.id
      }), title);
    }
    return {
      id: wcomponent.id,
      title: limited_title,
      jsx,
      subtitle: limited_subtitle,
      color: wcomponent.label_color
    };
  });
  return options;
}
