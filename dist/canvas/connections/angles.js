import {test} from "../../shared/utils/test.js";
import {get_angle, rads, normalise_angle_between_neg_Pi_and_Pi} from "../../utils/angles.js";
import {bounded} from "../../shared/utils/bounded.js";
export function get_angle_from_start_connector(connection_angle, direction) {
  const angle_of_normal_to_connector_surface = angle_of_normal_to_connection_with_direction[direction];
  connection_angle += 1e-4;
  return get_angle_from_connector({
    connection_angle,
    angle_of_normal_to_connector_surface,
    offset_direction: -1
  });
}
export function get_angle_from_end_connector(connection_angle, direction) {
  const angle_of_normal_to_connector_surface = angle_of_normal_to_connection_with_direction[direction];
  connection_angle += Math.PI;
  return get_angle_from_connector({
    connection_angle,
    angle_of_normal_to_connector_surface,
    offset_direction: 1
  });
}
const angle_of_normal_to_connection_location = {
  left: rads._180,
  top: rads._90,
  right: 0,
  bottom: -rads._90
};
const angle_of_normal_to_connection_with_direction = {
  from: angle_of_normal_to_connection_location.right,
  to: angle_of_normal_to_connection_location.left
};
const angle_offset = rads._45;
const max_connection_angle_from_normal = rads._50;
function get_angle_from_connector(args) {
  const angle = normalise_angle_between_neg_Pi_and_Pi(args.connection_angle - args.angle_of_normal_to_connector_surface);
  const peeled_angle = bounded(angle, -max_connection_angle_from_normal, max_connection_angle_from_normal);
  const offsetted_angle = peeled_angle;
  const bounded_angle = bounded(offsetted_angle, -max_connection_angle_from_normal, max_connection_angle_from_normal);
  const corrected_angle = bounded_angle + args.angle_of_normal_to_connector_surface;
  return corrected_angle;
}
function run_tests() {
  console.log("running tests of get_angle etc");
  const cx = 0;
  const cy = 0;
  const coords = [
    {ex: 10, ey: 0},
    {ex: 10, ey: -10},
    {ex: 0, ey: -10},
    {ex: -10, ey: -10},
    {ex: -10, ey: 0},
    {ex: -10, ey: 10},
    {ex: 0, ey: 10},
    {ex: 10, ey: 10}
  ];
  const expected_angles = [
    "0.00",
    "-0.79",
    "-1.57",
    "-2.36",
    "3.14",
    "2.36",
    "1.57",
    "0.79"
  ];
  coords.forEach(({ex, ey}, index) => {
    const angle = get_angle(cx, cy, ex, ey).toFixed(2);
    test(angle, expected_angles[index]);
  });
  const expected_start_angles = [
    "-0.79",
    "-0.87",
    "-0.87",
    "-0.87",
    "0.09",
    "0.09",
    "0.09",
    "0.00"
  ];
  coords.forEach(({ex, ey}, index) => {
    const angle = get_angle(cx, cy, ex, ey);
    const start_angle = get_angle_from_start_connector(angle, "from").toFixed(2);
    test(start_angle, expected_start_angles[index]);
  });
  const expected_end_angles_to_receiving = [
    "3.93",
    "3.14",
    "3.05",
    "3.05",
    "4.01",
    "4.01",
    "4.01",
    "4.01"
  ];
  coords.forEach(({ex, ey}, index) => {
    const angle = get_angle(cx, cy, ex, ey);
    const end_angle_to_receiving_terminal = get_angle_from_end_connector(angle, "to").toFixed(2);
    test(end_angle_to_receiving_terminal, expected_end_angles_to_receiving[index]);
  });
}
