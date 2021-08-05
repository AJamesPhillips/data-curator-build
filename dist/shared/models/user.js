import {
  from_pojo as base_from_pojo
} from "./base.js";
export function from_pojo(user) {
  user = base_from_pojo(user);
  return user;
}
