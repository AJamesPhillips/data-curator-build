import {h} from "../../snowpack/pkg/preact.js";
import {useMemo, useState} from "../../snowpack/pkg/preact/hooks.js";
import {Button} from "../sharedf/Button.js";
import {calculate_composed_knowledge_view} from "../state/specialised_objects/knowledge_views/knowledge_views_derived_reducer.js";
import {get_wcomponent_state_value_and_probabilities} from "../wcomponent_derived/get_wcomponent_state_value.js";
import {ScenarioGroupRunResultComponent} from "./ScenarioGroupRunResult.js";
import {beer_game_simulator} from "./simulators.js";
import "./SimulationScenarioSummary.css.proxy.js";
import {upsert_entry} from "../utils/list.js";
export function SimulationScenarioSummary(props) {
  const {scenario_kv_id, knowledge_views_by_id, wcomponents_by_id, created_at_ms, sim_ms} = props;
  const scenario_kv = knowledge_views_by_id[scenario_kv_id];
  const [scenario_group_run_results, set_scenario_group_run_results] = useState([]);
  const upsert_scenario_group_run_results = (scenario_group_run_result) => {
    const new_scenario_group_run_results = upsert_entry(scenario_group_run_results, scenario_group_run_result, (s) => s.id === scenario_group_run_result.id);
    set_scenario_group_run_results(new_scenario_group_run_results);
  };
  if (!scenario_kv)
    return /* @__PURE__ */ h("div", null, "Unknown scenario knowledge view for id: ", scenario_kv_id);
  const composed_kv = useMemo(() => calculate_composed_knowledge_view({
    knowledge_view: scenario_kv,
    knowledge_views_by_id,
    wcomponents_by_id
  }), [scenario_kv, knowledge_views_by_id, wcomponents_by_id]);
  const get_attribute_args = {
    attribute_to_wc_id_map: props.simulation.attribute_to_wc_id_map,
    wcomponents_by_id,
    composed_kv,
    created_at_ms,
    sim_ms
  };
  const consumers_initial_demand = get_attribute_initial_number("consumers_initial_demand", get_attribute_args);
  const consumers_demand_increase_delay_days = get_attribute_initial_number("consumers_demand_increase_delay_days", get_attribute_args);
  const consumers_increased_demand = get_attribute_initial_number("consumers_increased_demand", get_attribute_args);
  if (!consumers_initial_demand)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing consumers_initial_demand attribute");
  if (!consumers_demand_increase_delay_days)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing consumers_demand_increase_delay_days attribute");
  if (!consumers_increased_demand)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing consumers_increased_demand attribute");
  const retailer_initial_price = get_attribute_initial_number("retailer_initial_price", get_attribute_args);
  const retailer_initial_balance = get_attribute_initial_number("retailer_initial_balance", get_attribute_args);
  const retailer_initial_stock = get_attribute_initial_number("retailer_initial_stock", get_attribute_args);
  const retailer_storage = get_attribute_initial_number("retailer_storage", get_attribute_args);
  if (!retailer_initial_price)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing retailer_initial_price attribute");
  if (!retailer_initial_balance)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing retailer_initial_balance attribute");
  if (!retailer_initial_stock)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing retailer_initial_stock attribute");
  if (!retailer_storage)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing retailer_storage attribute");
  const wholesaler_initial_price = get_attribute_initial_number("wholesaler_initial_price", get_attribute_args);
  if (!wholesaler_initial_price)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing wholesaler_initial_price attribute");
  const distributor_initial_price = get_attribute_initial_number("distributor_initial_price", get_attribute_args);
  if (!distributor_initial_price)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing distributor_initial_price attribute");
  const manufacturer_initial_price = get_attribute_initial_number("manufacturer_initial_price", get_attribute_args);
  const manufacturing_delay_in_days = get_attribute_initial_number("manufacturing_delay_in_days", get_attribute_args);
  if (!manufacturer_initial_price)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing manufacturer_initial_price attribute");
  if (!manufacturing_delay_in_days)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing manufacturing_delay_in_days attribute");
  const demand_signal_multiplier = get_attribute_initial_number("demand_signal_multiplier", get_attribute_args);
  if (!demand_signal_multiplier)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing demand_signal_multiplier attribute");
  const days_between_stock_take = get_attribute_initial_number("days_between_stock_take", get_attribute_args);
  if (!days_between_stock_take)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing days_between_stock_take attribute");
  const transport_time_in_days = get_attribute_initial_number("transport_time_in_days", get_attribute_args);
  if (!transport_time_in_days)
    return /* @__PURE__ */ h("div", null, scenario_kv.title, " missing transport_time_in_days attribute");
  const scenario_group_args = {
    total_to_run: 1,
    max_sim_time_seconds: 3600 * 24 * 365
  };
  const beer_game_args = {
    consumers_initial_demand: consumers_initial_demand.parsed_value,
    consumers_demand_increase_delay_days: consumers_demand_increase_delay_days.parsed_value,
    consumers_increased_demand: consumers_increased_demand.parsed_value,
    retailer_initial_price: retailer_initial_price.parsed_value,
    retailer_initial_balance: retailer_initial_balance.parsed_value,
    retailer_initial_stock: retailer_initial_stock.parsed_value,
    retailer_storage: retailer_storage.parsed_value,
    wholesaler_initial_price: wholesaler_initial_price.parsed_value,
    distributor_initial_price: distributor_initial_price.parsed_value,
    manufacturer_initial_price: manufacturer_initial_price.parsed_value,
    manufacturing_delay_in_days: manufacturing_delay_in_days.parsed_value,
    demand_signal_multiplier: demand_signal_multiplier.parsed_value,
    days_between_stock_take: days_between_stock_take.parsed_value,
    transport_time_in_days: transport_time_in_days.parsed_value
  };
  return /* @__PURE__ */ h("div", {
    className: "scenario_summary"
  }, scenario_kv.title, /* @__PURE__ */ h("div", {
    className: "simulation_run"
  }, /* @__PURE__ */ h(Button, {
    value: "Run",
    onClick: () => {
      beer_game_simulator.schedule_sim(scenario_group_args, beer_game_args, upsert_scenario_group_run_results);
    }
  }), /* @__PURE__ */ h(Button, {
    value: "Run x100",
    onClick: () => {
      beer_game_simulator.schedule_sim({...scenario_group_args, total_to_run: 100}, beer_game_args, upsert_scenario_group_run_results);
    }
  })), /* @__PURE__ */ h("br", null), "retailer_initial_stock: ", retailer_initial_stock?.parsed_value, "  retailer_storage: ", retailer_storage?.parsed_value, "  demand_signal_multiplier: ", demand_signal_multiplier?.parsed_value, /* @__PURE__ */ h("br", null), scenario_group_run_results.map((i) => /* @__PURE__ */ h(ScenarioGroupRunResultComponent, {
    key: i.started.getTime(),
    scenario_group_run_result: i
  })));
}
function get_attribute_initial_number(attribute_name, args) {
  const result = get_attribute_initial_value(attribute_name, args);
  if (!result)
    return result;
  const {parsed_value} = result;
  if (!Number.isFinite(parsed_value))
    return false;
  return {...result, parsed_value};
}
function get_attribute_initial_value(attribute_name, args) {
  const {attribute_to_wc_id_map, wcomponents_by_id, composed_kv, created_at_ms, sim_ms} = args;
  const attribute_wc_id = attribute_to_wc_id_map[attribute_name] || "";
  const attribute_wcomponent = wcomponents_by_id[attribute_wc_id];
  if (!attribute_wcomponent)
    return false;
  const wc_id_to_counterfactuals_map = composed_kv.wc_id_to_active_counterfactuals_v2_map;
  const VAP_set_id_to_counterfactual_v2_map = wc_id_to_counterfactuals_map[attribute_wcomponent.id]?.VAP_sets;
  const attribute_values = get_wcomponent_state_value_and_probabilities({
    wcomponent: attribute_wcomponent,
    VAP_set_id_to_counterfactual_v2_map,
    created_at_ms,
    sim_ms
  });
  const attribute_value = attribute_values.most_probable_VAP_set_values[0];
  return attribute_value;
}
