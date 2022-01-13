const _judgement_operators = {
  "==": true,
  "!=": true,
  "<": true,
  "<=": true,
  ">": true,
  ">=": true
};
export const judgement_operators = Object.keys(_judgement_operators);
const _judgement_trends = {
  improving: true,
  worsening: true,
  stable: true,
  unknown: true,
  not_assessed: true
};
export const judgement_trends = Object.keys(_judgement_trends);
