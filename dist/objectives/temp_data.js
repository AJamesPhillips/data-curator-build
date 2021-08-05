export const objectives_data = [
  {
    id: "0",
    created_at: new Date("2019-05-06"),
    type: "value",
    title: "I want to help people",
    caused_by: [],
    main: {preceeding_id: ""}
  },
  {
    id: "14",
    created_at: new Date(new Date("2019-05-06").getTime()),
    type: "value",
    title: "I want the world to be fair",
    caused_by: [],
    main: {preceeding_id: "0"}
  },
  {
    id: "15",
    created_at: new Date(new Date("2020-02-01").getTime()),
    type: "process",
    title: "I want to be good value for money",
    caused_by: ["14"],
    main: {preceeding_id: "14"}
  },
  {
    id: "16",
    created_at: new Date(new Date("2020-02-01").getTime()),
    type: "process",
    title: "I want to be effective and efficient",
    caused_by: ["15", "0"],
    main: {preceeding_id: "15"}
  },
  {
    id: "17",
    created_at: new Date(new Date("2020-12-10").getTime()),
    type: "process",
    title: "Planning adequately",
    caused_by: ["16"],
    main: {preceeding_id: "16"}
  },
  {
    id: "1",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "End pandemic sooner",
    caused_by: ["0"],
    main: {preceeding_id: "17"}
  },
  {
    id: "2",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "Reduce damage from pandemic",
    caused_by: ["0"],
    main: {preceeding_id: "1"}
  },
  {
    id: "3",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "Improve public health",
    caused_by: ["1", "2"],
    main: {preceeding_id: "2"}
  },
  {
    id: "4",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "Improve diagnostics",
    caused_by: ["3"],
    main: {preceeding_id: "3"}
  },
  {
    id: "5",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "Increase volume / decrease cost of diagnostics",
    caused_by: ["3"],
    main: {preceeding_id: "4"}
  },
  {
    id: "6",
    created_at: new Date(new Date("2020-05-01").getTime()),
    type: "process",
    title: "Improve _Earned_ public trust in diagnostics",
    caused_by: ["3"],
    main: {preceeding_id: "5"}
  },
  {
    id: "7",
    created_at: new Date(new Date("2020-03-01").getTime()),
    type: "process",
    title: "Understand current diagnostics situation better",
    caused_by: ["4", "5", "6"],
    main: {preceeding_id: "6"}
  },
  {
    id: "8",
    created_at: new Date(new Date("2020-03-15").getTime()),
    type: "process",
    title: "Get help from experts",
    caused_by: ["7"],
    main: {preceeding_id: "7"}
  },
  {
    id: "18",
    created_at: new Date(new Date("2020-07-15").getTime()),
    type: "process",
    title: "Hang around experts and listen to what they say",
    caused_by: ["8"],
    main: {preceeding_id: "8"}
  },
  {
    id: "9",
    created_at: new Date(new Date("2020-03-15").getTime()),
    type: "event",
    title: "Ask for help from experts",
    caused_by: ["8"],
    main: {preceeding_id: "18"}
  },
  {
    id: "10",
    created_at: new Date(new Date("2020-03-15").getTime()),
    type: "process",
    title: "Engender help from experts",
    caused_by: ["9"],
    main: {preceeding_id: "9"}
  },
  {
    id: "11",
    created_at: new Date(new Date("2020-03-15").getTime()),
    type: "process",
    title: "Assist experts",
    caused_by: ["10"],
    main: {preceeding_id: "10"}
  },
  {
    id: "12",
    created_at: new Date(new Date("2020-03-15").getTime()),
    type: "process",
    title: "Influence current diagnostics evaluation process",
    caused_by: ["11"],
    main: {preceeding_id: "11"}
  },
  {
    id: "13",
    created_at: new Date(new Date("2020-08-01").getTime()),
    type: "state",
    title: "Have artefact to open conversations",
    caused_by: ["12", "11", "10"],
    main: {preceeding_id: "12"}
  }
];
