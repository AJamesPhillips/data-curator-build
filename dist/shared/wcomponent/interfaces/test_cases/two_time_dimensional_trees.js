const day1 = new Date("2021-04-21");
const day2 = new Date("2021-04-22");
const day3 = new Date("2021-04-23");
const day4 = new Date("2021-04-24");
const day5 = new Date("2021-04-25");
const two_time_dimensional_trees = {
  id: "node1_id",
  created_at: day1,
  type: "statev2",
  subtype: "other",
  title: "",
  description: "",
  values_and_prediction_sets: [
    {
      id: "VAP_set_id1",
      version: 1,
      created_at: day1,
      datetime: {value: day1},
      entries: [{
        id: "",
        value: "A",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }]
    },
    {
      id: "VAP_set_id2",
      version: 1,
      created_at: day1,
      datetime: {value: day2},
      entries: [{
        id: "",
        value: "B",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }],
      previous_VAP_set_ids: ["VAP_set_id1"]
    },
    {
      id: "VAP_set_id1",
      version: 2,
      created_at: day2,
      datetime: {value: day1},
      entries: [{
        id: "",
        value: "C",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }]
    },
    {
      id: "VAP_set_id2",
      version: 2,
      created_at: day2,
      datetime: {value: day2},
      entries: [{
        id: "",
        value: "D",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }],
      previous_VAP_set_ids: ["VAP_set_id1"]
    },
    {
      id: "VAP_set_id3",
      version: 1,
      created_at: day3,
      datetime: {value: day4},
      entries: [
        {
          id: "",
          value: "E",
          description: "",
          explanation: "",
          probability: 0.5,
          conviction: 1
        },
        {
          id: "",
          value: "F",
          description: "",
          explanation: "",
          probability: 0.5,
          conviction: 1
        }
      ],
      previous_VAP_set_ids: ["VAP_set_id2"]
    },
    {
      id: "VAP_set_id4",
      version: 1,
      created_at: day3,
      datetime: {value: day4},
      entries: [
        {
          id: "",
          value: "G",
          description: "",
          explanation: "",
          probability: 0.5,
          conviction: 1
        },
        {
          id: "",
          value: "5",
          description: "",
          explanation: "",
          probability: 0.5,
          conviction: 1
        }
      ],
      previous_VAP_set_ids: ["VAP_set_id2"]
    },
    {
      id: "VAP_set_id5",
      version: 1,
      created_at: day3,
      datetime: {value: day5},
      entries: [{
        id: "",
        value: "I",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }],
      previous_VAP_set_ids: ["VAP_set_id3", "VAP_set_id4"]
    },
    {
      id: "VAP_set_id3",
      version: 2,
      created_at: day4,
      datetime: {value: day4},
      entries: [
        {
          id: "",
          value: "E",
          description: "",
          explanation: "",
          probability: 1,
          conviction: 1
        },
        {
          id: "",
          value: "F",
          description: "",
          explanation: "",
          probability: 0,
          conviction: 1
        }
      ],
      previous_VAP_set_ids: ["VAP_set_id2"]
    },
    {
      id: "VAP_set_id4",
      version: 2,
      created_at: day4,
      datetime: {value: day4},
      entries: [
        {
          id: "",
          value: "G",
          description: "",
          explanation: "",
          probability: 0,
          conviction: 1
        },
        {
          id: "",
          value: "5",
          description: "",
          explanation: "",
          probability: 0,
          conviction: 1
        }
      ],
      previous_VAP_set_ids: ["VAP_set_id2"]
    },
    {
      id: "VAP_set_id5",
      version: 2,
      created_at: day4,
      datetime: {value: day5},
      entries: [{
        id: "",
        value: "J",
        description: "",
        explanation: "",
        probability: 1,
        conviction: 1
      }],
      previous_VAP_set_ids: ["VAP_set_id3", "VAP_set_id4"]
    }
  ]
};
