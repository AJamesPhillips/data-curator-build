function dice_rolling__test_case() {
  const d0 = new Date();
  const d1 = new Date();
  const default_VAP = {
    id: "",
    value: "",
    description: "",
    explanation: "",
    probability: 1,
    conviction: 1
  };
  const possible_d3_dice_rolling = {
    id: "",
    created_at: d0,
    base_id: -1,
    type: "statev2",
    subtype: "other",
    title: "Possible value of D3 roll: ${value}",
    description: "A person fairly rolling a fair D3 dice",
    values_and_prediction_sets: [
      {
        id: "1",
        created_at: d0,
        base_id: -1,
        datetime: {},
        entries: [
          {...default_VAP, value: "1", relative_probability: 0.8},
          {...default_VAP, value: "2", relative_probability: 1},
          {...default_VAP, value: "3", relative_probability: 1}
        ],
        shared_entry_values: {
          conviction: 1
        }
      },
      {
        id: "2",
        created_at: d1,
        base_id: -1,
        datetime: {},
        entries: [
          {...default_VAP, relative_probability: 1},
          {...default_VAP},
          {...default_VAP}
        ]
      }
    ]
  };
  const Person_A_rolled_a_2_on_a_d3_dice = {
    id: "890",
    created_at: d1,
    base_id: -1,
    type: "event",
    title: "Person A rolled a 2 on a d3 dice",
    description: ""
  };
  const specific_dice_roll = {
    id: "",
    created_at: d0,
    base_id: -1,
    type: "statev2",
    subtype: "other",
    title: "Possible value of D3 roll: ${value}",
    description: "Person A rolled a D3 dice",
    values_and_prediction_sets: [
      {
        id: "1",
        created_at: d0,
        base_id: -1,
        datetime: {
          min: d0,
          explanation: "We think Person A will roll the dice at some point in the future but we don't know when"
        },
        shared_entry_values: {
          explanation: `see @@${possible_d3_dice_rolling.id}, probabilities copied from there`,
          conviction: 1
        },
        entries: [
          {...default_VAP, value: "1", relative_probability: 1},
          {...default_VAP, value: "2", relative_probability: 1},
          {...default_VAP, value: "3", relative_probability: 1}
        ]
      },
      {
        id: "2",
        created_at: d1,
        base_id: -1,
        datetime: {value: d1},
        shared_entry_values: {
          explanation: `@@${Person_A_rolled_a_2_on_a_d3_dice.id}`
        },
        entries: [
          {...default_VAP, value: "1", relative_probability: 0},
          {...default_VAP, value: "2", relative_probability: 1},
          {...default_VAP, value: "3", relative_probability: 0}
        ]
      }
    ]
  };
}
