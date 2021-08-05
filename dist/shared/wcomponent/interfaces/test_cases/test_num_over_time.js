const feb12th = new Date("2000-02-12");
const march1st = new Date("2000-03-01");
const april1st = new Date("2000-04-01");
const april20th = new Date("2000-04-20");
const april21st = new Date("2000-04-21");
const april28th = new Date("2000-04-28");
const default_VAP = {
  id: "",
  value: "",
  description: "",
  explanation: "",
  probability: 1,
  conviction: 1
};
const political_pressure_on_state_dph = {
  id: "a",
  created_at: april20th,
  type: "statev2",
  subtype: "boolean",
  title: "Political pressure ${value}",
  description: "@@Senator_ABC, facing re-election next month, put pressure on @@made-up-state_DPH to:\n * report higher tests than actuallly being conducted.",
  boolean_true_str: "existed",
  boolean_false_str: "did not exist",
  values_and_prediction_sets: [
    {
      id: "1",
      version: 1,
      created_at: april20th,
      datetime: {
        value: feb12th
      },
      entries: [
        {
          ...default_VAP,
          value: "true",
          probability: 0.7,
          conviction: 0.9,
          description: "",
          explanation: "Source (http://...) seems credible, reasoning sound, evidence of emails was strong but could still be forged."
        }
      ]
    },
    {
      id: "1",
      version: 2,
      created_at: april21st,
      datetime: {
        value: feb12th
      },
      entries: [
        {
          ...default_VAP,
          value: "true",
          probability: 0.95,
          conviction: 0.95,
          explanation: "Senator has made a very blustered reponse, most interviewed in cross partisan poll revealed they thought he was lying http://..."
        }
      ]
    }
  ]
};
const state_dph_mis_reporting = {
  id: "a",
  created_at: april20th,
  type: "statev2",
  subtype: "boolean",
  title: "State DPH ${value} fradulently increase test count",
  description: "state DPH fradulently increased test count to be higher than actually being conducted.",
  boolean_true_str: "did",
  boolean_false_str: "did not",
  values_and_prediction_sets: [
    {
      id: "1",
      version: 1,
      created_at: april20th,
      datetime: {
        value: feb12th,
        max: april1st
      },
      entries: [
        {
          ...default_VAP,
          value: "true",
          probability: 0.8,
          conviction: 0.4,
          explanation: "The claim (http://...) did not come with any supporting evidence that the numbers were actually changed."
        }
      ]
    },
    {
      id: "1",
      version: 2,
      created_at: april28th,
      datetime: {
        value: feb12th,
        max: april1st
      },
      entries: [
        {
          ...default_VAP,
          value: "true",
          probability: 0.01,
          conviction: 0.95,
          explanation: "After the Senator spoke the head of DPH didn't comment on the senators remarks but did release the two 3rd party reports showing test results were not altered."
        }
      ]
    }
  ]
};
const number_of_tests = {
  id: "123",
  created_at: march1st,
  type: "state",
  title: "Number of tests in region _a_",
  description: "",
  values: [
    {
      id: "",
      created_at: march1st,
      start_datetime: march1st,
      description: "As reported by news outlet ABC here: http://...",
      value: "10"
    },
    {
      id: "",
      created_at: april1st,
      start_datetime: march1st,
      description: "Official figure from http://...",
      value: "30"
    },
    {
      id: "",
      created_at: april1st,
      start_datetime: april1st,
      description: "Official figure from http://...",
      value: "50"
    }
  ]
};
const number_of_testsv2 = {
  id: "123",
  created_at: march1st,
  type: "statev2",
  subtype: "number",
  title: "Number of tests in region _a_",
  description: "",
  values_and_prediction_sets: [
    {
      id: "1",
      version: 1,
      created_at: march1st,
      datetime: {
        value: march1st
      },
      entries: [
        {
          ...default_VAP,
          value: "10",
          description: "As reported by news outlet ABC",
          explanation: "Link to original: http://..., might be missing some from north of the region.  Conviction is 100% because on average ABC gets it right (+/- 10%) about 70% of the time.",
          probability: 0.7,
          conviction: 1
        }
      ]
    },
    {
      id: "1",
      version: 2,
      created_at: april1st,
      datetime: {
        value: march1st
      },
      entries: [
        {
          ...default_VAP,
          explanation: "Lower probability as official numbers much higher and official numbers seem reasonable",
          relative_probability: 0,
          probability: 0,
          conviction: 1
        },
        {
          ...default_VAP,
          value: "30",
          description: "Official figure from http://...",
          explanation: "Official figures seem trustworthy",
          relative_probability: 1,
          probability: 1,
          conviction: 1
        }
      ]
    },
    {
      id: "2",
      version: 1,
      created_at: april1st,
      datetime: {
        value: april1st
      },
      entries: [
        {...default_VAP},
        {
          ...default_VAP,
          value: "50",
          description: "Official figure from http://...",
          explanation: "Official figures seem trustworthy",
          probability: 0.8,
          conviction: 1
        }
      ]
    },
    {
      id: "1",
      version: 3,
      created_at: april20th,
      datetime: {
        value: march1st
      },
      entries: [
        {
          ...default_VAP,
          relative_probability: 0.3
        },
        {
          ...default_VAP,
          explanation: "Official figures are challenged as being corrupt by 3rd party watch dog who claim they are much lower",
          relative_probability: 0.2,
          conviction: 0.8
        },
        {
          ...default_VAP,
          value: "15",
          description: "3rd party watch dog seperate from ABC news.",
          explanation: "3rd party watch dog claims the official numbers are much lower, have released all their findings, much more robust estiamtes then ABC news: http://...",
          relative_probability: 0.9,
          probability: 0.6428571429,
          conviction: 0.8
        }
      ]
    },
    {
      id: "2",
      version: 2,
      created_at: april20th,
      datetime: {
        value: april1st
      },
      entries: [
        {...default_VAP},
        {
          ...default_VAP,
          explanation: "Official figures are challenged as being corrupt by xyz who claim they are much lower",
          probability: 0.2,
          conviction: 0.8
        },
        {
          ...default_VAP,
          value: "25",
          explanation: "3rd party watch dog claims the official numbers are much lower, have released all their findings, much more robust estiamtes then ABC news: http://...",
          probability: 0.9,
          conviction: 0.8
        }
      ]
    }
  ]
};
