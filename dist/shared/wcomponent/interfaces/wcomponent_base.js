const _wcomponent_types = {
  event: true,
  state: true,
  statev2: true,
  sub_state: true,
  process: true,
  action: true,
  actor: true,
  causal_link: true,
  relation_link: true,
  judgement: true,
  objective: true,
  counterfactual: true,
  counterfactualv2: true,
  goal: true,
  prioritisation: true
};
export const wcomponent_types = Object.keys(_wcomponent_types).sort();
