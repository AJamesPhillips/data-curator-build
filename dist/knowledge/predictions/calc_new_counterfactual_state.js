import {test} from "../../shared/utils/test.js";
export function calc_new_counterfactual_state(args) {
  let new_counterfactual_probability = void 0;
  let new_counterfactual_conviction = void 0;
  const {conviction, probability, counterfactual_conviction, counterfactual_probability} = args;
  const counterfactual_inactive = counterfactual_probability === void 0 && counterfactual_conviction === void 0;
  if (conviction !== 1) {
    new_counterfactual_conviction = 1;
  }
  if (counterfactual_inactive && (probability === 1 && conviction !== 1 || probability !== 1)) {
    new_counterfactual_probability = 1;
  } else if (counterfactual_probability !== 0 && (probability === 0 && conviction !== 1 || probability !== 0)) {
    new_counterfactual_probability = 0;
  } else {
    new_counterfactual_probability = void 0;
    new_counterfactual_conviction = void 0;
  }
  return {new_counterfactual_probability, new_counterfactual_conviction};
}
function run_tests() {
  console.log("running tests of calc_new_counterfactual_state");
  let probability;
  let conviction;
  let expected_new_counterfactual_probability;
  let expected_new_counterfactual_conviction;
  let result;
  probability = 1;
  conviction = 1;
  probability = 0.5;
  conviction = 1;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 1;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, void 0);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 0;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, void 0);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: void 0
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
  probability = 1;
  conviction = 1;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 0;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, void 0);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: void 0
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
  probability = 0;
  conviction = 1;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 1;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, void 0);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: void 0
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
  probability = 0.5;
  conviction = 0.5;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 1;
  expected_new_counterfactual_conviction = 1;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  expected_new_counterfactual_probability = 0;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
  probability = 1;
  conviction = 0.5;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 1;
  expected_new_counterfactual_conviction = 1;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  expected_new_counterfactual_probability = 0;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
  probability = 0;
  conviction = 0.5;
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: void 0,
    counterfactual_conviction: void 0
  });
  expected_new_counterfactual_probability = 1;
  expected_new_counterfactual_conviction = 1;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  expected_new_counterfactual_probability = 0;
  test(result.new_counterfactual_probability, expected_new_counterfactual_probability);
  test(result.new_counterfactual_conviction, expected_new_counterfactual_conviction);
  result = calc_new_counterfactual_state({
    probability,
    conviction,
    counterfactual_probability: expected_new_counterfactual_probability,
    counterfactual_conviction: expected_new_counterfactual_conviction
  });
  test(result.new_counterfactual_probability, void 0);
  test(result.new_counterfactual_conviction, void 0);
}
