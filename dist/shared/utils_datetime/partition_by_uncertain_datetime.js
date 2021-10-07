import {uncertain_datetime_is_eternal} from "../uncertainty/datetime.js";
import {sort_list} from "../utils/sort.js";
import {test} from "../utils/test.js";
import {Tense} from "../wcomponent/interfaces/datetime.js";
import {get_tense_of_uncertain_datetime} from "./get_tense_of_uncertain_datetime.js";
export function partition_and_sort_by_uncertain_event_datetimes(args) {
  const {items, sim_ms} = args;
  const sorted_items = sort_by_uncertain_event_datetimes(items);
  return partition_sorted_items_by_datetimes({sorted_items, sim_ms});
}
function sort_by_uncertain_event_datetimes(items) {
  const sorted_items = sort_list(items, ({datetime}) => {
    if (uncertain_datetime_is_eternal(datetime))
      return Number.NEGATIVE_INFINITY;
    const {max, value, min} = datetime;
    if (min)
      return min.getTime() * 10 + 2;
    if (value)
      return value.getTime() * 10 + 1;
    if (max)
      return max.getTime() * 10;
    return 1;
  }, "descending");
  return sorted_items;
}
function partition_sorted_items_by_datetimes(args) {
  const {sorted_items, sim_ms} = args;
  let past_items = [];
  let present_items = [];
  let eternal_items = [];
  const future_items = [];
  sorted_items.forEach((item) => {
    const tense = get_tense_of_uncertain_datetime(item, sim_ms);
    if (tense === Tense.past)
      past_items.push(item);
    else if (tense === Tense.future)
      future_items.push(item);
    else if (tense === Tense.present)
      present_items.push(item);
    else
      eternal_items.push(item);
  });
  if (present_items.length !== 1) {
    if (present_items.length > 1) {
      const older_present_items = present_items.slice(1);
      past_items = older_present_items.concat(past_items);
      present_items = present_items.slice(0, 1);
    } else if (past_items.length) {
      present_items = past_items.slice(0, 1);
      past_items = past_items.slice(1);
    }
  }
  if (eternal_items.length) {
    if (present_items.length !== 1) {
      present_items = eternal_items.slice(0, 1);
      eternal_items = eternal_items.slice(1);
    }
    past_items = past_items.concat(eternal_items);
  }
  return {past_items, present_items, future_items};
}
function test_partition_sorted_items_by_datetimes() {
  console.log("running tests of partition_sorted_items_by_datetimes");
  function ids_partition_sorted_items_by_datetimes(args) {
    const result2 = partition_sorted_items_by_datetimes(args);
    return {
      past_items: result2.past_items.map(({id}) => id),
      present_items: result2.present_items.map(({id}) => id),
      future_items: result2.future_items.map(({id}) => id)
    };
  }
  let sorted_items;
  let result;
  const date0 = new Date("2021-04-01 00:00");
  const date0_ms = date0.getTime();
  const date1 = new Date("2021-04-01 00:01");
  const date1_ms = date1.getTime();
  const date2 = new Date("2021-04-01 00:02");
  const date2_ms = date2.getTime();
  const date3 = new Date("2021-04-01 00:03");
  const date3_ms = date3.getTime();
  const s_eternal1 = {id: "10", created_at: date1, datetime: {}};
  const s_eternal2 = {id: "11", created_at: date2, datetime: {}};
  const s1 = {id: "20", created_at: date1, datetime: {value: date1}};
  const s2 = {id: "30", created_at: date1, datetime: {value: date2}};
  sorted_items = [];
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date3_ms});
  test(result, {
    past_items: [],
    present_items: [],
    future_items: []
  });
  sorted_items = [s_eternal1, s_eternal2];
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date0_ms});
  test(result, {
    past_items: [s_eternal2.id],
    present_items: [s_eternal1.id],
    future_items: []
  }, "Can handle multiple eternal elements");
  sorted_items = [s2, s1, s_eternal2];
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date0_ms});
  test(result, {
    past_items: [],
    present_items: [s_eternal2.id],
    future_items: [s2.id, s1.id]
  });
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date1_ms});
  test(result, {
    past_items: [s_eternal2.id],
    present_items: [s1.id],
    future_items: [s2.id]
  });
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date2_ms});
  test(result, {
    past_items: [s1.id, s_eternal2.id],
    present_items: [s2.id],
    future_items: []
  });
  result = ids_partition_sorted_items_by_datetimes({sorted_items, sim_ms: date3_ms});
  test(result, {
    past_items: [s1.id, s_eternal2.id],
    present_items: [s2.id],
    future_items: []
  });
}
function test_sort_by_uncertain_event_datetimes() {
  console.log("running tests of sort_by_uncertain_event_datetimes");
  function ids_sort_by_uncertain_event_datetimes(items2) {
    const result3 = sort_by_uncertain_event_datetimes(items2);
    return result3.map(({id: id2}) => id2);
  }
  function compare(items2, expected2) {
    const items_reverse2 = [...items2].reverse();
    const expected_ids = expected2.map(({id: id2}) => id2);
    result = ids_sort_by_uncertain_event_datetimes(items2);
    const result22 = ids_sort_by_uncertain_event_datetimes(items_reverse2);
    test(result, result22, "", false);
    console.log(items2.map(({id: id2}) => id2).join(", "));
    test(result, expected_ids, "", false);
  }
  let items = [];
  let result;
  let expected;
  const date0 = new Date("2021-04-01 00:00");
  const date1 = new Date("2021-04-01 00:01");
  const date2 = new Date("2021-04-01 00:02");
  const date3 = new Date("2021-04-01 00:03");
  let id = 0;
  const next_id = () => `${id++}`;
  const s_eternal = {id: next_id(), datetime: {}};
  const s_eternal2 = {id: next_id(), datetime: {}};
  const s1 = {id: next_id(), datetime: {value: date1}};
  const s2 = {id: next_id(), datetime: {value: date2}};
  const s_max1 = {id: next_id(), datetime: {max: date1}};
  const s_max2 = {id: next_id(), datetime: {max: date2}};
  const s_min1 = {id: next_id(), datetime: {min: date1}};
  const s_min2 = {id: next_id(), datetime: {min: date2}};
  const s_min0_max3 = {id: next_id(), datetime: {min: date0, max: date3}};
  const s_min1_max2 = {id: next_id(), datetime: {min: date1, max: date2}};
  items = [];
  result = ids_sort_by_uncertain_event_datetimes(items);
  test(result, [], "", false);
  items = [s_eternal, s_eternal2];
  const items_reverse = [...items].reverse();
  result = ids_sort_by_uncertain_event_datetimes(items);
  const result2 = ids_sort_by_uncertain_event_datetimes(items_reverse);
  test(JSON.stringify(result) !== JSON.stringify(result2), true, "Should be different (indeterminant sort)");
  items = [s_eternal, s1, s2];
  expected = [s2, s1, s_eternal];
  compare(items, expected);
  items = [s_eternal, s_min1, s_min2];
  expected = [s_min2, s_min1, s_eternal];
  compare(items, expected);
  items = [s_eternal, s_max1, s_max2];
  expected = [s_max2, s_max1, s_eternal];
  compare(items, expected);
  items = [s_eternal, s1, s2, s_min1, s_min2, s_max1, s_max2];
  expected = [s_min2, s2, s_max2, s_min1, s1, s_max1, s_eternal];
  compare(items, expected);
  items = [s_eternal, s_min0_max3, s_min1_max2];
  expected = [s_min1_max2, s_min0_max3, s_eternal];
  compare(items, expected);
}
function run_tests() {
  test_partition_sorted_items_by_datetimes();
  test_sort_by_uncertain_event_datetimes();
}
