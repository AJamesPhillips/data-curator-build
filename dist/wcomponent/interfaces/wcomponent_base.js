const _wcomponent_types = {
  event: true,
  statev2: true,
  state_value: true,
  sub_state: true,
  multidimensional_state: true,
  process: true,
  action: true,
  actor: true,
  causal_link: true,
  relation_link: true,
  judgement: true,
  objective: true,
  counterfactualv2: true,
  goal: true,
  prioritisation: true
};
export const wcomponent_types = Object.keys(_wcomponent_types).sort().filter((type) => type !== "multidimensional_state");
