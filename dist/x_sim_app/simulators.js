let scenario_group_run = 0;
export const beer_game_simulator = {
  schedule_sim: (scenario_group_args, args, upsert_state) => {
    const scenario_group_run_result = {
      id: `${++scenario_group_run}`,
      started: new Date(),
      ...scenario_group_args,
      total_completed: 0,
      results: []
    };
    upsert_state(scenario_group_run_result);
  }
};
