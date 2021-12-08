const MA_covid_vaccinations_4th_march_2021 = {
  id: "123_ma_vac_4th",
  type: "multidimensional_state",
  base_id: -1,
  title: "MA vaccinations 4th March 2021",
  description: "MA vaccinations 4th March 2021\n\n## Sources \n https://www.mass.gov/info-details/massachusetts-covid-19-vaccination-data-and-updates",
  created_at: new Date()
};
const MA_covid_vaccinations_4th_march_2021_version_1 = {
  id: "123_ma_vac_4th",
  data_type: "other",
  author_id: "abc",
  schema_version: 1,
  schema_description: "Initial version.  Percentage population is string to cope with values of * and >95%",
  schema: {
    dimensions: [
      {name: "town", title: "Town", type: "space"},
      {name: "age_groups", title: "Age groups", type: "string"}
    ]
  },
  dimension_data: {
    town: ["Chelsea", "Rivere"],
    age_groups: ["0-12", "13+"]
  },
  data: []
};
const MA_covid_vaccinations_4th_march_2021_version_2 = {
  id: "123_ma_vac_4th",
  data_type: "number",
  author_id: "abc",
  schema_version: 2,
  schema_description: "Replace percentage vaccinated with number of vaccinated.\n New schema here: <123_ma_vac>",
  schema: {
    dimensions: [
      {name: "town", title: "Town", type: "space"},
      {name: "age_groups", title: "Age groups", type: "string"}
    ]
  },
  dimension_data: {
    town: ["Chelsea", "Rivere"],
    age_groups: ["0-12", "13+"]
  },
  data: []
};
const MA_covid_vaccinations = {
  id: "123_ma_covid_vacs",
  type: "multidimensional_state",
  base_id: -1,
  title: "MA vaccinations by town, time and age group",
  description: "MA vaccinations from 4th March 2021 to present (2021-12-05)\n\n## Sources \n https://www.mass.gov/info-details/massachusetts-covid-19-vaccination-data-and-updates",
  created_at: new Date()
};
const MA_covid_vaccinations_version_1 = {
  id: "123_ma_covid_vacs",
  data_type: "number",
  author_id: "abc",
  schema_version: 1,
  schema_description: "Initial schema",
  schema: {
    dimensions: [
      {name: "town", title: "Town", type: "space"},
      {name: "age_groups", title: "Age groups", type: "string"},
      {name: "date", title: "Date", type: "date"}
    ]
  },
  dimension_data: {
    town: ["Chelsea", "Rivere"],
    age_groups: ["0-12", "13+"]
  },
  data: []
};
