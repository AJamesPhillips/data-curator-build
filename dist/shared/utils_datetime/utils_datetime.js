import {test} from "../utils/test.js";
import {get_uncertain_datetime} from "../uncertainty/datetime.js";
export function get_created_at_datetime(obj) {
  return obj.custom_created_at || obj.created_at;
}
export function get_created_at_ms(obj) {
  return get_created_at_datetime(obj).getTime();
}
export function get_sim_datetime(item) {
  return get_uncertain_datetime(item.datetime);
}
export function get_sim_datetime_ms(item) {
  const dt = get_sim_datetime(item);
  return dt === void 0 ? void 0 : dt.getTime();
}
export function partition_items_by_created_at_datetime(args) {
  const {items, created_at_ms} = args;
  const invalid_future_items = [];
  const current_items = [];
  items.forEach((item) => {
    if (get_created_at_ms(item) > created_at_ms) {
      invalid_future_items.push(item);
    } else {
      current_items.push(item);
    }
  });
  return {invalid_future_items, current_items};
}
function test_partition_items_by_created_at_datetime() {
  console.log("running tests of partition_items_by_created_at_datetime");
  function ids_partition_items_by_created_at_datetime(args) {
    const result2 = partition_items_by_created_at_datetime(args);
    return {
      invalid_future_items: result2.invalid_future_items.map(({id}) => id),
      current_items: result2.current_items.map(({id}) => id)
    };
  }
  let items;
  let result;
  const date0 = new Date("2021-04-01 00:00");
  const date0_ms = date0.getTime();
  const date1 = new Date("2021-04-01 00:01");
  const date1_ms = date1.getTime();
  const date2 = new Date("2021-04-01 00:02");
  const date2_ms = date2.getTime();
  const date3 = new Date("2021-04-01 00:03");
  const date3_ms = date3.getTime();
  const c1 = {base_id: -1, id: "1", created_at: date1};
  const c2 = {base_id: -1, id: "2", created_at: date2};
  items = [];
  result = ids_partition_items_by_created_at_datetime({items, created_at_ms: date3_ms});
  test(result, {
    invalid_future_items: [],
    current_items: []
  });
  items = [c1, c2];
  result = ids_partition_items_by_created_at_datetime({items, created_at_ms: date3_ms});
  test(result, {
    invalid_future_items: [],
    current_items: [c1.id, c2.id]
  });
  result = ids_partition_items_by_created_at_datetime({items, created_at_ms: date2_ms});
  test(result, {
    invalid_future_items: [],
    current_items: [c1.id, c2.id]
  });
  result = ids_partition_items_by_created_at_datetime({items, created_at_ms: date1_ms});
  test(result, {
    invalid_future_items: [c2.id],
    current_items: [c1.id]
  });
  result = ids_partition_items_by_created_at_datetime({items, created_at_ms: date0_ms});
  test(result, {
    invalid_future_items: [c1.id, c2.id],
    current_items: []
  });
}
function run_tests() {
  test_partition_items_by_created_at_datetime();
}
